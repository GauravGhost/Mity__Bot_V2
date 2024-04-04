// PING MESSAGE COMMAND - ping
const {getRandomEmote, getEmoteList, emoteNameToId} = require("../../../helper/utils");
const {usernameToId} = require("../../../helper/user.helper");
const {getSummaryByChapter} = require("../../../external/bhagwad.gita.api");

const ping = async (bot) => {
    bot.message.send(`I'm Alive`)
}

const emote = async (bot, isModerator, user, message) => {
    const messageArray = message.split(' ');
    console.log(message, messageArray);
    const len = messageArray.length;
    if (len === 1) {
        await emoteToSelf(bot, user.id);
    } else if (len === 2) {
        if (messageArray[1] === 'list') {
            await emoteList(bot, user.id);
        } else if (messageArray[1] === 'all' && isModerator) {
            await emoteToAll(bot);
        } else if (!messageArray[1].startsWith('@')) {
            await customEmoteWithUserId(bot, user.id, messageArray[1]);
        }
    }
    /**
     * @description if message length is 3.
     * @example !emote @Mity__ emote-yes
     */
    else if (len === 3) {
        if (!messageArray[1].startsWith('@')) {
            return;
        }
        const userId = await usernameToId(messageArray[1].slice(1));
        if (!userId) {
            return;
        }
        await customEmoteWithUserId(bot, userId, messageArray[2]);
    }
}

const emoteToAll = async (bot) => {
    const players = await bot.room.players.fetch();
    const randomEmote = getRandomEmote();
    await Promise.all(
        players.map(async (player) => {
            const playerId = player[0].id;
            await bot.player.emote(playerId, randomEmote);
        }));
}


const emoteToSelf = async (bot, id) => {
    const randomEmote = getRandomEmote();
    bot.player.emote(id, randomEmote).catch(e => console.error(e));
}

const customEmoteWithUserId = async (bot, id, message) => {

    const emote = emoteNameToId(message);
    if (emote.length === 0) {
        return;
    }
    bot.player.emote(id, emote[0]).catch(e => console.error(e));
}

const emoteList = async (bot, id) => {
    const emotes = getEmoteList();
    const chunkSize = 15;

    const chunkArray = emotes.reduce((acc, curr, i) => {
        const index = Math.floor(i / chunkSize);
        if (!acc[index]) {
            acc[index] = [];
        }
        acc[index].push(curr);
        return acc;
    }, []);

    // console.log(chunkArray.length);
    // console.log(chunkArray);
    await Promise.all(chunkArray.map(async (chunk) => {
        console.log("list of array ", chunk.join('').length);
        await bot.whisper.send(id, chunk.join(''));
    }));
    // chunkArray.forEach( chunk => bot.whisper.send(id, chunk.join('')));
    // bot.whisper.send(id, chunkArray[1].join(''))
}

const bhagavadHandler = async (bot, user) => {
    const response = await getSummaryByChapter(1);
    await bot.message.send(response.chapter_summary);
}

module.exports = {
    ping,
    emote,
    bhagavadHandler
}