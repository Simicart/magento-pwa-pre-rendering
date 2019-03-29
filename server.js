const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
// const handle = app.getRequestHandler()
// const cache = require('memory-cache')
const routes = require('./router')
const server = express()
const fetch = require('node-fetch')
const serverCache = require('memory-cache')


const handler = routes.getRequestHandler(app,({req, res, route, query}) => {
    app.render(req, res, route.page, query)
  })
app.prepare()
    .then(() => {
        server.get('/storeview/:id?',async (req, res) => {
            console.log(serverCache.keys())
            let data = await getStoreView(req.params.id)
            serverCache.put('merchant_config_test',data.storeview)
            res.json({...data})
        })
        server.use(handler).listen(3100)
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })

async function getStoreView(id = 'default'){
    let data = await (await fetch('https://cody.pwa-commerce.com/simiconnector/rest/v2/storeviews/'+id)).json()
    return data
}