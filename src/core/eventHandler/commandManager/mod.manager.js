const whereAmI = async (bot, user) => {
    const position = await bot.room.players.userMap.get(user.id).position;
    console.log(position)
    const message = `x: ${position.x} \n y: ${position.y}, \n z: ${position.z}, \n facing: ${position.facing}`;
    bot.whisper.send(user.id, message);
}

const walkToCoord = async (bot, user) => {
    // bot.move.sit("fb5a130318c4dabfa0eb8aac", 0).catch(e => console.error(e));
}

const sitOnObject = async (bot, objectId, index) => {
    bot.move.sit(objectId, index);
}

module.exports = {
    whereAmI,
    sitOnObject,
    walkToCoord
}

// 5 1 2.5