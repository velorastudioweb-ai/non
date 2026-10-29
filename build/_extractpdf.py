import fitz, os, hashlib, io
from PIL import Image
os.makedirs('tmpimg/pdf', exist_ok=True)
for pdf in ['data.pdf', 'PDF Gallery_20261017_004143.pdf']:
    doc = fitz.open(pdf)
    print('===', pdf, doc.page_count)
    for pno in range(doc.page_count):
        page = doc[pno]
        for i, info in enumerate(page.get_images(full=True)):
            xref = info[0]
            try:
                pix = fitz.Pixmap(doc, xref)
                if pix.n - pix.alpha >= 4:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                data = pix.tobytes('png')
                name = f"tmpimg/pdf/{os.path.basename(pdf)[:4]}-p{pno+1}-{i}-{pix.width}x{pix.height}.png"
                open(name, 'wb').write(data)
                print(pno+1, i, pix.width, pix.height, hashlib.sha256(data).hexdigest()[:12], name)
            except Exception as e:
                print('ERR', pno+1, i, e)
