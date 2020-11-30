'use strict';

const path = require("path");
const fs = require("fs");
const zlib = require("zlib");
const TARGET = './';

const processDir = async (dir, callback) => {
  fs.readdir(path.join(TARGET, dir), (error, files) => {
    if (error) {
      callback(error);
      return;
    }
    let counter = files.length;
    if (!counter) {
      callback(null, "");
      return;
    }
    const result = {};
    for (let [index, filename] of files.entries()) {
      filename = path.join(dir, filename);
      fs.lstat(path.join(TARGET, filename), (error2, stats) => {
        if (error2) {
          callback(error2);
          return;
        }
        if (stats.isFile()) {
          result[filename] = `${ stats.mtimeMs }`;
          if (!--counter) callback(null, result);
        } else if (stats.isDirectory()) {
          processDir(filename, (error3, dirResult) => {
            if (error3) {
              callback(error3);
              return;
            }
            // result[filename] = dirResult;
            if (!--counter) callback(null, result);
          });
        } else if (!--counter) {
          callback(null, result);
        }
      });
    }
  });
};

const start = Date.now();
processDir("../examples/400MB/original", (error, result) => {
  if (error) throw error;
  console.log("Generated in", `${ Date.now() - start }ms`);
  console.log("Plain string size", result);
  zlib.deflate(result, (error2, resultGzipped) => {
    if (error2) throw error2;
    console.log("Gzipped size", resultGzipped.length);
  });
});