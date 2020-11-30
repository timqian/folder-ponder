# folder-details

Get details of a folder quickly

## Usage

```js
const folderPonder = require('folder-ponder');

// Get fileMap of a folder
const fileMap = await folderPonder.getFileMap(path, {
    exclute: '',
    include: '',
});

// Get difference of two file maps
const changedFileMap = await folderPonder.getChangedFileMap(oldFileMap, newFileMap);

// Generate a new fileMap according to fileMap and changedFileMap
const newFileMap = await folderPonder.getNewFileMap(oldFileMap, changedFileMap);
```
