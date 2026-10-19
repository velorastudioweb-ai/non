import fitz, sys
d = fitz.open(r'PDF Gallery_20261017_004143.pdf')
print('pages:', d.page_count)
out = []
for i in range(d.page_count):
    out.append('--- PAGE %d ---' % i)
    out.append(d[i].get_text())
open(r'build\_pdf_text.txt','w',encoding='utf-8').write('\n'.join(out))
print('written', sum(len(x) for x in out))
