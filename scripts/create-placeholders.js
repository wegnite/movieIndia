const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const castImages = [
  { name: 'narsimha.jpg', text: 'Narsimha', color: '#FF6B00' },
  { name: 'prahlada.jpg', text: 'Prahlada', color: '#4CAF50' },
  { name: 'kayadhu.jpg', text: 'Kayadhu', color: '#9C27B0' },
  { name: 'hiranyakashipu.jpg', text: 'Hiranyakashipu', color: '#F44336' }
];

const videoThumbs = [
  { name: 'teaser-thumb.jpg', text: 'Teaser', color: '#2196F3' },
  { name: 'making-thumb.jpg', text: 'Making', color: '#FF9800' }
];

async function createPlaceholder(filename, text, bgColor, outputDir) {
  const width = filename.includes('thumb') ? 1280 : 400;
  const height = filename.includes('thumb') ? 720 : 600;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="${filename.includes('thumb') ? 60 : 40}" 
            fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `;
  
  const outputPath = path.join(outputDir, filename);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
    .toFile(outputPath);
  
  console.log(`Created: ${outputPath}`);
}

async function main() {
  // Create cast images
  for (const img of castImages) {
    await createPlaceholder(img.name, img.text, img.color, path.join(__dirname, '../public/images/cast'));
  }
  
  // Create video thumbnails
  for (const img of videoThumbs) {
    await createPlaceholder(img.name, img.text, img.color, path.join(__dirname, '../public/images'));
  }
  
  console.log('All placeholder images created successfully!');
}

main().catch(console.error);