const path = require('node:path');
module.exports = {
    outfitPath: (filename) => path.join(__dirname, '..', 'config/json/outfit', filename + '.json')
    
}
