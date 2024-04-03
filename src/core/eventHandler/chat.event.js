const {settings} = require("../../config/server.config");
const {ping} = require("./commandManager/general.manager");
const {cmd} = require("../../helper/constant");
const {whereAmI} = require("./commandManager/mod.manager");
const chatHandler = async (bot, user, message, whisper = false) => {
    const prefix = settings.prefix;
    const permission = await bot.player.permissions.get(user.id);
    const isModerator = permission.moderator || false;

    let command = message.startsWith(prefix) ? message.slice(prefix.length).split(' ')[0] : '';

    switch (command) {
        case cmd.PING:
            await ping(bot);
            break;

        // MOD COMMANDS
        case cmd.WHEREAMI:
            isModerator? await whereAmI(bot, user): (() => {})();
            break;
    }
    console.log(isModerator);
    console.log(`[CHAT]: ${user.username}:${user.id} - ${message}`);

}
module.exports = {
    chatHandler
}