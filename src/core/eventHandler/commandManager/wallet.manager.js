const {isOwner} = require("../../../helper/utils");
const {ChatError} = require("../../../error/chat.error");

const walletType = {
    bot: "bot_wallet_only",
    owner: "user_wallet_only",
    both: "bot_wallet_priority"
}
const getWallet = async (bot, user, message) => {
    const gold = await bot.wallet.get.gold.amount();
    const boost = await bot.wallet.get.boost.amount();
    const voice = await bot.wallet.get.boost.amount();
    const voiceType = await bot.wallet.get.voice.type();

    bot.whisper.send(user.id, `Gold - ${gold} \n Boost - ${boost} \n voice - ${voice} \n voiceType - ${voiceType}`)
    return {gold, boost, voice};
}

const buyHandler = async (bot, user, message) => {
    const msgArr = message.split(' ');
    const len = msgArr.length;
    if (len === 1) return bot.whisper.send(user.id, "You need to specify what you want to buy [boost, voice]");
    if (len === 2 && len[2] === 'boost') return await buyBoost(bot, user, message.slice(1));
    if (len === 2 && len[2] === 'voice') return await buyVoice(bot, user, message.slice(1));
}

const buyBoost = async (bot, user, message) => {
    let buyMethod = walletType.bot;
    const arr = message.split(' ');

    if (arr.length === 1) {

        buyMethod = walletType.bot;
    } else if (arr.length === 2) {

        if (!isOwner(bot, user)) {
            throw new ChatError(`Only Owner can execute this command`);
        }

        if (arr[1] === 'both') {
            buyMethod = walletType.both;
        } else if (arr[1] === 'user' || arr[1] === 'owner') {
            buyMethod = walletType.owner;
        }
    }
    const gold = await bot.wallet.get.gold.amount();
    if(gold < 200){
        throw new ChatError(`You need at least 200 to buy boost. You gold is ${gold}g`)
    }
    return await bot.wallet.buy.boost(buyMethod, 1);
}

const buyVoice = async (bot, user, message) => {
    const buy = await bot.wallet.buy.voice();
}


module.exports = {getWallet}