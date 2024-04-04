const {usernameToId} = require("../../../helper/user.helper");
const {settings} = require("../../../config/server.config");
const whereAmI = async (bot, user) => {
    const position = await bot.room.players.userMap.get(user.id).position;
    console.log(position)
    const message = `x: ${position.x} \n y: ${position.y}, \n z: ${position.z}, \n facing: ${position.facing}`;
    bot.whisper.send(user.id, message);
}

const walkToCoords = async (bot, user) => {
    // bot.move.sit("fb5a130318c4dabfa0eb8aac", 0).catch(e => console.error(e));
}

const sitOnObject = async (bot, objectId, index) => {
    bot.move.sit(objectId, index);
}

const sendMessageToUser = async (bot, user, message) =>{
    const username = await message.split(' ')[1];

    if(!username){
        return;
    }

    const userId = await usernameToId(username.slice(1));
    console.log("userid", userId);
    if(!userId){
        return;
    }

    const dataId = `1_on_1:${userId}:${settings.botId}`
    await bot.direct.send(dataId, "Say 'dead' if it's working!");
}

const say = async (bot, message) => {

}

const getInventory = async (bot)=> {
    const inventory = await bot.inventory.get();
    console.log(inventory);
}

const getOutfit = async (bot, user)=> {
    const outfit = await bot.player.outfit.get(user.id)
    console.log(outfit);
}

module.exports = {
    whereAmI,
    sitOnObject,
    walkToCoords,
    sendMessageToUser,
    getOutfit,
    getInventory
}