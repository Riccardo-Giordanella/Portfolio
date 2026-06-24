import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import { join, extname, dirname, basename } from "path";

const root = "src/assets";

// Per-file max width overrides; everything else uses the default.
const DEFAULT_MAX_W = 1600; // project screenshots (also shown enlarged in the modal)
const overrides = {
  "riccardo.png": 512, // navbar logo, displayed tiny
  "riccardo_2.jpg": 800, // hero avatar + about portrait
};

// Tiny utility assets we don't bother with (and unused ones).
const skip = new Set(["white_arrow.png"]);

function walk(dir) {
  let out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (/\.(png|jpe?g)$/i.test(f)) out.push(p);
  }
  return out;
}

let before = 0;
let after = 0;

for (const p of walk(root)) {
  const name = p.split(/[\\/]/).pop();
  if (skip.has(name)) continue;

  const maxW = overrides[name] ?? DEFAULT_MAX_W;
  // Lowercase the output filename: web asset imports are case-sensitive on
  // Linux (deploy), so "Portfolio_v2_1.png" must become "portfolio_v2_1.webp".
  const outName = basename(p, extname(p)).toLowerCase() + ".webp";
  const out = join(dirname(p), outName);

  const img = sharp(p);
  const meta = await img.metadata();
  const origSize = statSync(p).size;

  await img
    .resize({ width: Math.min(meta.width, maxW), withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);

  const newSize = statSync(out).size;
  before += origSize;
  after += newSize;
  unlinkSync(p); // remove the original raster

  console.log(
    `${name.padEnd(18)} ${(origSize / 1024).toFixed(0).padStart(6)}KB -> ${(
      newSize / 1024
    )
      .toFixed(0)
      .padStart(6)}KB  (${out})`
  );
}

console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(
    after /
    1024 /
    1024
  ).toFixed(2)}MB  (saved ${(((before - after) / before) * 100).toFixed(1)}%)`
);
