const {settings} = require("../../config/server.config");
const {ping} = require("./commandManager/general.manager");
const {cmd} = require("../../helper/constant");
const {whereAmI, sendMessageToUser, getOutfit, getInventory} = require("./commandManager/mod.manager");

const chatHandler = async (bot, user, message, whisper = false) => {
    const prefix = settings.prefix;
    const permission = await bot.player.permissions.get(user.id);
    const isModerator = permission.moderator || false;
    const isOwner = user.id === settings.ownerId;

    let command = message.startsWith(prefix) ? message.slice(prefix.length).split(' ')[0] : '';

    switch (command) {
        case cmd.PING:
            await ping(bot);
            break;

        // MOD COMMANDS
        case cmd.WHEREAMI:
            isModerator ? await whereAmI(bot, user) : (() => {
            })();
            break;

        case cmd.SEND:
            isOwner ? await sendMessageToUser(bot, user, message) : (() => {
            })();
            break;

        case cmd.INVENTORY:
            isOwner ? await getInventory(bot) : (() => {
            })();
            break;

        case cmd.OUTFIT:
            isOwner ? await getOutfit(bot, user) : (() => {});
    }
    console.log(isModerator);
    console.log(`[CHAT]: ${user.username}:${user.id} - ${message}`);

}
module.exports = {
    chatHandler
}

// 'pants-n_starteritems2019cuffedjeanswhite',