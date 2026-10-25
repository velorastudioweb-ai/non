"""Export rendered website pages and all published research JSON to data.pdf."""

from __future__ import annotations

import html
import json
import re
import gc
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
DATA_DIR = ROOT / "public" / "assets" / "data"
OUTPUT = ROOT / "data.pdf"
PAGE = fitz.Rect(0, 0, 595, 842)  # A4 portrait, points
CONTENT = fitz.Rect(52, 58, 543, 785)


class MainTextParser(HTMLParser):
    """Extract readable block text from the page's main element."""

    BLOCKS = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "td", "th", "blockquote"}
    SKIP = {"script", "style", "svg", "noscript"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.main_depth = 0
        self.skip_depth = 0
        self.current_tag: str | None = None
        self.current: list[str] = []
        self.blocks: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        if tag == "main":
            self.in_main = True
            self.main_depth += 1
        elif self.in_main and tag == "main":
            self.main_depth += 1
        if not self.in_main:
            return
        if tag in self.SKIP:
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if tag == "img" and attrs_dict.get("alt"):
            self.blocks.append(("p", f"[Image: {attrs_dict['alt']}]") )
        if tag in self.BLOCKS:
            self._finish_block()
            self.current_tag = tag
            self.current = []

    def handle_endtag(self, tag: str) -> None:
        if not self.in_main:
            return
        if tag in self.SKIP and self.skip_depth:
            self.skip_depth -= 1
            return
        if self.skip_depth:
            return
        if self.current_tag == tag:
            self._finish_block()
        if tag == "main":
            self.main_depth -= 1
            if self.main_depth <= 0:
                self.in_main = False

    def handle_data(self, data: str) -> None:
        if self.in_main and not self.skip_depth and self.current_tag:
            text = re.sub(r"\s+", " ", data).strip()
            if text:
                self.current.append(text)

    def _finish_block(self) -> None:
        if self.current_tag and self.current:
            text = re.sub(r"\s+", " ", " ".join(self.current)).strip()
            if text:
                self.blocks.append((self.current_tag, text))
        self.current_tag = None
        self.current = []


def make_page_html(title: str, blocks: list[tuple[str, str]], subtitle: str = "") -> str:
    parts = [f"<h1>{html.escape(title)}</h1>"]
    if subtitle:
        parts.append(f"<p class='subtitle'>{html.escape(subtitle)}</p>")
    for tag, text in blocks:
        safe_tag = tag if tag in MainTextParser.BLOCKS else "p"
        parts.append(f"<{safe_tag}>{html.escape(text)}</{safe_tag}>")
    return "\n".join(parts)


def render_story(writer: fitz.DocumentWriter, content: str) -> int:
    story = fitz.Story(
        html=content,
        user_css="""
            body { font-family: sans-serif; font-size: 9.5pt; line-height: 1.35; color: #20191b; }
            h1 { font-size: 21pt; color: #5b1730; margin: 0 0 10pt 0; }
            h2 { font-size: 15pt; color: #6e2340; margin: 15pt 0 6pt 0; }
            h3, h4, h5, h6 { font-size: 11pt; color: #5b1730; margin: 10pt 0 4pt 0; }
            p { margin: 0 0 6pt 0; }
            li { margin: 0 0 4pt 0; }
            .subtitle { color: #665b60; font-size: 10pt; margin-bottom: 14pt; }
        """,
    )
    pages = 0
    while True:
        page = writer.begin_page(PAGE)
        more, _ = story.place(CONTENT)
        story.draw(page)
        writer.end_page()
        pages += 1
        if not more:
            return pages


def json_lines(value: object, level: int = 0) -> list[tuple[str, str]]:
    blocks: list[tuple[str, str]] = []
    if isinstance(value, dict):
        for key, child in value.items():
            if isinstance(child, (dict, list)):
                blocks.append(("h4" if level < 2 else "h5", str(key)))
                blocks.extend(json_lines(child, level + 1))
            else:
                blocks.append(("p", f"{key}: {child if child is not None else ''}"))
    elif isinstance(value, list):
        for index, child in enumerate(value, 1):
            if isinstance(child, (dict, list)):
                blocks.append(("h5", f"Record {index}"))
                blocks.extend(json_lines(child, level + 1))
            else:
                blocks.append(("li", str(child if child is not None else "")))
    else:
        blocks.append(("p", str(value if value is not None else "")))
    return blocks


def main() -> None:
    if not DIST.exists():
        raise SystemExit("dist/ is missing. Run `npm run build` first.")

    writer = fitz.DocumentWriter(str(OUTPUT))
    total_pages = 0
    route_titles: list[str] = []

    # Cover and contents list.
    total_pages += render_story(writer, make_page_html(
        "Quantum Health — Website Data Export",
        [("h2", "Included content"),
         ("p", "This PDF contains the main text from every generated site page and the complete contents of every published research JSON dataset."),
         ("p", f"Export date: {date.today().isoformat()}"),
         ("h2", "Website pages")],
    ))

    page_files = sorted(DIST.rglob("index.html"))
    page_entries: list[tuple[Path, str, str, list[tuple[str, str]]]] = []
    for file_path in page_files:
        raw = file_path.read_text(encoding="utf-8", errors="replace")
        if re.search(r"<meta[^>]+http-equiv=[\"']?refresh", raw, flags=re.I):
            continue
        title_match = re.search(r"<title[^>]*>(.*?)</title>", raw, flags=re.I | re.S)
        title = html.unescape(re.sub(r"<[^>]+>", "", title_match.group(1))).strip() if title_match else file_path.parent.name
        parser = MainTextParser()
        parser.feed(raw)
        if not parser.blocks:
            continue
        route = "/" if file_path.parent == DIST else "/" + file_path.parent.relative_to(DIST).as_posix().strip("/") + "/"
        page_entries.append((file_path, route, title, parser.blocks))
        route_titles.append(f"{title} — {route}")

    total_pages += render_story(writer, make_page_html("Page index", [("li", item) for item in route_titles]))
    for _, route, title, blocks in page_entries:
        total_pages += render_story(writer, make_page_html(title, [("p", f"Page: {route}")] + blocks))

    data_files = sorted(DATA_DIR.glob("*.json"))
    for file_path in data_files:
        dataset = json.loads(file_path.read_text(encoding="utf-8"))
        source = dataset.get("source", "") if isinstance(dataset, dict) else ""
        source_url = dataset.get("sourceUrl", "") if isinstance(dataset, dict) else ""
        subtitle = f"{source} — {source_url}".strip(" —")
        total_pages += render_story(writer, make_page_html(
            f"Research dataset: {file_path.stem}",
            json_lines(dataset),
            subtitle,
        ))

    writer.close()

    # Add unobtrusive running headers and page numbering after layout is complete.
    document = fitz.open(OUTPUT)
    for index, page in enumerate(document, 1):
        page.insert_text((52, 31), "QUANTUM HEALTH  |  WEBSITE DATA", fontsize=7, color=(0.38, 0.16, 0.25))
        page.insert_text((500, 818), str(index), fontsize=8, color=(0.38, 0.16, 0.25))
    numbered_output = OUTPUT.with_name("data-numbered.pdf")
    document.save(numbered_output, garbage=4, deflate=True)
    document.close()
    del page
    del document
    gc.collect()
    if OUTPUT.exists():
        OUTPUT.unlink()
    numbered_output.replace(OUTPUT)

    print(f"Created {OUTPUT.name}: {len(page_entries)} website pages, {len(data_files)} research datasets, {total_pages} pages total.")


if __name__ == "__main__":
    main()
