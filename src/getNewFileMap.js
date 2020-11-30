const getNewFileMap = async (oldFileMap, changedFileMap) => {
  const { added, modified, deleted } = changedFileMap;
  const newFileMap = { ...oldFileMap, ...added, ...modified }
  Object.keys(deleted).forEach(key => {
    delete newFileMap[key];
  })

  return newFileMap;
}

module.exports = getNewFileMap;

// getNewFileMap({a: 3, b:2}, {added: {c:3}, modified: {a:5}, deleted: {b:3}})
//   .then(res => console.log(res));