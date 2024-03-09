import '@tensorflow/tfjs-node';
import faceapi from '@vladmandic/face-api';
import { tf } from '@vladmandic/face-api';
import { readFileSync } from 'fs';
import * as fs from 'fs';
import sharp from 'sharp';

const modelPath = 'model/';

process();

async function process() {
  // load models
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk('model');


  for (let imageId = 326; imageId <= 512; imageId++) {
    const image = await loadImage(imageId);
    const faces = await detectFaces(image);

    for (let i = 0; i < faces.length; i++) {
      createFolder(`images/${imageId}`);
      await cutFace(image, faces[i], imageId, i + 1);
    }
    console.log(`for image  #${imageId} found: ${faces.length} faces`)
  }
}


async function loadImage(imageId) {
  const response = await fetch(`https://storage.googleapis.com/dima-and-svetlana-wedding.appspot.com/photos-webp-medium/${imageId}.webp`)
  return sharp(await response.arrayBuffer())
    .toFormat('png')
    .toBuffer()
}


function detectFaces(buffer) {
  const tensor = tf.node.decodeImage(buffer, 3);
  const faces = faceapi.detectAllFaces(tensor);
  return faces.run();
}

function cutFace(buffer, face, imageName, faceId) {
  return sharp(buffer)
    .extract({
      left: Math.floor(face._box._x),
      top: Math.floor(face._box._y),
      height: Math.ceil(face._box._height),
      width: Math.ceil(face._box._width)
    })
    .toFile(`./images/${imageName}/${faceId}.png`)
}

function createFolder(name) {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name);
  }
}


