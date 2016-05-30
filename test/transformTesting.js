/*jshint esversion:6*/
/*eslint-env es6*/
const expect = require('chai').expect;
const fs = require('fs');
const bitmapReader = require('../bitmapReader');

describe('Buffer Data', () => {
  it('should read in information as a buffer', () => {
    expect(Buffer.isBuffer(bitmapReader.bitmap)).to.eql(true);
  });

  it('should create a new bitmap that is different from the original', ()=> {
    expect(bitmapReader.bitmap).to.not.eql(fs.readFileSync('newImg.bmp'));
  });

  it('should end up with the same amount of bytes as the original',()=> {
    expect(bitmapReader.byteArray.length + bitmapReader.headerBit.length).to.eql(bitmapReader.newImg.length);
  });
});
