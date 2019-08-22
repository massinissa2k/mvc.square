const webPackProduction = require('./webpack.config/webpack.config.prod.js');
const webPackDevelopment = require('./webpack.config/webpack.config.dev.js');

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        return webPackDevelopment(__dirname, 8080);
    }

    if (argv.mode === 'production') {
        return webPackProduction(__dirname);
    }

    return webPackProduction;
};