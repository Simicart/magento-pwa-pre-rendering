const express = require('express')
const next = require('next')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
// const handle = app.getRequestHandler()
// const cache = require('memory-cache')
const routes = require('./router')
const server = express()
const fetch = require('isomorphic-unfetch')
const serverCache = require('memory-cache')
const bodyParser = require('body-parser')


const handler = routes.getRequestHandler(app,async ({req, res, route, query}) => {
    let api = req.url;
    if(api.toString().indexOf('simiconnector/rest') > -1){
        let data = await connectApiMagentoServer(api,req.method,req.body)
        return res.json({...data});
    } else if(api === '/favicon.ico'){
        app.serveStatic(req,res, path.resolve('./static/favicon.ico'))
    }
    else if(api === '/simi-sw.js'){
        app.serveStatic(req,res, path.resolve('./build/simi-sw.js'))
    }
    else{
        app.render(req, res, route.page, query)
    }
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
        // server.get('/simi-sw.js',({req, res, route, query})=>{
        //     const filePath = path.resolve('./static/simi-sw.js')
        //     app.serveStatic(req, res, filePath)
        // })

        server.use(handler).listen(8080)
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

async function connectApiMagentoServer(api,method = 'GET',paramsBody = {}){
    try {
         let credentials = {
             cache: 'default',
             mode: 'cors',
             credentials : 'same-origin',
             header : {
                 'Content-Type': 'application/json'
             },
             method,
             body : JSON.stringify(paramsBody)
         };
         if(method === 'GET'){
             credentials['body'] = null
         }
         if(api[0] === '/'){
             api = api.slice(1);
         }
         let fullApi = process.env.MERCHANRT_URL+api
         let data = await (await fetch(fullApi,credentials)).json()
         return data;
    }catch (e) {
        return {error : e}
    }
}