const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create a simple lion favicon programmatically
async function createLionFavicon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <!-- Background Circle -->
      <rect width="512" height="512" rx="80" fill="#FF5722"/>
      
      <!-- Stylized Lion/Narsimha Symbol -->
      <g transform="translate(256, 256)">
        <!-- Lion Face -->
        <path d="M -120 -80 L 0 -140 L 120 -80 L 100 80 L 0 120 L -100 80 Z" 
              fill="#FFFFFF" opacity="0.95"/>
        
        <!-- Eyes -->
        <circle cx="-45" cy="-20" r="25" fill="#8B0000"/>
        <circle cx="45" cy="-20" r="25" fill="#8B0000"/>
        <circle cx="-45" cy="-25" r="12" fill="#FFD700"/>
        <circle cx="45" cy="-25" r="12" fill="#FFD700"/>
        
        <!-- Crown/Third Eye -->
        <circle cx="0" cy="-70" r="15" fill="#FFD700"/>
        <path d="M -60 -100 L 0 -120 L 60 -100" 
              stroke="#FFD700" stroke-width="12" fill="none" stroke-linecap="round"/>
        
        <!-- Nose -->
        <path d="M -20 20 L 0 30 L 20 20 L 15 5 L -15 5 Z" fill="#8B0000"/>
        
        <!-- Fangs -->
        <path d="M -35 40 L -30 60 L -25 40" fill="#FFFFFF"/>
        <path d="M 25 40 L 30 60 L 35 40" fill="#FFFFFF"/>
      </g>
    </svg>
  `;
  
  return Buffer.from(svg);
}

async function generateFavicons() {
  const svgBuffer = await createLionFavicon();
  const outputDir = path.join(__dirname, '../public');
  
  // Generate PNG favicons in various sizes
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 64, name: 'favicon-64x64.png' },
    { size: 128, name: 'favicon-128x128.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
  ];
  
  for (const { size, name } of sizes) {
    const outputPath = path.join(outputDir, name);
    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✅ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Error generating ${name}:`, error.message);
    }
  }
  
  // Generate favicon.ico with multiple sizes
  try {
    // Create a 256x256 version for ICO
    const ico256 = await sharp(svgBuffer)
      .resize(256, 256)
      .png()
      .toBuffer();
    
    // Also create smaller versions for ICO
    const ico48 = await sharp(svgBuffer)
      .resize(48, 48)
      .png()
      .toBuffer();
      
    const ico32 = await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toBuffer();
      
    const ico16 = await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toBuffer();
    
    // Save the 32x32 as favicon.ico (most compatible)
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), ico32);
    console.log('✅ Generated favicon.ico');
    
    // Save the SVG version
    fs.writeFileSync(path.join(outputDir, 'favicon.svg'), svgBuffer);
    console.log('✅ Saved favicon.svg');
    
  } catch (error) {
    console.error('❌ Error generating favicon.ico:', error.message);
  }
}

// Update site.webmanifest
function updateManifest() {
  const manifest = {
    name: "Mahavatar Narsimha",
    short_name: "Mahavatar",
    description: "Official website for Mahavatar Narsimha - Epic animated movie 2025",
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "/favicon-64x64.png",
        sizes: "64x64",
        type: "image/png"
      },
      {
        src: "/favicon-128x128.png",
        sizes: "128x128",
        type: "image/png"
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#FF5722",
    background_color: "#FFFFFF",
    display: "standalone",
    start_url: "/",
    orientation: "portrait"
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../public/site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✅ Updated site.webmanifest');
}

async function main() {
  console.log('🎬 Generating Mahavatar Narsimha favicons...\n');
  await generateFavicons();
  updateManifest();
  console.log('\n🎉 All favicons generated successfully!');
  console.log('💡 Clear browser cache and restart dev server to see changes');
}

main().catch(console.error);