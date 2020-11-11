const getFileList = require('./getFileList');
const getFileMap = require('./getFileMap');

(async () => {
  /**
   * Get File List
   * Result Example: [{ path: '', mtime: '', size: '', }];
   * Src: https://github.com/serverlessinc/platform-cn/
   * Size: 390 MB
   * File count: 62,606
   * Time cost: 
   *   - MacBook Pro (16-inch, 2019, 32GB, i7): 980 ~ 1041 ms
   *   - 
   * File List size: 7278686 Bytes
   */
  const folderPath = '../platform-cn';
  console.time('getFileList');
  const fileList = await getFileList(folderPath);
  console.timeEnd('getFileList');
  console.log(JSON.stringify(fileList).length, 'Byte');
  // console.log(fileList);


  /**
   * Get File Map
   * Result Example: { './node_modules/a.js': 234235234235 }
   * Src: https://github.com/serverlessinc/platform-cn/
   * Size: 390 MB
   * File count: 62,606
   * Time cost: 
   *   - MacBook Pro (16-inch, 2019, 32GB, i7): 1047 ~ 1083 ms
   *   - 
   * File List size: 4911281 Bytes
   */
  console.time('getFileMap');
  const fileMap = await getFileMap(folderPath);
  console.timeEnd('getFileMap');
  console.log(JSON.stringify(fileMap).length, 'Byte');
})();