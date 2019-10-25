const request = require('request');
const URIs = require('./URI');

const getGeoCodeCoordinates = (searchData, callBack) => {
    const locationURL = `${URIs.LOCATION_BASE_URL}/${encodeURIComponent(searchData)}.json/`;
    const locationQueryStrings = {
        access_token: URIs.LOCATION_TOKEN,
        limit:1
    };
    request({url: locationURL, json: true, qs: locationQueryStrings}, (error, response, body) => {
        if (error) {
            callBack('unable to connect with location services');
        } else if (body.features.length === 0) {
            callBack('unable to find location for search data');
        } else {
            const {features} = body;
            console.log(features[0].place_name);
            const coordinates = `${features[0].center[1]},${features[0].center[0]}`;
            callBack(null, coordinates);
        }
    });
};

module.exports = {
    getGeoCodeCoordinates: (searchData, callBack) => getGeoCodeCoordinates(searchData, callBack),
};
