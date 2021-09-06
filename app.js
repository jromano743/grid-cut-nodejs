const { MIME_PNG } = require('jimp');
const { MIME_JPEG } = require('jimp');
const Jimp = require('jimp');

let args = process.argv.slice(2);
let image_path = args[0];
let width_grid = parseInt(args[1]);
let height_grid = parseInt(args[2]);
let name = args[3];

if(args.lenght < 4){
    console.error("Arguments are missing");
    console.error("The arguments: path width height output_name");
    console.error("The arguments type: String Number Number String");
}

if(isNaN(width_grid) || isNaN(height_grid) || image_path == ' ' || name == ' '){
    console.error("Error, some argument is wrong");
    console.error("The arguments: path width height output_name");
    console.error("The arguments: String Number Number String");
    return
}

try{
    Jimp.read(image_path)
    .then(image => {
        console.log("Image data:");
        console.log("Width:", image.bitmap.width, "Height:", image.bitmap.height);

        let width_iterations = image.bitmap.width / width_grid;
        let height_iterations = image.bitmap.height / height_grid;
        let counter = 0;

        console.log("Grid size:",width_grid,"x",height_grid);
        console.log("Total images:", width_iterations * height_iterations);

        for(let j=0;j<height_iterations;j++){
            for(let i=0;i<width_iterations;i++){ 
                createImage(image.clone(), width_grid * i, height_grid * j, width_grid, height_grid, `${name}_${counter}`);
                counter++;
            }
        }
    })
    .catch(err => {
        console.error(err);
    })
}catch(err){
    console.error(err);
}

function createImage(image, x, y, w, h, name_file){
    image.crop(x,y,w,h)
    image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if(err) return console.error(err);
        let new_name = `${name_file}.${image.getExtension()}`;
        image.write(new_name);
        console.log("Created:", new_name);
    })
}