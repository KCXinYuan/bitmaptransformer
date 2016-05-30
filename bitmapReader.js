/*jshint esversion:6*/
/*eslint-env es6*/
exports = module.exports = {};

const fs = require('fs');

const bitmap  = exports.bitmap = fs.readFileSync(__dirname + '/non-palette-bitmap.bmp');

const headers = {};

headers.BitmapType = bitmap.toString('ascii',0,2);
headers.Size = bitmap.readUInt32LE(2);
headers.PixelStart = bitmap.readUInt32LE(10);

console.log(headers);

// the four colors for non-palette are
// 00 00 00 = black
// 74 3f 3f = blue
// 2f 69 4b = green
// ba 7b d7 = pink

// the six colors for palette are
// black 00
// dark blue 0f
// light blue 16
// dark green 0c
// light green 09
// light red 1c

var byteArray = exports.byteArray =[];

for(i=headers.PixelStart; i<headers.Size; i++) {
  byteArray.push(bitmap[i]);
}

// console.log(byteArray);

var newbyte = exports.newbyte =[];
// Transform the data------------------
for(i=0; i<byteArray.length; i++) {
  // if(byteArray[i] === 75){
  //   newbyte.push(0);
  // }

  if (byteArray[i] === 00) {
    newbyte.push(Math.random()*255);
  }
  else {
    newbyte.push(byteArray[i]);
  }
}

headerBit = exports.headerBit = bitmap.slice(0,54);

xformBuf = Buffer.from(newbyte);


newImg = exports.newImg = Buffer.concat([headerBit,xformBuf]);

console.log(newImg);

console.log('byteArray length: ' + byteArray.length);
console.log('byteArray length * 6: ' + byteArray.length*6);
console.log('new image length: ' + newImg.length);
console.log('header bit length: ' + headerBit.length);
console.log('xformBuf length: ' + xformBuf.length);

console.log('bitmap ' + bitmap.slice(40,80));
console.log('newImg ' + newImg.slice(40,80));

// Make new bitmap-----------------------

fs.writeFile('newImg.bmp',newImg,(err)=> {
  if (err) throw err;
  console.log('success!');
});
