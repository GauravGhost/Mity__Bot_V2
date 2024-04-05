const {settings} = require("../../config/server.config");
const commandInvoker = require('./commandManager/command.invoke');
const {CommandInitializer} = require("./commandManager/command.model");
const {itemFetch} = require("../../helper/utils");
user = {
    id: settings.ownerId,
    username: settings.ownerName
}

const readyHandler = async (bot, session) => {
    console.log(`Bot is now online in ${session.room_info.room_name}.`.cyan);
    bot.move.sit("638b8b3d00000000000000e7", 1);

    // Initialization of Commands
    const commandInitializer = new CommandInitializer(commandInvoker);
    commandInitializer.initialiseChatCommand();

    // To Invoke any event or command from within the application.
    // test(bot);
}

const test = (bot)=> {
    bot.emit('chatCreate', user, "newfit 2");
}

module.exports = {readyHandler}