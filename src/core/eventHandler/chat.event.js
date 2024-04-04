const {settings} = require("../../config/server.config");
const {ping, emote, bhagavadHandler} = require("./commandManager/general.manager");
const {cmd} = require("../../helper/constant");
const {
    whereAmI,
    sendMessageToUser,
    getOutfit,
    getInventory,
    say,
    changeOutfit
} = require("./commandManager/mod.manager");

const chatHandler = async (bot, user, message, whisper = false) => {
    console.log(`[CHAT]: ${user.username}:${user.id} - ${message}`);
    if (message.includes('@' + settings.botName)) return;

    // Getting Necessary Details.
    const prefix = settings.prefix;
    const permission = await bot.player.permissions.get(user.id);
    const isModerator = permission.moderator || false;
    const isOwner = user.id === settings.ownerId;
    let command = message.startsWith(prefix) ? message.slice(prefix.length).split(' ')[0] : '';

    // COMMAND HANDLER which starts with prefix.
    switch (command) {
        case cmd.PING:
            await ping(bot);
            break;

        case cmd.EMOTE:
            await emote(bot, isModerator, user, message);
            break;

        case cmd.VERSE:
            await bhagavadHandler(bot, user);
            break;

        // MOD COMMANDS
        case cmd.WHEREAMI:
            isModerator ? await whereAmI(bot, user) : null;
            break;

        case cmd.SAY:
            isOwner ? await say(bot, message) : null;
            break;

        case cmd.SEND:
            isOwner ? await sendMessageToUser(bot, user, message) : null;
            break;

        case cmd.INVENTORY:
            isOwner ? await getInventory(bot) : null;
            break;

        case cmd.OUTFIT:
            await getOutfit(bot, user);
            break;

        case cmd.CHANGE_OUTFIT:
            isOwner ? await changeOutfit(bot, message) : null;
            break;
    }

}
module.exports = {
    chatHandler
}