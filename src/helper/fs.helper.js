const fs = require('node:fs');

module.exports = {
    isFileExist: (filePath) => fs.existsSync(filePath)
}