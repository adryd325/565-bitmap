const { Jimp } = require("jimp");

function fsfToJimp(fsf, width, height) {
    let bitmap = Buffer.alloc(fsf.length * 2);
    for (let i = 0; i < fsf.length / 2; i++) {
        fsfOffset = i * 2;
        const bits = fsf.at(fsfOffset) | (fsf.at(fsfOffset + 1) << 8);

        // this is lossy :(
        const red = ((bits & 0b1111100000000000) >> 11) * 8;
        const green = ((bits & 0b11111100000) >> 5) * 4;
        const blue = (bits & 0b11111) * 8;

        jimpOffset = i * 4;
        bitmap.set([red, green, blue, 0xff], jimpOffset);
    }

    return Jimp.fromBitmap({
        width,
        height,
        data: bitmap,
    });
}

function jimpToFsf(jimp) {
    const bitmap = jimp.bitmap.data;
    const fsfBitmap = Buffer.alloc(bitmap.length / 2);
    for (let i = 0; i < bitmap.length / 4; i++) {
        jimpOffset = i * 4;

        const red = Math.floor(bitmap.at(jimpOffset) / 8);
        const green = Math.floor(bitmap.at(jimpOffset + 1) / 4);
        const blue = Math.floor(bitmap.at(jimpOffset + 2) / 8);

        bits = (red << 11) | (green << 5) | blue;

        fsfOffset = i * 2;
        fsfBitmap.set([bits & 0xff, bits >> 8], fsfOffset);
    }
    return fsfBitmap;
}

module.exports = {
    jimpToFsf,
    fsfToJimp
}