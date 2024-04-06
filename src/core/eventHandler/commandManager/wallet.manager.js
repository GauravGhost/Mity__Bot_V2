const {isOwner} = require("../../../helper/utils");
const {ChatError} = require("../../../error/chat.error");

const walletType = {
    bot: "bot_wallet_only",
    owner: "user_wallet_only",
    both: "bot_wallet_priority"
}
const wallet = async (bot, user, message) => {
    const gold = await bot.wallet.get.gold.amount();
    const boost = await bot.wallet.get.boost.amount();
    const voice = await bot.wallet.get.boost.amount();
    const voiceType = await bot.wallet.get.voice.type();

    bot.whisper.send(user.id, `Gold - ${gold} \n Boost - ${boost} \n voice - ${voice} \n voiceType - ${voiceType}`)
    return {gold, boost, voice};
}

const buy = async (bot, user, message) => {
    const msgArr = message.split(' ');
    const len = msgArr.length;
    if (len === 1) throw new ChatError("You need to specify what you want to buy [boost, voice]");
    if (msgArr[1] === 'boost') return await buyBoost(bot, user, message);
    if (msgArr[1] === 'voice') return await buyVoice(bot, user, message);
}

/**
 * @description Buy Boost based on given command
 * @param bot
 * @param user
 * @param {string} message
 * @return {Promise<number>}
 *
 */
const buyBoost = async (bot, user, message) => {
    const commands = message.split(' ');

    // default bot wallet priority
    let buyMethod = walletType.bot;
    let amount = 1;

    if (commands.length >= 3) {
        if (!Number(commands[2])) throw new ChatError('3rd argument must be a number');
        amount = +commands[2];
    }
    if (commands.length === 4) {

        if (!isOwner(bot, user)) {
            throw new ChatError(`Only Owner can execute this command`);
        }

        const walletPriority = commands[3];
        if (walletPriority === 'both') {
            buyMethod = walletType.both;
        } else if (walletPriority === 'user' || walletPriority === 'owner') {
            buyMethod = walletType.owner;
        } else {
            throw new ChatError(`Only [both, owner, user] are accepted`)
        }
    }

    const gold = await bot.wallet.get.gold.amount();
    const minGoldRequired = 200 * amount;
    if (gold < minGoldRequired) {
        throw new ChatError(`You need at least ${minGoldRequired} to buy boost. You gold is ${gold}g`)
    }
    return await bot.wallet.buy.boost(buyMethod, amount);

}

const buyVoice = async (bot, user, message) => {
    const commands = message.split(' ');

    // default bot wallet priority
    let buyMethod = walletType.bot;

    if (commands.length === 3) {
        if (!isOwner(bot, user)) {
            throw new ChatError(`Only Owner can execute this command`);
        }

        const walletPriority = commands[2];
        if (walletPriority === 'both') {
            buyMethod = walletType.both;
        } else if (walletPriority === 'user' || walletPriority === 'owner') {
            buyMethod = walletType.owner;
        } else {
            throw new ChatError(`Only [both, owner, user] are accepted`)
        }
    }
    const gold = await bot.wallet.get.gold.amount();

    if (gold < 200) {
        throw new ChatError(`You need at least 200 to buy boost. You gold is ${gold}g`)
    }
    await bot.wallet.buy.voice(buyMethod);
}


module.exports = {
    wallet,
    buy
}