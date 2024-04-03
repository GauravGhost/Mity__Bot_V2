const {WebApi} = require('highrise.sdk');

const usernameToId = async (username) => {
    try{
        const response = await WebApi.getUsers(username);
        if(response){
            return response.users[0].user_id;
        }
        return undefined;
    } catch(error){
        return undefined;
    }

}

const idToUsername = async (id) => {
    try{
        const response = await WebApi.getUserProfile(id);
        if(response){
            return response.user.username;
        }
        return undefined;
    } catch(error){
        return undefined;
    }

}

module.exports = {
    usernameToId,
    idToUsername
}