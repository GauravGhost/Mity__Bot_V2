const {Highrise, GatewayIntentBits} = require("highrise.sdk");
const {settings} = require('../config/server.config');

const {
    Ready,
    Chat,
    Leave,
    Message,
    Join,
    Whisper, Move, Emote
} = require("./eventHandler");

// New instance of the Highrise class
const bot = new Highrise({
    intents: [
        GatewayIntentBits.Ready,
        GatewayIntentBits.Messages,
        GatewayIntentBits.Joins,
        GatewayIntentBits.Leaves,
        GatewayIntentBits.Error,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Movements,
        GatewayIntentBits.Emotes
    ],
    AutoFetchMessages: true,
    cache: true
}, settings.reconnect);

// EVENTS
bot.on('ready', async (session) => await Ready.readyHandler(bot, session));
bot.on("chatCreate", async (user, message) => await Chat.chatHandler(bot, user, message));
bot.on("whisperCreate", async (user, message) => await Whisper.whisperHandler(bot, user, message));
bot.on("messageCreate", async (user_id, data, message) => await Message.messageHandler(bot, user_id, data, message));
bot.on("playerJoin", async (user) => await Join.joinHandler(bot, user));
bot.on("playerLeave", async (user) => await Leave.leaveHandler(bot, user));
bot.on("playerEmote", async (sender, receiver, emote) => await Emote.emoteHandler(bot, sender, receiver, emote));

// bot.on("playerMove", async (user, anchor) => await Move.movementHandler(bot, user, anchor));

// AnchorPosition { entity_id: '638b8b3d00000000000000e7', anchor_ix: 1 }

bot.on('error', async (err) => {
    console.error("Error generated from error event: ", err);
});

module.exports = bot;