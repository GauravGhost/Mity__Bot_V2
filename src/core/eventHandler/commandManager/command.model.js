const {ping, emote, gita} = require("./general.manager");
const {isMod, isOwner} = require("../../../helper/utils");
const {cmd} = require("../../../helper/constant");
const {say, sendMessageToUser, getOutfit, changeOutfit, whereAmI, getInventory, here} = require("./mod.manager");
const {wallet, buy} = require("./wallet.manager");
const {tip} = require("./tip.manager");


class PingCommand {
    async execute(bot, user) {
        if (await isMod(bot, user)) await ping(bot);
    }
}

class EmoteCommand {
    async execute(bot, user, message) {
        await emote(bot, user, message);
    }
}

class SayCommand {
    async execute(bot, user, message) {
        if (isOwner(bot, user)) await say(bot, user, message);
    }
}

class SendCommand {
    async execute(bot, user, message) {
        await sendMessageToUser(bot, user, message);
    }
}

class WhereAmICommand {
    async execute(bot, user, message) {
        if (isOwner(bot, user)) await whereAmI(bot, user, message);
    }
}

class InventoryCommand {
    async execute(bot, user, message) {
        if (isOwner(bot, user)) await getInventory(bot, user, message);
    }
}

class OutfitCommand {
    async execute(bot, user, message) {
        await getOutfit(bot, user, message);
    }
}

class ChangeOutfitCommand {
    async execute(bot, user, message) {
        if(isOwner(bot, user)) await changeOutfit(bot, user, message);
    }
}

class GitaCommand {
    async execute(bot, user, message) {
        await gita(bot, user, message);
    }
}

class HereCommand {
    async execute(bot, user, message) {
        if(await isMod(bot, user)) await here(bot, user, message);
    }
}

class WalletCommand {
    async execute(bot, user, message) {
        if(await isMod(bot, user)) await wallet(bot, user, message);
    }
}

class BuyCommand {
    async execute(bot, user, message) {
        if(await isMod(bot, user)) await buy(bot, user, message);
    }
}

class TipCommand {
    async execute(bot, user, message) {
        if(await isMod(bot, user)) await tip(bot, user, message);
    }
}

/**
 * @description Initialize the commands in the given Command Class.
 * @constructor commandInvoker
 * @param {commandInvoker}
 */
class CommandInitializer {
    constructor(command) {
        this.command = command;
    }

    initialiseChatCommand() {
        this.command.registerCommand(cmd.PING, new PingCommand());
        this.command.registerCommand(cmd.EMOTE, new EmoteCommand());
        this.command.registerCommand(cmd.SAY, new SayCommand());
        this.command.registerCommand(cmd.SEND, new SendCommand());
        this.command.registerCommand(cmd.WHEREAMI, new WhereAmICommand());
        this.command.registerCommand(cmd.INVENTORY, new InventoryCommand());
        this.command.registerCommand(cmd.OUTFIT, new OutfitCommand());
        this.command.registerCommand(cmd.CHANGE_OUTFIT, new ChangeOutfitCommand());
        this.command.registerCommand(cmd.GITA, new GitaCommand());
        this.command.registerCommand(cmd.HERE, new HereCommand());
        this.command.registerCommand(cmd.WALLET, new WalletCommand());
        this.command.registerCommand(cmd.BUY, new BuyCommand());
        this.command.registerCommand(cmd.TIP, new TipCommand());
    }

    initializeDirectMessageCommand() {

    }
}

module.exports = {
    CommandInitializer
}
