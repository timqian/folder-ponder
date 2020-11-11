const fs = require('fs').promises;
const path = require('path');

/**
 * Get metadata of all files inside a folder
 * @param {String} folderPath 
 * @return {Array}
 * {
 *   'node_modules/a.js': 234235234235,
 * }
 */
module.exports = async (folderPath) => {
  const fileMap = {};

  const getAllPaths = async (dir) => {
    const dirList = await fs.readdir(dir);
    const promiseArr = dirList.map(async item => {
      const currentPath = path.join(dir, item);
      const fileStat = await fs.stat(currentPath);

      if (fileStat.isFile()) {
        fileMap[currentPath] = fileStat.mtimeMs;
      }

      if (fileStat.isDirectory()) {
        await getAllPaths(currentPath);
      }
    });

    await Promise.all(promiseArr);
  }

	await getAllPaths(folderPath);

  return fileMap; 
}