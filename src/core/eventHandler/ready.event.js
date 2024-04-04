const readyHandler = async (bot, session) => {
    console.log(`Bot is now online in ${session.room_info.room_name}.`.cyan);
    bot.move.sit("638b8b3d00000000000000e7", 1);
    // AnchorPosition { entity_id: '638b8b3d00000000000000e7', anchor_ix: 1 }

}

module.exports = {readyHandler}