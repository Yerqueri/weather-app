const request = require('request');
const URIs = require('./URI');

const getWeatherForecastByCoordinates = (coordinates) => {
    const weatherURL = `${URIs.BASE_URL_WEATHER}/${URIs.API_KEY}/${coordinates}`;
    const weatherQueryStrings = {
        exclude: 'minutely,hourly,alerts,flags',
        units: 'si'
    };
    request({url: weatherURL, json: true, qs: weatherQueryStrings}, (error, response, body) => {
        if (error) {
            console.log('Failed to connect with weather API');
        } else if (body.error) {
            console.log('Api may be down or you are sending a bad request. Please try again with different parameters');
        } else {
            const {currently:currentData, daily:dailyData} = body;
            console.log(`${dailyData.data[0].summary} It is currently ${currentData.temperature} degrees out. There is a ${currentData.precipProbability*100}% chance of rain.`);
        }
    });
};

module.exports = {
    getWeatherForecastByCoordinates: (coordinates) => getWeatherForecastByCoordinates(coordinates),
};
