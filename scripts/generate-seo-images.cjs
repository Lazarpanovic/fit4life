// Generates favicons, app icons and 1200x630 Open Graph images.
// Run after changing the logo or a page photo: node scripts/generate-seo-images.cjs
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const logo = path.join(publicDir, "fit4life-assets/logo-mark-light.png");

const squareIcon = (size, background) =>
  sharp(logo)
    .resize(Math.round(size * 0.84), Math.round(size * 0.84), {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: Math.round(size * 0.08),
      bottom: size - Math.round(size * 0.84) - Math.round(size * 0.08),
      left: Math.round(size * 0.08),
      right: size - Math.round(size * 0.84) - Math.round(size * 0.08),
      background,
    })
    .png()
    .toBuffer();

// ICO files may embed PNG images directly.
const toIco = (images) => {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
};

const ogSources = () => {
  const data = fs.readFileSync(path.join(root, "src/data/data.ts"), "utf8");
  const images = [...data.matchAll(/"\/([\w-]+\.jpg)"/g)].map(
    (match) => match[1],
  );
  return [...new Set(["hero-section.jpg", ...images])].filter(
    (file) => !file.startsWith("testimonial"),
  );
};

(async () => {
  const white = { r: 255, g: 255, b: 255, alpha: 1 };
  const clear = { r: 255, g: 255, b: 255, alpha: 0 };

  const icoImages = await Promise.all(
    [16, 32, 48].map(async (size) => ({
      size,
      data: await squareIcon(size, clear),
    })),
  );
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), toIco(icoImages));
  fs.writeFileSync(
    path.join(publicDir, "apple-touch-icon.png"),
    await squareIcon(180, white),
  );
  for (const size of [192, 512]) {
    fs.writeFileSync(
      path.join(publicDir, `icon-${size}.png`),
      await squareIcon(size, white),
    );
  }

  const ogDir = path.join(publicDir, "og");
  fs.mkdirSync(ogDir, { recursive: true });
  for (const file of ogSources()) {
    await sharp(path.join(publicDir, file))
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(ogDir, file));
  }
  console.log("SEO images generated.");
})();
