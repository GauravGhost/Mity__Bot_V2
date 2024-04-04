const {Highrise, GatewayIntentBits} = require("highrise.sdk");
const {settings, ROOM_ID, TOKEN_ID2} = require('../config/server.config');
const CatchAsync = require('../helper/catchAsync');

const {
    Ready, ve
} = require("./eventHandler");

// New instance of the Highrise class
const bot = new Highrise({
    intents: [
        GatewayIntentBits.Ready,
    ],
    cache: true
}, settings.reconnect);

// EVENTS
bot.on('ready', async (session) => await Ready.readyHandler(bot, session));

bot.on('error', async (err) => {
    console.error("Error generated from error event: ", err);
});

module.exports = bot;