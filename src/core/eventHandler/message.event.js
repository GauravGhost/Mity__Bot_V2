const {WebApi} = require('highrise.sdk')
const messageHandler = async (bot, user_id, data, message) => {
    console.log("logged in direct message detected!", user_id);
    const response = await WebApi.getUserProfile(user_id);
    console.log(response.user.username);

    console.log(`[DIRECT MESSAGE]: ${user_id}:${data.id} - ${message}`);
}
module.exports = {
    messageHandler
}