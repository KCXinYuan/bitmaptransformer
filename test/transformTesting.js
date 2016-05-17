/*jshint esversion:6*/
/*eslint-env es6*/
const expect = require('chai').expect;
const bitmapReader = require('../bitmapReader');
const bitmap = bitmapReader.bitmap;

describe('Buffer Data', () => {
  it('should read in information as a buffer', () => {
    expect(Buffer.isBuffer(bitmap)).to.eql(true);
  });
});
