const {WebApi} = require('highrise.sdk')
const {DIRECT_MSG_ID} = require("../../config/server.config");
const CatchAsync = require('../../helper/catchAsync');

const messageHandler = async (bot, user_id, data, message) => {

    console.log("logged in direct message detected!", user_id);
    const response = await WebApi.getUserProfile(user_id);
    console.log("data", data);

    const username = response.user.username;
    const messages = await bot.inbox.messages.get(data.id);
    const userMessages = messages.filter((message) => message.sender_id === user_id);
    message = userMessages[0].content;

    const content = `@${username} \n ${message} `


    await bot.direct.send(data.id, "Thank You for your message!");
    await bot.direct.send(DIRECT_MSG_ID, content);
    console.log(`[DIRECT MESSAGE]: ${user_id}:${data.id} - ${message}`);
}
module.exports = {
    messageHandler
}