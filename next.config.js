const path = require('path')
const withCSS = require('@zeit/next-css')
let config = {
    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        }
        config.resolve.alias['simiLink'] = path.join(__dirname, 'router/index.js')
        return config
    },
    exportPathMap: function () {
        return {
            '/': { page: '/' }
        }
    },
    // target: 'serverless'
}
config = withCSS(config)
module.exports = config;
