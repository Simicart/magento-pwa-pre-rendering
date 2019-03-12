/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/1/19
 * Time: 4:13 PM
 */
import React from 'react'
import App, { Container } from 'next/app'
import Link from 'next/link'
import Router from 'next/router'
import Identify from '../Helper/Identify'
const linkStyle = {
    margin: '0 10px 0 0'
}

Router.events.on('routeChangeStart', url => {
    Identify.showLoading()
})
Router.events.on('routeChangeComplete', () => Identify.hideLoading())
Router.events.on('routeChangeError', () => Identify.hideLoading())

export default class MyApp extends App {
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
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