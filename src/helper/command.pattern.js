// class PingCommand {
//     async execute(bot) {
//         await ping(bot);
//     }
// }
//
// class EmoteCommand {
//     async execute(bot, isModerator, user, message) {
//         await emote(bot, isModerator, user, message);
//     }
// }
//
// // Define other command classes similarly for other commands...
// class CommandInvoker {
//     constructor() {
//         this.commands = {};
//     }
//
//     registerCommand(commandName, command) {
//         this.commands[commandName] = command;
//     }
//
//     async executeCommand(commandName, ...args) {
//         const command = this.commands[commandName];
//         if (command) {
//             await command.execute(...args);
//         } else {
//             console.error(`Command '${commandName}' not found.`);
//         }
//     }
// }
