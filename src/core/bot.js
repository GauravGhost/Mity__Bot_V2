const {Highrise, GatewayIntentBits} = require("highrise.sdk");
const {settings} = require('../config/server.config');
const {Ready, Chat, Leave, Message, Join, Whisper} = require("./eventHandler");

// New instance of the Highrise class
const bot = new Highrise({
    intents: [
        GatewayIntentBits.Ready,
        GatewayIntentBits.Messages,
        GatewayIntentBits.Joins,
        GatewayIntentBits.Leaves,
        GatewayIntentBits.Error,
        GatewayIntentBits.DirectMessages
    ],
    AutoFetchMessages: true,
    cache: true
}, settings.reconnect);

// EVENTS
bot.on('ready', async (session) => await Ready.readyHandler(session));
bot.on("chatCreate", async (user, message) => await Chat.chatHandler(bot, user, message));
bot.on("whisperCreate", async (user, message) => await Whisper.whisperHandler(bot, user, message));
bot.on("messageCreate", async (user_id, data, message) => await Message.messageHandler(bot, user_id, data, message));
bot.on("playerJoin", async (user) => await Join.joinHandler(bot, user));
bot.on("playerLeave", async (user) => await Leave.leaveHandler(bot, user));

module.exports = bot;