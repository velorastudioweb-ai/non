import re

path = 'build/quantum-health.js'
with open(path, 'r', encoding='utf-8') as f:
    s = f.read()

# Add portrait for subramini
pattern = r"(portrait:d\.id === 'arivazhagan' \? '/dr-arivazhagan\.png' : null\}\)\);)"
replacement = r"portrait:d.id === 'arivazhagan' ? '/dr-arivazhagan.png' : d.id === 'subramini' ? '/dr-subramini.png' : null}));"
if re.search(pattern, s):
    s2 = re.sub(pattern, replacement, s)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s2)
    print('ok1')
else:
    print('no1')
