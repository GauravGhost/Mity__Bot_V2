class CommandInvoker {
    constructor() {
        this.commands = {};
    }

    registerCommand(commandName, command) {
        this.commands[commandName] = command;
    }

    async executeCommand(commandName, ...args) {
        const command = this.commands[commandName];
        if (command) {
            return await command.execute(...args);
        }
    }
}

module.exports = new CommandInvoker();