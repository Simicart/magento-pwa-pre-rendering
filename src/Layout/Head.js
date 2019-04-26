import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
import {SMCONFIGS} from '../../static/config'
const defaultDescription = 'Progress Web App'
const defaultOGURL = SMCONFIGS.merchant_url || ''
const defaultOGImage = SMCONFIGS.logo_url || ''

const Head = props => (
    <NextHead>
        <meta charSet="UTF-8" />
        <title>{props.title || ''}</title>
        <meta
        name="description"
        content={props.description || defaultDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
        <link rel="apple-touch-icon" href="/static/touch-icon.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="manifest" href="/static/manifest.json" />
        <link async rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css" />
        <link rel="stylesheet" href="/static/css/bootstrap.css"/>
        <meta property="og:url" content={props.url || defaultOGURL} />
        <meta property="og:title" content={props.title || ''} />
        <meta
        property="og:description"
        content={props.description || defaultDescription}
        />
        <meta name="twitter:site" content={props.url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>

    </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
