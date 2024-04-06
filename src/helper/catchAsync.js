const {ChatError} = require('../error/chat.error')

function catchAsync(fn) {
    return function (...args) {
        Promise.resolve(fn(...args)).catch((err) => {
            console.log(err);

            const bot = args[0];
            if (err instanceof ChatError) {
                const user = args[1];
                return chatErrorHandler(bot, user, err);
            }
        });
    }
}

const chatErrorHandler = (bot, user, err) => {
    bot.whisper.send(user.id, err.message);
}

module.exports = catchAsync;