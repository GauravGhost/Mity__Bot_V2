const {settings} = require("../../config/server.config");
const {WebApi} = require("highrise.sdk");
const CatchAsync = require('../../helper/catchAsync');

const emoteHandler = async (bot, sender, receiver, emote) => {
console.log(sender, receiver, emote);
    console.log(`[EMOTE]: ${sender.username}:${sender.id} - ${emote} - ${receiver.username}:${receiver.id}`);
}
module.exports = {
    emoteHandler
}