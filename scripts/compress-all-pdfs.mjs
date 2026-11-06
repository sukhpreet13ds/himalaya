import { PDFDocument, PDFName, PDFRawStream, PDFNumber } from 'pdf-lib';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const downloadsDir = path.join(process.env.USERPROFILE, 'Downloads');
const brochuresDir = path.resolve('public/brochures');

if (!fs.existsSync(brochuresDir)) {
  fs.mkdirSync(brochuresDir, { recursive: true });
}

const pdfMappings = [
  { source: 'CHOPTA TUNGNATH WITH HIMALAYA HIKES.pdf', target: 'chopta-tungnath.pdf' },
  { source: 'UDAIPUR (2).pdf', target: 'udaipur.pdf' },
  { source: 'Manali - 2N3D - Himalaya Hikes - .pdf', target: 'manali-2n3d.pdf' },
  { source: 'Manali Kasol 3N4D with Himalaya Hikes.pdf', target: 'manali-kasol-3n4d.pdf' },
  { source: 'CHAKRATA 1N 2 DAYS (1) (1).pdf', target: 'chakrata.pdf' },
  { source: 'HAMPTA PASS_ HIMALAYA HIKES_.pdf', target: 'hampta-pass.pdf' },
  { source: 'Jibhi Tirthan Valley with Himalaya Hikes.pdf', target: 'jibhi-tirthan.pdf' },
  { source: 'Mcleodganj.pdf', target: 'mcleodganj.pdf' }
];

async function compressSinglePdf(srcPath, destPath) {
  const originalBytes = fs.readFileSync(srcPath);
  console.log(`\nCompressing: ${path.basename(destPath)} (Original: ${(originalBytes.length / (1024 * 1024)).toFixed(2)} MB)...`);

  try {
    const doc = await PDFDocument.load(originalBytes, { ignoreEncryption: true });
    let converted = 0;

    for (const [ref, obj] of doc.context.enumerateIndirectObjects()) {
      if (obj instanceof PDFRawStream) {
        const subtype = obj.dict.get(PDFName.of('Subtype'));
        if (subtype === PDFName.of('Image')) {
          const filter = obj.dict.get(PDFName.of('Filter'));
          const filterStr = filter ? filter.toString() : '';
          const colorSpace = obj.dict.get(PDFName.of('ColorSpace'))?.toString();
          const w = obj.dict.get(PDFName.of('Width'))?.asNumber();
          const h = obj.dict.get(PDFName.of('Height'))?.asNumber();

          // Handle uncompressed/FlateDecode RGB bitmaps
          if (filterStr === '/FlateDecode' && w && h && w > 150 && h > 150) {
            try {
              const decompressed = zlib.inflateSync(Buffer.from(obj.contents));
              let channels = 3;
              if (colorSpace === '/DeviceGray') channels = 1;
              else if (colorSpace === '/DeviceCMYK') channels = 4;

              if (decompressed.length === w * h * channels) {
                const jpegBuf = await sharp(decompressed, { raw: { width: w, height: h, channels } })
                  .resize({ width: 1100, height: 1100, fit: 'inside', withoutEnlargement: true })
                  .jpeg({ quality: 65, mozjpeg: true })
                  .toBuffer();

                if (jpegBuf.length < obj.contents.length) {
                  const meta = await sharp(jpegBuf).metadata();
                  obj.contents = jpegBuf;
                  obj.dict.set(PDFName.of('Filter'), PDFName.of('DCTDecode'));
                  obj.dict.set(PDFName.of('ColorSpace'), PDFName.of('DeviceRGB'));
                  obj.dict.set(PDFName.of('Length'), PDFNumber.of(jpegBuf.length));
                  obj.dict.set(PDFName.of('Width'), PDFNumber.of(meta.width));
                  obj.dict.set(PDFName.of('Height'), PDFNumber.of(meta.height));
                  converted++;
                }
              }
            } catch (e) {
              // Ignore decode failures for non-standard image streams
            }
          } else if (filterStr === '/DCTDecode' && obj.contents.length > 30000) {
            // Re-compress existing JPEG images
            try {
              const optimized = await sharp(Buffer.from(obj.contents))
                .resize({ width: 1100, height: 1100, fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: 65, mozjpeg: true })
                .toBuffer();

              if (optimized.length < obj.contents.length) {
                const meta = await sharp(optimized).metadata();
                obj.contents = optimized;
                obj.dict.set(PDFName.of('Length'), PDFNumber.of(optimized.length));
                obj.dict.set(PDFName.of('Width'), PDFNumber.of(meta.width));
                obj.dict.set(PDFName.of('Height'), PDFNumber.of(meta.height));
                converted++;
              }
            } catch (e) {
              // Ignore if sharp can't parse specific JPEG format
            }
          }
        }
      }
    }

    const compressedBytes = await doc.save({ useObjectStreams: true });
    fs.writeFileSync(destPath, compressedBytes);
    const compressedSize = compressedBytes.length;
    const ratio = (((originalBytes.length - compressedSize) / originalBytes.length) * 100).toFixed(1);
    console.log(`✓ ${path.basename(destPath)}: ${(originalBytes.length / (1024 * 1024)).toFixed(2)} MB -> ${(compressedSize / (1024 * 1024)).toFixed(2)} MB (-${ratio}%, ${converted} images optimized)`);
  } catch (err) {
    console.error(`Failed to compress ${path.basename(destPath)}, saving original:`, err.message);
    fs.writeFileSync(destPath, originalBytes);
  }
}

async function main() {
  console.log('Starting PDF copy & compression pipeline...');

  for (const { source, target } of pdfMappings) {
    const srcPath = path.join(downloadsDir, source);
    const destPath = path.join(brochuresDir, target);

    if (fs.existsSync(srcPath)) {
      await compressSinglePdf(srcPath, destPath);
    } else {
      console.warn(`Source not found in Downloads: ${source}`);
    }
  }

  console.log('\nAll PDFs processed successfully in public/brochures!');
}

main().catch(err => {
  console.error('Pipeline error:', err);
  process.exit(1);
});

