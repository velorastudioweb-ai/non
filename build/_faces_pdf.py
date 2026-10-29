import cv2, glob, os
model = os.path.join(os.environ.get('TEMP', '.'), 'yunet.onnx')
det = cv2.FaceDetectorYN.create(model, '', (320, 320), 0.6, 0.3, 5000)
for f in sorted(glob.glob('tmpimg/pdf/*.png')):
    img = cv2.imread(f)
    h, w = img.shape[:2]
    det.setInputSize((w, h))
    _, faces = det.detect(img)
    n = 0 if faces is None else len(faces)
    boxes = [] if faces is None else [[round(float(x)) for x in face[:4]] for face in faces[:6]]
    print(f"{os.path.basename(f):40s} {w}x{h} faces={n} {boxes}")
