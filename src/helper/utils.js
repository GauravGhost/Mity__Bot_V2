const emotes = require('../config/json/emotes.json')
module.exports = {
    getRandomEmote: () => {
        return emotes[Math.floor(Math.random() * emotes.length)];
    },

    getEmoteList: () => {
        return emotes.map((emote, index) => {
            const arr = emote.split('-');
            // Remove the first element
            const remaining = arr.slice(1);
            // Join the remaining elements with "-"
            const joined = remaining.join('-');
            // Add numbering at the start
            return (index + 1) + ". " + joined + " \n";
        });
    },

    emoteNameToId: (name) => {
        return emotes.filter(item => item.endsWith(name));
    },


    generatePlayersLength: async (bot) => {
        const players = await bot.room.players.fetch();
        return players.length ? players.length : 0;
    },
}