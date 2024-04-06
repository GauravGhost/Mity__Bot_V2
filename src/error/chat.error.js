const BaseError = require('./base.error');


class ChatError extends BaseError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

module.exports = {
    ChatError
}