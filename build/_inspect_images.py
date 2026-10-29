from PIL import Image
import os, hashlib
for f in sorted(os.listdir('public')):
    if f.lower().endswith(('.png','.webp','.jpg','.jpeg')):
        p='public/'+f
        try:
            im=Image.open(p)
            print(f'{f}\t{im.size}\t{os.path.getsize(p)}\t{hashlib.sha256(open(p,"rb").read()).hexdigest()[:12]}')
        except Exception as e: print(f,e)
