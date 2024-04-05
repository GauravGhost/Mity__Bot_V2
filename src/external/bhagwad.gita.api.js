const axios = require('axios');
const {BHAGAVAD_API_KEY, BHAGAVAD_API_HOST} = require("../config/server.config");

const baseUrl = 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters'
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': BHAGAVAD_API_KEY,
        'X-RapidAPI-Host': BHAGAVAD_API_HOST
    }
};
const getSummaryByChapter = async (number) =>{
    options.url  = `${baseUrl}/${number}/`;
    try{
    const response = await axios.request(options);
    return response.data;
    } catch(error){
        console.log(error.response.data);
    }
}

const getVerse = async (chapterNumber, verseNumber) =>{
    options.url = `${baseUrl}/${chapterNumber}/verses/${verseNumber}/`
    try{
        const response = await axios.request(options);
        return response.data;
    } catch(error){
        console.log(error.response.data);
    }
}

module.exports ={
    getSummaryByChapter,
    getVerse
}