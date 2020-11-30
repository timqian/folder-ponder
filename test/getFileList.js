const fs = require('fs').promises;
const path = require('path');

/**
 * Get metadata of all files inside a folder
 * @param {String} folderPath 
 * @return {Array}
 * [{
 *   path: '',
 *   mtime: '',
 *   size: '',
 * }]
 */
module.exports = async (folderPath) => {
  const fileList = [];

  const getAllPaths = async (dir) => {
    const dirList = await fs.readdir(dir);
    const promiseArr = dirList.map(async item => {
      const currentPath = path.join(dir, item);
      const fileStat = await fs.stat(currentPath);

      if (fileStat.isFile()) {
        fileList.push({
          path: currentPath,
          mtime: fileStat.mtime,
          size: fileStat.size,
        });
      }

      if (fileStat.isDirectory()) {
        await getAllPaths(currentPath);
      }
    });

    await Promise.all(promiseArr);
  }

	await getAllPaths(folderPath);

  return fileList; 
}