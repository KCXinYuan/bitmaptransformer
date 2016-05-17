/*jshint esversion:6*/

const fs = require('fs');

const bitmap = fs.readFileSync(__dirname + '/non-palette-bitmap.bmp');

const headers = {};

console.log(bitmap.slice(54,64));

headers.BitmapType = bitmap.toString('ascii',0,2);
headers.Size = bitmap.readUInt32LE(2);
headers.PixelStart = bitmap.readUInt32LE(10);

console.log(bitmap.readUInt8(54), bitmap.readUInt8(55), bitmap.readUInt8(56), bitmap.readUInt8(57));

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

var byteArray=[];

for(i=headers.PixelStart; i<headers.Size; i++) {
  byteArray.push(bitmap[i]);
}

// console.log(byteArray);

var newbyte =[];
// Transform the data------------------
for(i=0; i<byteArray.length; i++) {
  if(byteArray[i] === 0){
    newbyte.push(110);
  }
  else {
    newbyte.push(byteArray[i]);
  }
}

headerBit = bitmap.slice(0,54);

xformBuf = Buffer.from(newbyte);


newImg = Buffer.concat([headerBit,xformBuf]);

console.log(newImg);

console.log('byteArray length: ' + byteArray.length);
console.log('byteArray length * 6: ' + byteArray.length*6);
console.log('new image length: ' + newImg.length);
console.log('header bit length: ' + headerBit.length);
console.log('xformBuf length: ' + xformBuf.length);

console.log('bitmap ' + bitmap.slice(40,80));
console.log('newImg ' + newImg.slice(40,80));

// Make new bitmap-----------------------

fs.writeFile('newImg2.bmp',newImg,(err)=> {
  if (err) throw err;
  console.log('success!');
});
