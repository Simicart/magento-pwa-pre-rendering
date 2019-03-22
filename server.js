const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
// const handle = app.getRequestHandler()
// const cache = require('memory-cache')
const routes = require('./router')
const handler = routes.getRequestHandler(app,({req, res, route, query}) => {
    console.log(routes)
    app.render(req, res, route.page, query)
  })
app.prepare()
    .then(() => {
        const server = express()
        
        server.use(handler).listen(3100)
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })