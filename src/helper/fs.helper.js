const fs = require('node:fs');

module.exports = {
    isFileExist: (filePath) => fs.existsSync(filePath),
    readFileSync: (filePath) => fs.readFileSync(filePath, 'utf8').toString(),
}