import fitz
d = fitz.open(r'PDF Gallery_20261017_004143.pdf')
for i in [0,1,2,12,24]:
    p = d[i]
    pix = p.get_pixmap(dpi=100)
    pix.save(r'build\_pdf_p%d.png' % i)
    print(i, pix.width, pix.height)
