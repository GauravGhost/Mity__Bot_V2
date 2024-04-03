const {chatHandler} = require("./chat.event");

const whisperHandler = async (bot, user, message) => {
    // Fetching Permission of user if he is mod or not.
    const permission = await bot.player.permissions.get(user.id);
    const isModerator = permission.moderator;

    // Only Mod can use command in Whisper.
    if (isModerator) {
        await chatHandler(bot, user, message, true);
    }
    console.log(`[CHAT]: ${user.username}:${user.id} - ${message}`);
}
module.exports = {
    whisperHandler
}