const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

const inputFile = path.join(__dirname, '../public/logo.png');
const outputDir = path.join(__dirname, '../public');

if (!fs.existsSync(inputFile)) {
  console.error('Logo file not found:', inputFile);
  process.exit(1);
}

async function generateFavicons() {
  for (const { size, name } of sizes) {
    const outputPath = path.join(outputDir, name);
    try {
      await sharp(inputFile)
        .resize(size, size)
        .toFile(outputPath);
      console.log(`Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`Error generating ${name}:`, error);
    }
  }
}

generateFavicons().then(() => {
  console.log('Favicon generation complete!');
}).catch(console.error);