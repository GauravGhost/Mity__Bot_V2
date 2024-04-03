const leaveHandler = async (bot, user) => {
    console.log(`[PLAYER LEFT]: ${user.username}:${user.id}`);
}
module.exports = {
    leaveHandler
}