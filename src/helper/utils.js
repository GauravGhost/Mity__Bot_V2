const emotes = require('../config/json/emotes.json')
module.exports = {
    getRandomEmote: () => {
        return emotes[Math.floor(Math.random() * emotes.length)];
    },

    generatePlayersLength: async (bot) => {
        const players = await bot.room.players.fetch();
        return players.length ? players.length : 0;
    },
}