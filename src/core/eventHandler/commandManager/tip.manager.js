const {GoldBars} = require("../../../helper/constant");
const {ChatError} = require("../../../error/chat.error");
const {isMod, isModById, getRandomIndex} = require("../../../helper/utils");
const {settings} = require("../../../config/server.config");

// tip 1 -> tip to random player
// tip @Mity__ <amount>
// tip all <amount>
const tip = async (bot, user, message) => {
    const commands = message.split(' ');
    const len = commands.length;
    if (len === 1) {
        throw new ChatError(`Need At least one parameter`)
    }

    if (len === 2) {
        await tipRandom(bot, user, message);
    }

    if (len === 3) {
        const sendTo = commands[1];
        if (sendTo === 'all') {
            return await tipAll(bot, user, message);
        } else if (sendTo.startsWith('@')) {
            return await tipUser(bot, user, message);
        }
    }
}

const tipRandom = async (bot, user, message) => {
    const commands = message.split(' ');
    const amount = +commands[1];

    if (isNaN(amount)) throw new ChatError('Amount Should be a number');
    const isAmountValid = Object.values(GoldBars).includes(amount);
    if (!isAmountValid) {
        throw new ChatError('Only [1, 5, 10, 50, 100, 500, 1000, 5000, 10000] are allowed')
    }

    const gold = await bot.wallet.get.gold.amount();
    if (amount > gold) {
        throw new ChatError('You dont have enough gold to tip. Balance: ' + gold + 'g');
    }

    const players = await fetchRoomPlayerWithoutMod(bot);
    if (players.length === 0) {
        throw new ChatError(`You must have at least one player to tip excluding mod`);
    }
    const getIndex = getRandomIndex(players.length);
    const playerId = players[getIndex][0].id;
    const playerUsername = players[getIndex][0].username;
    await bot.player.tip(playerId, amount);
    bot.message.send(`${playerUsername} got the ${amount}g tip`);
}

const tipAll = async (bot, user, message) => {
    const commands = message.split(' ');
    const amount = +commands[2];

    if (isNaN(amount)) throw new ChatError('Amount Should be a number');
    const isAmountValid = Object.values(GoldBars).includes(amount);
    if (!isAmountValid) {
        throw new ChatError('Only [1, 5, 10, 50, 100, 500, 1000, 5000, 10000] are allowed')
    }

    const players = await fetchRoomPlayerWithoutMod(bot);
    if (players.length === 0) throw new ChatError(`You must have at least one player to tip excluding mod`);

    const gold = await bot.wallet.get.gold.amount();
    const requiredGold = amount * players.length;
    if (gold < requiredGold) throw new ChatError(`You at least ${requiredGold} gold to tip. Balance: ${gold}g`);

    await Promise.all(
        players.map(async (player) => {
            const playerId = player[0].id;
            await bot.player.tip(playerId, amount)
        })
    );
    bot.message.send(`${players.length} user got the ${amount}g tip`);
}

const tipUser = async (bot, user, message) => {
    const commands = message.split(' ');
    const amount = +commands[2];
    const sendTo = commands[1];
    if (isNaN(amount)) throw new ChatError('Amount Should be a number');
    const isAmountValid = Object.values(GoldBars).includes(amount);
    if (!isAmountValid) {
        throw new ChatError('Only [1, 5, 10, 50, 100, 500, 1000, 5000, 10000] are allowed')
    }
    const userId = await bot.room.players.getId(sendTo.slice(1));

    if (!userId) throw new ChatError(`User with ${sendTo} username is not in this room`)
    await bot.player.tip(userId, amount);
    bot.message.send(`@${sendTo} user got the ${amount}g tip`);
}

const fetchRoomPlayerWithoutMod = async (bot) => {
    const players = await bot.room.players.fetch();
    const len = players.length;
    const excludedUserIds = [settings.botId];

    const isNotModPromises = players.map(async (player) => {
        const isMod = await isModById(bot, player[0].id);
        const isExcluded = excludedUserIds.includes(player[0].id);
        return !isMod && !isExcluded;
    });
    const isNotModResults = await Promise.all(isNotModPromises);
    return players.filter((player, index) => isNotModResults[index]);
}

module.exports = {tip}