const readyHandler = async (session) => {
    console.log(`Bot is now online in ${session.room_info.room_name}.`.cyan);
}

module.exports = {readyHandler}