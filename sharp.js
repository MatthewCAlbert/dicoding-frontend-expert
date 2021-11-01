const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
 
const target = path.resolve('src/public/images');
const dist = path.resolve('dist');
const destination = path.resolve('dist/images');
 
if (!fs.existsSync(dist)) {
fs.mkdirSync(dist);
}
if (!fs.existsSync(destination)) {
fs.mkdirSync(destination);
}
 
fs.readdirSync(target)
.forEach(image => {
  const ext = image.match(/\.(jpe?g|png)/i)?.[0];

  if( !ext ) return;
 
 // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
  sharp(`${target}/${image}`)
    .toFormat('webp')
    .resize(800)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
      .slice(0, -1)
      .join('.')}-large.webp`));
 
 // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
  sharp(`${target}/${image}`)
    .toFormat('webp')
    .resize(480)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
      .slice(0, -1)
      .join('.')}-small.webp`));
 
 // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
  sharp(`${target}/${image}`)
    .resize(800)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
      .slice(0, -1)
      .join('.')}-large${ext}`));
 
 // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
  sharp(`${target}/${image}`)
    .resize(480)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
      .slice(0, -1)
      .join('.')}-small${ext}`));
});

process.exit(0);