module.exports = async (oldFileMap, newFileMap) => {
  const added = {};
  const modified = {};
  const deleted = {};

  // Get added and modified files
  Object.keys(newFileMap).forEach(filePath => {
    if (!oldFileMap[filePath]) {
      added[filePath] = newFileMap[filePath];
    } else if (oldFileMap[filePath] !== newFileMap[filePath]) {
      modified[filePath] = newFileMap[filePath]
    }
  });

  // Get deleted files
  Object.keys(oldFileMap).forEach(filePath => {
    if (!newFileMap[filePath]) {
      deleted[filePath] = newFileMap[filePath];
    }
  });

  return {
    added, modified, deleted,
  }
}