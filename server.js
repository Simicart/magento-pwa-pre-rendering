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
const bodyParser = require('body-parser')



const handler = routes.getRequestHandler(app,({req, res, route, query}) => {
    app.render(req, res, route.page, query)
  })
app.prepare()
    .then(() => {
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());
        server.post('/change-storeview',async (req, res) => {
            console.log(serverCache.keys())
            let data = await changeStoreView(req.body.api)
            serverCache.put('merchant_config',data)
            res.json({...data})
        })
        server.use(handler).listen(3100)
        console.log('Server is running')
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })

async function changeStoreView(api){
    try {
        let data = await (await fetch(api)).json()
        return data
    }catch (e) {
        return {error : e}
    }

}