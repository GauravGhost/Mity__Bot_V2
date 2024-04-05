const emotes = require('../config/json/emotes.json')
const {settings} = require("../config/server.config");
module.exports = {
    /**
     * @description Return Random id of emote.
     * @return string
     */
    getRandomEmote: () => {
        return emotes[Math.floor(Math.random() * emotes.length)];
    },

    /**
     * @description Return the Array of emotes with numbering
     * @return string[]
     */
    getEmoteList: () => {
        return emotes.map((emote, index) => {
            const arr = emote.split('-');
            let joined = emote;
            if (arr.length > 0) {
                const remaining = arr.slice(1);
                joined = remaining.join('-');
            }
            return (index + 1) + ". " + joined + " \n";
        });
    },
    /**
     * @description Return true if user is moderator
     * @param bot
     * @param user
     * @return {Promise<Boolean>}
     */
    isMod: async (bot, user) => {
        const permission = await bot.player.permissions.get(user.id);
        return permission.moderator || false;
    },

    /**
     * @description Return true if user is owner of bot
     * @param bot
     * @param user
     * @return {boolean}
     */
    isOwner: (bot, user) => settings.ownerId === user.id,

    /**
     * @description Convert the given emote name to emote id.
     * @param name
     * @return string
     */
    emoteNameToId: (name) => {
        return emotes.filter(item => item.endsWith(name));
    },

    /**
     * @description Return the total number of users in the room.
     * @param bot
     * @return {Promise<number>}
     */
    generatePlayersLength: async (bot) => {
        const players = await bot.room.players.fetch();
        return players.length ? players.length : 0;
    },

    /**
     * Generates a random number between min (inclusive) and max (inclusive).
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {number} A random number between min and max, inclusive.
     */
    randomNumberInRange: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};