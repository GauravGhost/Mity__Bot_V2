const axios = require('axios');
const {BHAGAVAD_API_KEY, BHAGAVAD_API_HOST} = require("../config/server.config");

const baseUrl = 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters'

const getSummaryByChapter = async (number) =>{
    const options = {
        method: 'GET',
        url: `${baseUrl}/${number}/`,
        headers: {
            'X-RapidAPI-Key': BHAGAVAD_API_KEY,
            'X-RapidAPI-Host': BHAGAVAD_API_HOST
        }
    };
    try{
    const response = await axios.request(options);
    return response.data;
    } catch(error){
        console.log(error.response.data);
    }
}

module.exports ={
    getSummaryByChapter
}