const bot = require('./core/bot');
const { TOKEN_ID, ROOM_ID } = require("./config/server.config");


process.on('unhandledRejection', async (err, promise) => {
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
    console.error(promise);
});

// Login to the room.
bot.login(TOKEN_ID, ROOM_ID);