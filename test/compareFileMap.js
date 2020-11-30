const getFileMap = require('../src/getFileMap');
const path = require('path');
const folder1 = '../examples/5MB/original';
const folder2 = '../examples/5MB/original copy';
// const folder1 = '../examples/50MB/original';
// const folder2 = '../examples/50MB/original copy';
// const folder1 = '../examples/400MB/original';
// const folder2 = '../examples/400MB/original copy';


(async () => {
    console.time('lo1')
    const fileMap1 = await getFileMap(folder1);
    console.timeEnd('lo1');
    console.time('lo2')
    const fileMap2 = await getFileMap(folder2);
    // console.log(fileMap2)
    console.timeEnd('lo2')
    const added = {};
    const modified = {};
    const deleted = {};
    console.time('hi')
    // added
    Object.keys(fileMap2).forEach(filePath => {
        if (!fileMap1[filePath]) {
            added[filePath] = fileMap2[filePath];
        } else if (fileMap1[filePath] !== fileMap2[filePath]) {
            modified[filePath] = fileMap2[filePath]
        }
    });

    Object.keys(fileMap1).forEach(filePath => {
        if (!fileMap2[filePath]) {
            deleted[filePath] = fileMap2[filePath];
        }
    });

    // modified
    // Object.keys()
    console.timeEnd('hi')
    console.log(Object.keys(added).length, Object.keys(modified).length, Object.keys(deleted).length);
})();

