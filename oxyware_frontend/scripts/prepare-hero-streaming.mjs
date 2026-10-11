import { readFile, writeFile, unlink } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '../public/media/hero/v1'));
const require = createRequire(import.meta.url);
const requireNext = createRequire(require.resolve('next/package.json'));
const sharp = requireNext('sharp');
const containers = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl']);

function readAtoms(buffer, start = 0, end = buffer.length) {
  const entries = [];
  for (let offset = start; offset < end;) {
    if (offset + 8 > end) throw new Error('Incomplete MP4 atom');
    let size = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    let header = 8;
    if (size === 1) {
      size = Number(buffer.readBigUInt64BE(offset + 8));
      header = 16;
    }
    if (size === 0) size = end - offset;
    if (size < header || offset + size > end) throw new Error(`Invalid ${type} atom`);
    entries.push({ type, offset, end: offset + size, start: offset + header, size });
    offset += size;
  }
  return entries;
}

function relocateChunks(buffer, start, end, insertionOffset, oldMoovOffset, shift) {
  for (const atom of readAtoms(buffer, start, end)) {
    if (containers.has(atom.type)) {
      relocateChunks(buffer, atom.start, atom.end, insertionOffset, oldMoovOffset, shift);
    } else if (atom.type === 'stco' || atom.type === 'co64') {
      const count = buffer.readUInt32BE(atom.start + 4);
      const entrySize = atom.type === 'stco' ? 4 : 8;
      if (atom.start + 8 + count * entrySize > atom.end) throw new Error('Invalid chunk offsets');
      for (let index = 0; index < count; index++) {
        const position = atom.start + 8 + index * entrySize;
        const original = entrySize === 4 ? BigInt(buffer.readUInt32BE(position)) : buffer.readBigUInt64BE(position);
        if (original < BigInt(insertionOffset) || original >= BigInt(oldMoovOffset)) continue;
        const updated = original + BigInt(shift);
        if (entrySize === 4) {
          if (updated > 0xffffffffn) throw new Error('Chunk offset exceeds stco capacity');
          buffer.writeUInt32BE(Number(updated), position);
        } else {
          buffer.writeBigUInt64BE(updated, position);
        }
      }
    }
  }
}

for (const number of ['01', '02', '03', '04']) {
  for (const variant of ['mobile', 'desktop']) {
    const file = join(outputDirectory, `${number}-${variant}.mp4`);
    const original = await readFile(file);
    const atoms = readAtoms(original);
    const moov = atoms.find((atom) => atom.type === 'moov');
    const mdat = atoms.find((atom) => atom.type === 'mdat');
    if (!moov || !mdat) throw new Error(`Missing media atoms in ${file}`);
    if (moov.offset < mdat.offset) continue;
    const relocatedMoov = Buffer.from(original.subarray(moov.offset, moov.end));
    relocateChunks(relocatedMoov, 0, relocatedMoov.length, mdat.offset, moov.offset, moov.size);
    await writeFile(file, Buffer.concat([
      original.subarray(0, mdat.offset),
      relocatedMoov,
      original.subarray(mdat.offset, moov.offset),
      original.subarray(moov.end),
    ]));
    process.stdout.write(`${number}-${variant}.mp4: metadata moved before video data\n`);
  }
  const poster = join(outputDirectory, `${number}-poster.jpg`);
  try {
    await readFile(poster);
  } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  await sharp(poster).resize(1280, 720, { fit: 'cover' }).webp({ quality: 85, effort: 6 })
    .toFile(join(outputDirectory, `${number}-poster.webp`));
  await unlink(poster);
}
