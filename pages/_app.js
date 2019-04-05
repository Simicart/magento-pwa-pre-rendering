/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/1/19
 * Time: 4:13 PM
 */
import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import Identify from '../src/Helper/Identify'
import Model from '../src/Model'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/Helper/PageContext'
import DeviceDetector from 'node-device-detector'
import {Provider} from 'unstated-x'

Router.events.on('routeChangeStart', url => {
    Identify.showLoading()
})
Router.events.on('routeChangeComplete', () => Identify.hideLoading())
Router.events.on('routeChangeError', () => Identify.hideLoading())

export default class MyApp extends App {

    constructor(props){
        super(props)
        this.pageContext = getPageContext();
    }

    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}
        let storeview = null;
        if(Identify.checkMerchantConfig()){
            console.log('cache storeview api')
            storeview = Identify.getMerchantConfig();
            Identify.initAppSettings(storeview)
            Identify.setMerchantConfig(storeview);
        }else{
            console.log('call storeview api')
            let storeviewAPI = 'storeviews/default';
            let appSettings = Identify.getAppSettings();
            let params = {pwa : 1};
            if (appSettings) {
                if (appSettings.store_id !== null) {
                    storeviewAPI = `storeviews/${appSettings.store_id}`;
                }

                if (appSettings.currency_code !== null) {
                    params['currency'] = appSettings.currency_code
                }
                ;
            }
            const ApiModel = new Model()
            storeview = await ApiModel.connect(storeviewAPI,params);
            Identify.initAppSettings(storeview)
            Identify.setMerchantConfig(storeview);
        }

        let isMobile = true;
        if(Identify.isClient()){
            isMobile = window.innerWidth <= 768
        }else{
            const detector = new DeviceDetector;
            detector.detect(ctx.req.headers['user-agent'])
            isMobile = detector.isMobile()
        }
        Identify.setIsMobile(isMobile)
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps , storeview ,isMobile}
    }

    componentDidMount(){
        const {storeview,isMobile} = this.props;

        Identify.initAppSettings(storeview)
        Identify.setMerchantConfig(storeview)
        Identify.setIsMobile(isMobile)
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render () {
        const { Component, pageProps,storeview } = this.props
        return (
            <Container>
                 {/*Wrap unstate-x*/}
                <Provider>
                    {/* Wrap every page in Jss and Theme providers */}
                    <JssProvider
                        registry={this.pageContext.sheetsRegistry}
                        generateClassName={this.pageContext.generateClassName}
                    >
                        {/* MuiThemeProvider makes the theme available down the React
                            tree thanks to React context. */}
                        <MuiThemeProvider
                            theme={this.pageContext.theme}
                            sheetsManager={this.pageContext.sheetsManager}
                        >
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            {/* Pass pageContext to the _document though the renderPage enhancer
                                to render collected styles on server-side. */}
                            <Component pageContext={this.pageContext} merchant_config={storeview} {...pageProps} />
                        </MuiThemeProvider>
                    </JssProvider>
                </Provider>

            </Container>
        )
    }
}