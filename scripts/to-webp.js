const sharp = require('sharp');
const fs = require('fs');

let buffer
fs.readdirSync('../photos-original')
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .forEach(async (file, index) => {
  const fileNumber = index + 1;
  buffer = fs.readFileSync(`../photos-original/${file}`);
  await sharp(buffer)
    // .resize({width: 1920})
    // .resize({ width: 1280 })
    .resize({height: 480})
    .blur(10)
    .toFormat('webp')
    .toFile(`../photos-webp-blur/${fileNumber}.webp`);
    console.log(`image ${fileNumber} finished`);
  });
