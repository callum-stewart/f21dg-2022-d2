"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCSVToArrayOfObjects = void 0;

var _convertStringToNumber = require("./convert-string-to-number");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var convertCSVToArrayOfObjects = function convertCSVToArrayOfObjects(data, _ref) {
  var header = _ref.header,
      separator = _ref.separator;
  var csv = data;
  var rows = csv.split(/(?!\B"[^"]*)\n(?![^"]*"\B)/g);
  var array = [];
  var headerRow;
  var headerObj;
  var content = [];
  rows.forEach(function (row, idx) {
    if (idx === 0) {
      headerRow = row.split(separator);

      if (header) {
        array.push(headerRow);
      }

      headerRow.forEach(function (headerItem) {
        headerObj = Object.assign({}, headerObj, _defineProperty({}, headerItem, undefined));
      });
    } else if (rows.length - 1 !== idx) {
      var values = row.split(separator);
      values.forEach(function (value, i) {
        var convertedToNumber = (0, _convertStringToNumber.convertStringToNumber)(value);
        var thisValue = Number.isNaN(convertedToNumber) ? value : convertedToNumber;
        headerObj = Object.assign({}, headerObj, _defineProperty({}, headerRow[i], thisValue));
      });
      content.push(headerObj);
    }
  });
  array.push.apply(array, content);
  return array;
};

exports.convertCSVToArrayOfObjects = convertCSVToArrayOfObjects;