const path = require('path')
const withCSS = require('@zeit/next-css')
const autoprefixer = require('autoprefixer')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
let config = {
    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        }
        config.resolve.alias['simiLink'] = path.join(__dirname, 'router/index.js')
        return config
    },
    postcssLoaderOptions: {
        parser: true,
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
        ],
        config: {
            ctx: {
                theme: JSON.stringify(process.env.REACT_APP_THEME)
            }
        }
    },
    cssLoaderOptions : {
        importLoaders : 1
    },
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html'
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html'
        }
    }
    // target: 'serverless'
}
config = withBundleAnalyzer(withCSS(config))
module.exports = config;
