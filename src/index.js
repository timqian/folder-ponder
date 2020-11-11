const getFileList = require('./getFileList');

(async () => {
  const folderPath = '../platform-cn';
  console.time('getFileList');
  const fileList = await getFileList(folderPath);
  console.timeEnd('getFileList')
  console.log(fileList.length);
})();
