const BaseRepository = require('../baseRepository');
const Collection = require('../../../../config/db.config');
const Chapter = new Collection();

class ChapterRepository extends BaseRepository {
    constructor(){
        super();

    }
}

module.exports = ChapterRepository;