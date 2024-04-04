const bot = require('./core/bot');
const bot2 = require('./core/bot2')
const { TOKEN_ID, ROOM_ID, TOKEN_ID2} = require("./config/server.config");

process.on('unhandledRejection', async (err, promise) => {
    console.error("Error from unhandledRejection");
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
    console.error("promise", promise);
});

// Login to the room.
bot.login(TOKEN_ID, ROOM_ID);
// bot2.login(TOKEN_ID2, ROOM_ID);