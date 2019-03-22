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

Router.events.on('routeChangeStart', url => {
    Identify.showLoading()
})
Router.events.on('routeChangeComplete', () => Identify.hideLoading())
Router.events.on('routeChangeError', () => Identify.hideLoading())

export default class MyApp extends App {
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}
        let storeview = null;
        if(Identify.checkMerchantConfig()){
            console.log('cache api')
            storeview = Identify.getMerchantConfig();
        }else{
            console.log('call api')
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
            const storeview = await ApiModel.connect(storeviewAPI,params);
            Identify.initAppSettings(storeview)
            Identify.setMerchantConfig(storeview);
        }
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps , storeview }
    }

    componentDidMount(){
        const {storeview} = this.props;
        Identify.initAppSettings(storeview)
        Identify.setMerchantConfig(storeview)
    }

    render () {
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}