/*jshint esversion:6*/
/*eslint-env es6*/
exports = module.exports = {};
const fs = require('fs');
const bitmap  = exports.bitmap = fs.readFileSync(__dirname + '/non-palette-bitmap.bmp');
const headers = {};

headers.BitmapType = bitmap.toString('ascii',0,2);
headers.Size = bitmap.readUInt32LE(2);
headers.PixelStart = bitmap.readUInt32LE(10);

exports.transform = function() {
  var stream = fs.createWriteStream('./newImg.bmp');
  for(var i=0; i<bitmap.length; i++) {
    var data = bitmap[i];
    if (i > headers.PixelStart) {
      if (bitmap[i] === 0) data = Math.random()*255;
    }

    var buffer = new Buffer(1);
    buffer.writeUInt8(data, 0);
    stream.write(buffer);
  }
  stream.end();
};

exports.transform(bitmap);
