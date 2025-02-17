// node cli.js to565 <in.png> <out.bin>
// node cli.js from565 <in.bin> <width> <height> <out.png>

const { fsfToJimp, jimpToFsf } = require(".");
const { Jimp } = require("jimp");
const fs = require("fs");
const args = process.argv;


function printUsage() {
    console.log("Usage:")
    console.log("  node src/cli.js to565 <in.png> <out.bin>")
    console.log("  node cli.js from565 <in.bin> <width> <height> <out.png>")
}

switch (args[2]) {
    case "to565":
        Jimp.read(args[3]).then(jimpImage => {
            const bitmapData = jimpToFsf(jimpImage)
            return fs.promises.writeFile(args[4], bitmapData)
        }).then(() => process.exit(0))
        break;
    case "from565":
        fs.promises.readFile(args[3]).then(bitmapData => {
            const jimpImage = fsfToJimp(bitmapData, parseInt(args[4]), parseInt(args[5]))
            return jimpImage.write(args[6])
        }).then(() => process.exit(0))
        break;
    default:
        printUsage()
        process.exit(1)
}