# 565 Bitmap Converter

convert to and from 565 LE bitmaps

## Library

fsfToJimp(fsf, width, height) takes a 565 binary buffer with width and height parameters and returns a JIMP image

jimpToFsf(jimp) takes a JIMP image and returns a 565 binary buffer

## CLI

Usage:
node src/cli.js to565 <in.png> <out.bin>
node cli.js from565 <in.bin> <width> <height> <out.png>
