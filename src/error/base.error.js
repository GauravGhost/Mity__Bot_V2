class BaseError extends Error{
    constructor(message) {
        super(message);
    }
}

module.exports = BaseError;