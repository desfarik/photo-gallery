import '@tensorflow/tfjs-node';
import faceapi from '@vladmandic/face-api';
import { tf } from '@vladmandic/face-api';
import { readFileSync } from 'fs';
import * as fs from 'fs';
import sharp from 'sharp';

const modelPath = 'model/';

import groupping from './groupping.json' assert { type: 'json' };

groupping.BEST_WIFE.push(23);
const ALL = {
  0: 'ALICE',
  1: 'SISTER',
  2: 'LENA',
  3: 'JEKA',
  4: 'MAMA_1',
  5: 'KRISTI',
  7: 'DARIA',
  8: 'MAMA_2',
  9: 'ALENA',
  10: 'NIKITA_1',
  11: 'NIKITA_2',
  13: 'VLAD',

}
process();

async function process() {
  // load models
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);

  const faces = (await loadFaceOptions('306'));

  for (let imageId = 1; imageId <= 512; imageId++) {
    const faceDescriptors = await loadFaceOptions(imageId);
    let isExist = false;
    if (faceDescriptors.length) {
      faces.forEach((face, index) => {
        isExist = faceDescriptors.some(faceDescriptor => {
          const distance = faceapi.euclideanDistance(face, faceDescriptor);
          return 0.6 > distance;
        })
        if (isExist && ALL[index]) {
          const locations = groupping[ALL[index]] || [];
          locations.push(imageId);
          groupping[ALL[index]] = locations;
        }
      })
    }
    console.log(`process image #${imageId}: ${isExist}`);
    isExist && fs.writeFileSync('./groupping.json', JSON.stringify(groupping));
  }
}


const loadFaceOptions = async (imageId) => {
  const buffer = await loadImage(imageId);
  const tensor = tf.node.decodeImage(buffer, 3);
  const faces = await faceapi.detectAllFaces(tensor).withFaceLandmarks().withFaceExpressions().withFaceDescriptors().run();
  return faces.map(face => face.descriptor);
};


async function loadImage(imageId) {
  if (fs.existsSync(`./images/cache/${imageId}.png`)) {
    return fs.readFileSync(`./images/cache/${imageId}.png`);
  }
  const response = await fetch(`https://storage.googleapis.com/dima-and-svetlana-wedding.appspot.com/photos-webp-medium/${imageId}.webp`)
  const buffer = await sharp(await response.arrayBuffer())
    .toFormat('png')
    .toBuffer()
  fs.writeFileSync(`./images/cache/${imageId}.png`, buffer);
  return buffer;
}
