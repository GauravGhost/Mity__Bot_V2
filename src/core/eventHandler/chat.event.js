const chatHandler = async (bot, user, message, whisper = false) => {
    const permission = await bot.player.permissions.get(user.id);
    const isModerator = permission.moderator;

    console.log(isModerator);
    console.log(`[CHAT]: ${user.username}:${user.id} - ${message}`);
}
module.exports = {
    chatHandler
}