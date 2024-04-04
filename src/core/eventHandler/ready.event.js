const EventEmitter = require('node:events')
const {settings} = require("../../config/server.config");

user = {
    id: settings.ownerId,
    username: settings.ownerName
}

const readyHandler = async (bot, session) => {
    console.log(`Bot is now online in ${session.room_info.room_name}.`.cyan);
    bot.move.sit("638b8b3d00000000000000e7", 1);

    // test(bot);
}


// bot.on("chatCreate", (user, message))
const test = (bot)=> {
    const event = new EventEmitter();
    bot.emit('chatCreate', user, "!newfit");
}

module.exports = {readyHandler}