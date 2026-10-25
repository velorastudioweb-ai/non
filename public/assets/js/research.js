(function () {
  'use strict';

  var root = document.querySelector('[data-research]');
  if (!root) return;

  var src = root.getAttribute('data-src');
  var listEl = document.getElementById('pmc-list');
  var metaEl = document.getElementById('pmc-meta');
  var pagerEl = document.getElementById('pmc-pager');
  var qEl = document.getElementById('pmc-q');
  var yearEl = document.getElementById('pmc-year');
  var sortEl = document.getElementById('pmc-sort');

  var PER_PAGE = 25;
  var all = [];
  var filtered = [];
  var state = { q: '', year: '', sort: 'year-desc', page: 1 };
  var number = new Intl.NumberFormat('en-US');
  var debounceTimer = null;
  var started = false;
  var loaded = false;
  var searchText = new WeakMap();
  var libraryObserver;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function yearOf(article) {
    return article.year ? String(article.year) : '';
  }

  function textOf(article) {
    if (searchText.has(article)) return searchText.get(article);
    var text = (article.title + ' ' + (article.abstract || '') + ' ' +
      (article.authors || []).join(' ') + ' ' + (article.journal || '')).toLowerCase();
    searchText.set(article, text);
    return text;
  }

  function applyFilters() {
    if (!loaded) return;
    var terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    filtered = all.filter(function (article) {
      if (state.year && yearOf(article) !== state.year) return false;
      if (!terms.length) return true;
      var haystack = textOf(article);
      for (var i = 0; i < terms.length; i++) {
        if (haystack.indexOf(terms[i]) === -1) return false;
      }
      return true;
    });

    filtered.sort(function (a, b) {
      if (state.sort === 'year-asc') {
        return (a.year || 9999) - (b.year || 9999) || a.title.localeCompare(b.title);
      }
      if (state.sort === 'title') {
        return a.title.localeCompare(b.title);
      }
      return (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title);
    });

    state.page = 1;
    render();
  }

  function authorLine(authors) {
    if (!authors || !authors.length) return 'Author not listed';
    if (authors.length <= 6) return authors.join(', ');
    return authors.slice(0, 6).join(', ') + ' et al.';
  }

  function citation(article) {
    var bits = [];
    if (article.journal) bits.push('<em>' + esc(article.journal) + '</em>');
    var year = article.year ? String(article.year) : '';
    var vol = article.volume ? esc(article.volume) : '';
    var issue = article.issue ? '(' + esc(article.issue) + ')' : '';
    var pages = article.pages ? ':' + esc(article.pages) : '';
    if (year || vol) bits.push((year ? year : '') + (vol ? ';' + vol + issue + pages : ''));
    return bits.join('. ');
  }

  function identifiers(article) {
    var out = [];
    out.push('<a href="' + esc(article.url) + '" target="_blank" rel="noopener">' + esc(article.pmcid) + '</a>');
    if (article.pmid) {
      out.push('PMID <a href="https://pubmed.ncbi.nlm.nih.gov/' + esc(article.pmid) + '/" target="_blank" rel="noopener">' + esc(article.pmid) + '</a>');
    }
    if (article.doi) {
      out.push('DOI <a href="https://doi.org/' + esc(article.doi) + '" target="_blank" rel="noopener">' + esc(article.doi) + '</a>');
    }
    return out.join(' \u00b7 ');
  }

  function itemHtml(article) {
    var abstract = article.abstract
      ? '<details class="research-item__abstract"><summary>Read abstract</summary><p>' + esc(article.abstract) + '</p></details>'
      : '<p class="research-item__abstract research-item__abstract--none">No abstract available in PMC \u2014 read the record for full text.</p>';

    return '<article class="research-item">' +
      '<h2 class="research-item__title"><a href="' + esc(article.url) + '" target="_blank" rel="noopener">' +
        esc(article.title || 'Untitled record') + '</a></h2>' +
      '<p class="research-item__byline">' + esc(authorLine(article.authors)) +
        (article.journal ? ' \u00b7 ' + citation(article) : '') + '</p>' +
      '<p class="research-item__ids">' + identifiers(article) + '</p>' +
      abstract +
    '</article>';
  }

  function pageNumbers(current, total) {
    var pages = [];
    var push = function (n) { if (pages.indexOf(n) === -1) pages.push(n); };
    push(1);
    for (var i = current - 2; i <= current + 2; i++) if (i > 1 && i < total) push(i);
    if (total > 1) push(total);
    pages.sort(function (a, b) { return a - b; });

    var out = [];
    for (var j = 0; j < pages.length; j++) {
      if (j && pages[j] - pages[j - 1] > 1) out.push('<span class="research__gap" aria-hidden="true">\u2026</span>');
      out.push(pages[j]);
    }
    return out;
  }

  function renderPager(totalPages) {
    if (totalPages <= 1) { pagerEl.innerHTML = ''; return; }

    var parts = [];
    parts.push('<button type="button" class="research__page" data-page="' + (state.page - 1) + '"' +
      (state.page === 1 ? ' disabled' : '') + ' aria-label="Previous page">\u2039 Previous</button>');

    var pages = pageNumbers(state.page, totalPages);
    pages.forEach(function (p) {
      if (typeof p === 'string') { parts.push(p); return; }
      parts.push('<button type="button" class="research__page" data-page="' + p + '"' +
        (p === state.page ? ' aria-current="page"' : '') + ' aria-label="Page ' + p + '">' + p + '</button>');
    });

    parts.push('<button type="button" class="research__page" data-page="' + (state.page + 1) + '"' +
      (state.page === totalPages ? ' disabled' : '') + ' aria-label="Next page">Next \u203a</button>');

    pagerEl.innerHTML = parts.join('');
  }

  function render() {
    var total = filtered.length;
    var totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (state.page > totalPages) state.page = totalPages;

    var start = (state.page - 1) * PER_PAGE;
    var end = Math.min(start + PER_PAGE, total);
    var slice = filtered.slice(start, end);

    if (!total) {
      metaEl.textContent = 'No records match this search. Try a different word or choose another year.';
      listEl.innerHTML = '<p class="research__empty">Nothing found for \u201c' + esc(state.q) + '\u201d' +
        (state.year ? ' in ' + state.year : '') + '.</p>';
      pagerEl.innerHTML = '';
      return;
    }

    var phrase = state.q ? ' matching \u201c' + state.q + '\u201d' : '';
    metaEl.textContent = 'Showing ' + number.format(start + 1) + '\u2013' + number.format(end) +
      ' of ' + number.format(total) + ' record' + (total === 1 ? '' : 's') + phrase +
      (state.year ? ' from ' + state.year : '') + '.';

    listEl.innerHTML = slice.map(itemHtml).join('');
    renderPager(totalPages);
  }

  function goToPage(page) {
    var totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (page < 1 || page > totalPages) return;
    state.page = page;
    render();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  function fillYears(articles) {
    var years = {};
    articles.forEach(function (a) { if (a.year) years[a.year] = (years[a.year] || 0) + 1; });
    var sorted = Object.keys(years).map(Number).sort(function (a, b) { return b - a; });
    yearEl.innerHTML = '<option value="">All years (' + number.format(articles.length) + ')</option>' +
      sorted.map(function (y) {
        var count = years[y];
        return '<option value="' + y + '">' + y + ' (' + number.format(count) + ')</option>';
      }).join('');
  }

  qEl.addEventListener('input', function () {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(function () {
      state.q = qEl.value.trim();
      applyFilters();
    }, 180);
  });

  yearEl.addEventListener('change', function () {
    state.year = yearEl.value;
    applyFilters();
  });

  sortEl.addEventListener('change', function () {
    state.sort = sortEl.value;
    applyFilters();
  });

  pagerEl.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-page]');
    if (button) goToPage(Number(button.getAttribute('data-page')));
  });

  function loadLibrary() {
    if (started) return;
    started = true;
    if (libraryObserver) libraryObserver.disconnect();
    fetch(src, { credentials: 'same-origin', priority: 'low' })
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(function (data) {
      all = data.articles || [];
      loaded = true;
      state.q = qEl.value.trim();
      fillYears(all);
      applyFilters();
    })
    .catch(function () {
      metaEl.textContent = 'The research library could not be loaded.';
      listEl.innerHTML = '<p class="research__empty">Please try again later, or open the ' +
        '<a href="/assets/data/pmc-breast-enlargement.json">complete dataset (JSON)</a> directly.</p>';
    });
  }
  // The archive is far below the banner. Start before it enters view instead of
  // downloading/parsing every abstract during initial paint. Hash navigation,
  // keyboard focus and scrolling all trigger the same complete library.
  function scheduleLibrary() {
    if (started) return;
    if ('IntersectionObserver' in window) {
      libraryObserver = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) loadLibrary();
      }, { rootMargin: '800px' });
      libraryObserver.observe(root);
    } else loadLibrary();
  }
  root.addEventListener('focusin', loadLibrary, { once: true });
  if (document.readyState === 'complete') scheduleLibrary();
  else window.addEventListener('load', scheduleLibrary, { once: true });
})();
