// import fs from 'fs/promises'
// import path from 'path'
// import { fetchFile } from '@ffmpeg/ffmpeg'
// import { PUBLIC_PATH } from './src/paths.js'
// import { ffmpeg } from './src/ffmpeg.js'

// const doneFiles = []

// ;(async () => {
//   const dir = path.resolve(PUBLIC_PATH, './movies')

//   console.log('Loading ffmpeg')
//   await ffmpeg.load();
//   console.log('Loaded ffmpeg')

//   const files = await fs.readdir(dir)
//   console.log('Start convert files', files)
//   for (const file of files) {
//     if (path.extname(file) !== '.gif') continue
//     const name = path.basename(file, '.gif')
//     if (doneFiles.includes(name)) continue

//     const newFile = `${name}.webm`

//     const buf = await fetchFile(path.resolve(dir, file))
//     ffmpeg.FS('writeFile', 'file', buf)
//     await ffmpeg.run('-i', 'file', '-movflags', 'faststart', '-pix_fmt', 'yuv420p', '-row-mt', '1', newFile)
//     const exported = ffmpeg.FS('readFile', newFile)
//     await fs.writeFile(path.resolve(dir, `./${newFile}`), exported, 'binary')
//     console.log(`outputed: ${newFile}`)
//   }
// })()

const path = require('path');
const fs = require('fs');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const MOVIE_PATH = path.resolve(__dirname, '../public/movies');
const SIZE = 574;
const ffmpeg = createFFmpeg({ log: true });

async function main() {
  await ffmpeg.load();
  const files = await fs.readdirSync(MOVIE_PATH).filter((name) => name.indexOf('.gif') > -1);
  for (const file of files) {
    const newFile = file.replace('gif', 'webm');
    const input = path.resolve(MOVIE_PATH, file);
    const output = path.resolve(MOVIE_PATH, newFile);
    const buffer = await fetchFile(input);
    ffmpeg.FS('writeFile', 'file', buffer);
    await ffmpeg.run(
      ...[
        // -i <filename> 入力ファイル
        '-i',
        'file',
        // -c <codec> コーデックを指定
        '-c',
        'vp9',
        // ビデオのビットレートを指定。0 を指定することで、-crf オプションで品質を指定できる。
        '-b:v',
        '0',
        // 品質を指定。範囲は0〜63で、低いほど品質が高くなる。
        '-crf',
        '41',
        // 消費するスレッド数を指定
        '-threads',
        '4',
        // マルチスレッド処理を有効化する
        '-row-mt',
        '1',
        // リサイズなどのエフェクトを指定
        '-vf',
        `crop='min(iw,ih)':'min(iw,ih)',scale=${SIZE}:${SIZE}`,
        newFile,
      ],
    );
    const converted = ffmpeg.FS('readFile', newFile);
    fs.writeFileSync(output, converted);
    console.log(`converted: ${newFile}`);
  }
  console.log('completed convert files');
}

main();