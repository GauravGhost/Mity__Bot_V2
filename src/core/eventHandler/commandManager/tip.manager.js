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
            await tipAll(bot, user, message);
        }
    }
    await bot.player.tip(user.id, GoldBars.BAR_5);
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
    await bot.player.tip(players[getIndex].id, amount);
}

const tipAll = async (bot, user, message) => {
    const commands = message.split(' ');
    const amount = +commands[1];

    if (isNaN(amount)) throw new ChatError('Amount Should be a number');
    const isAmountValid = Object.values(GoldBars).includes(amount);
    if (!isAmountValid) {
        throw new ChatError('Only [1, 5, 10, 50, 100, 500, 1000, 5000, 10000] are allowed')
    }

    const players = await fetchRoomPlayerWithoutMod(bot);
    if (players.length) throw new ChatError(`You must have at least one player to tip excluding mod`);

    const gold = await bot.wallet.get.gold.amount();
    const requiredGold = amount * players.length;
    if (gold < requiredGold) throw new ChatError(`You at least ${requiredGold} gold to tip. Balance: ${gold}g`);

    await Promise.all(
        players.map(async (player) => await bot.player.tip(player[0].id, amount))
    );
}

const tipUser = async (bot, user, message) => {
    const commands = message.split(' ');
    const amount = +commands[1];
    const sendTo = commands[2];
    if (isNaN(amount)) throw new ChatError('Amount Should be a number');
    const isAmountValid = Object.values(GoldBars).includes(amount);
    if (!isAmountValid) {
        throw new ChatError('Only [1, 5, 10, 50, 100, 500, 1000, 5000, 10000] are allowed')
    }
    await bot.player.tip(user.id, amount);
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