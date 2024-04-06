const cmd = {
    PING: 'ping',
    TELEPORT: 'teleport',
    SAY: 'say',
    EMOTE: 'emote',
    WHEREAMI: 'whereami',
    SEND: 'send',
    OUTFIT: 'outfit',
    CHANGE_OUTFIT: 'newfit',
    INVENTORY: 'inventory',
    GITA: 'gita',
    HERE: 'here',
    WALLET: 'wallet',
    BUY: 'buy',
    TIP: 'tip',
}

const Facing = {
    FrontRight: 'FrontRight',
    FrontLeft: 'FrontLeft',
    BackRight: 'BackRight',
    BackLeft: 'BackLeft'
}

const GoldBars = {
    BAR_1: 1,
    BAR_5: 5,
    BAR_10: 10,
    BAR_50: 50,
    BAR_100: 100,
    BAR_500: 500,
    BAR_1000: 1000,
    BAR_5000: 5000,
    BAR_10000: 10000,
}

const Reactions = {
    Heart: 'heart',
    Wink: 'wink',
    Thumbs: 'thumbs',
    Wave: 'wave',
    Clap: 'clap',
}
const Priorities = {
    BotWalletOnly: 'bot_wallet_only',
    BotWalletAndUser: 'bot_wallet_priority',
    UserWalletOnly: 'user_wallet_only'
}

const BodyParts = {
    Hair: 'hair',
    Hair_Front: 'hair_front',
    Hair_Back: 'hair_back',
    Eyes: 'eye',
    Eyebrow: 'eyebrow',
    Lips: 'mouth',
    Skin: 'body'
}

const colorsIndexMinAndMax = {
    "hair": {
        min: 0,
        max: 81
    },
    "hair_front": {
        min: 0,
        max: 81
    },
    "hair_back": {
        min: 0,
        max: 81
    },
    "eye": {
        min: 0,
        max: 49
    },
    "eyebrow": {
        min: 0,
        max: 81
    },
    "mouth": {
        min: -1,
        max: 57
    },
    "body": {
        min: 0,
        max: 86
    }
}

module.exports = {
    cmd,
    Priorities,
    Facing,
    GoldBars,
    Reactions,
    colorsIndexMinAndMax,
    BodyParts
}