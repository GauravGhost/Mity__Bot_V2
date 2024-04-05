const {settings} = require("../../config/server.config");
const commandInvoker = require('./commandManager/command.invoke');


const chatHandler = async (bot, user, message, whisper = false) => {
    console.log(`[CHAT]: ${user.username}:${user.id} - ${message}`);

    // If someone mention Bot in command or Bot sends message, It will be returned from here.
    if (message.includes('@' + settings.botName) || user.id === settings.botId) return;

    // Getting Necessary Details.
    const prefix = settings.prefix;
    let command = message.startsWith(prefix) ? message.slice(prefix.length).split(' ')[0] : '';

    /**
     * @description This will execute all the commands which has been registered from the ready event function.
     * @important Command Invoker is a singleton class -> It will return the same instance wherever it will be called.
     */
    try {
        await commandInvoker.executeCommand(command, bot, user, message);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    chatHandler
}