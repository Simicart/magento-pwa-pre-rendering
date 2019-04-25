const path = require('path')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const autoprefixer = require('autoprefixer')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const withSass = require('@zeit/next-sass')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
let config = {
    distDir : process.env.NODE_ENV !== 'production' ? '.next' : 'build',
    generateBuildId: async () => {
        // For example get the latest git commit hash here
        return 'simipwa';
    },
    webpack: (config,{dev}) => {
        if(!dev){
            config.plugins.push(new SWPrecacheWebpackPlugin({
                cacheId: 'simipwa',
                filepath: 'build/simi-sw.js',
                staticFileGlobs: ['static/**/*'],
                minify: true,
                staticFileGlobsIgnorePatterns: [/\.next\//],
                runtimeCaching: [{
                    handler: 'fastest',
                    urlPattern: /[.](png|jpg|css)/
                },
                {
                    handler: 'networkFirst',
                    urlPattern: /^http.*/
                }],
                stripPrefix: "build/",
                mergeStaticsConfig: true
            }))
        }
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        }
        config.resolve.alias['simiLink'] = path.join(__dirname, 'router/index.js')
        config.plugins.push(
            new FilterWarningsPlugin({
                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
            })
        )
        return config
    },
    postcssLoaderOptions: {
        // parser: true,
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
        importLoaders : 1,
        localIdentName: "[local]___[hash:base64:5]"
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
config = withBundleAnalyzer(withCSS(withSass(withImages(config))))
module.exports = config;
