/* Example in Node.js */
const axios = require('axios');

let response = null;
new Promise(async (resolve, reject) => {
    try {
        // response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/historical', {
        //     headers: {
        //         'X-CMC_PRO_API_KEY': '6a5549b3-8703-4e10-85e7-a8814bf9d587',
        //     },
        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': '6a5549b3-8703-4e10-85e7-a8814bf9d587',
            },
        // response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/historical', {
        //     headers: {
        //         'X-CMC_PRO_API_KEY': '6a5549b3-8703-4e10-85e7-a8814bf9d587',
        //     },
        // response = await axios.get('https://coinmarketcap.com/currencies/bitcoin/historical-data/', {
        //     headers: {
        //         'X-CMC_PRO_API_KEY': '6a5549b3-8703-4e10-85e7-a8814bf9d587',
        //     },
        // response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
        //     headers: {
        //         'X-CMC_PRO_API_KEY': '6a5549b3-8703-4e10-85e7-a8814bf9d587',
        //     },
        // response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        //     headers: {
        //         'X-CMC_PRO_API_KEY': '6a5549b3-8703-4e10-85e7-a8814bf9d587',
        //     },
        });
    } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
    }
    if (response) {
        // success
        const json = response.data.data[0];
        // const json = response.data;
        console.log(json);
        resolve(json);
    }
});