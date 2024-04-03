
// PING MESSAGE COMMAND - ping
const {getRandomEmote} = require("../../../helper/utils");
const ping = async (bot) => {
    bot.message.send(`I'm Alive`)
}

const emote = async (client) => {
    const players = await client.room.players.fetch();
    const randomEmote = getRandomEmote();

    players.forEach(async (player) => {
        const playerId = player[0].id;
        await client.player.emote(playerId, randomEmote);
    });
}

module.exports = {
    ping,
    emote
}