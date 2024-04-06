
class Collection {
    constructor(data) {
        this.data = data || [];
    }

    find(query) {
        if (!query) {
            return this.data;
        }
        return this.data.filter(item => {
            for (let key in query) {
                if (query[key] !== item[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    findOne(query) {
        return this.find(query)[0];
    }

    insert(item) {
        this.data.push(item);
        return item;
    }
}

module.exports = Collection;
