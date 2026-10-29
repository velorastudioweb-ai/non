import cv2, glob, os, tempfile
model = os.path.join(os.environ.get('TEMP', '.'), 'yunet.onnx')
det = cv2.FaceDetectorYN.create(model, '', (320, 320), 0.6, 0.3, 5000)
for f in sorted(glob.glob('public/*.png') + glob.glob('public/*.webp')):
    img = cv2.imread(f)
    if img is None:
        print(f, 'UNREADABLE'); continue
    h, w = img.shape[:2]
    det.setInputSize((w, h))
    _, faces = det.detect(img)
    n = 0 if faces is None else len(faces)
    boxes = [] if faces is None else [[round(float(x)) for x in face[:4]] for face in faces[:4]]
    print(f"{os.path.basename(f):60s} {w}x{h} faces={n} {boxes}")
