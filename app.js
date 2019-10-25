const geoCodeUtil = require('./utils/geoCodeUtil');
const weatherUtil = require('./utils/weatherUtil');
const yargs = require('yargs');

const getWeatherForecast = (error, coordinates) => {
    if (error) {
        console.log(error);
    } else {
        weatherUtil.getWeatherForecastByCoordinates(coordinates);
    }
};

yargs.command({
    command: 'forecast',
    describe: 'use this command to get forecast',
    builder: {
        search: {
            describe: 'use this flag to get forecast at given location',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => {
        let searchData = argv.search;
        geoCodeUtil.getGeoCodeCoordinates(searchData, (error, coordinates) => getWeatherForecast(error, coordinates));
    }
});

yargs.parse();



