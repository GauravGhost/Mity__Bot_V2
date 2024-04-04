const dotenv = require('dotenv')

dotenv.config();


module.exports = {
    ROOM_ID: process.env.ROOM_ID,
    TOKEN_ID: process.env.TOKEN_ID,
    TOKEN_ID2: process.env.TOKEN_ID2,
    HIGHRISE_BASE_URL: process.env.HIGHRISE_BASE_URL,
    DIRECT_MSG_ID: process.env.DIRECT_MSG_ID,

    settings: {
        prefix: process.env.PREFIX,
        botName: process.env.BOT_NAME,
        ownerName: process.env.OWNER_NAME,
        ownerId: process.env.OWNER_ID,
        botId: process.env.BOT_ID,
        developers: ['Gyanendra Kumar'],

        roomName: process.env.ROOM_NAME,
        coordinates: {
            x: 14.5,
            y: 9,
            z: 5.5,
            facing: 'FrontRight'
        },
        reconnect: 5,
        reactionName: 'wave'
    }
}