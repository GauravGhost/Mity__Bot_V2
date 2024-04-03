const {settings} = require("../../config/server.config");
const joinHandler = async(bot, user) => {
    bot.message.send(`@${user.username} Welcome to the ${settings.roomName}`);
    console.log(`[PLAYER JOINED]: ${user.username}:${user.id}`);
}
module.exports = {
    joinHandler
}