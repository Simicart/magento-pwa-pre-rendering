const routes = require('next-routes')
const routerConfig = require('./Tapita/Config')

module.exports = routes()  
.add(routerConfig.home)                         
.add(routerConfig.product_detail)
.add(routerConfig.product_list)
.add(routerConfig.cms)
.add(routerConfig.cart)
.add(routerConfig.checkout)
.add(routerConfig.customer_login)
.add(routerConfig.contact)
.add(routerConfig.customer_dashboard)
.add(routerConfig.customer_order)
.add(routerConfig.customer_address)
.add(routerConfig.customer_edit_address)
.add(routerConfig.customer_downloadable)
.add(routerConfig.customer_newsletter)
.add(routerConfig.order_detail)
.add(routerConfig.profile)
.add(routerConfig.url_match)

