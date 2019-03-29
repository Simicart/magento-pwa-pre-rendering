const routes = require('next-routes')
const routerConfig = require('./Tapita/Config')

module.exports = routes()  
.add(routerConfig.home)                         
.add(routerConfig.product_detail)
.add(routerConfig.product_list)
.add(routerConfig.cms)
.add(routerConfig.cart)
.add(routerConfig.checkout)
.add(routerConfig.url_match)

