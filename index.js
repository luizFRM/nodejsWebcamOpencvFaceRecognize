const cv = require('opencv4nodejs');
const FPS = 30; //webcam fps

const camera = new cv.VideoCapture(0);

const faceClassifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const eyeClassifier = new cv.CascadeClassifier(cv.HAAR_EYE);

setInterval(() => {
  const frame = camera.read();
  const { objects } = faceClassifier.detectMultiScale(frame.bgrToGray());

  objects.forEach(rect => {
    const faceRegion = frame.getRegion(rect);
    const eyeResult = eyeClassifier.detectMultiScale(faceRegion.bgrToGray()); //check if the face has eyes

    eyeResult.objects.forEach(eye => {
      faceRegion.drawRectangle(eye, new cv.Vec(255, 0, 0), 2, cv.LINE_8);
    });

    frame.drawRectangle(rect, new cv.Vec(255, 0, 0), 2, cv.LINE_8);

  });

  cv.imshow("Face recognize", frame);
  cv.waitKey(1);
}, 1000 / FPS);



