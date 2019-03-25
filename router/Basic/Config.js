const routerTapita = require('../Tapita/Config')

let routerBase = {
    ...routerTapita
}
routerBase.product_detail.page = 'basic/product';
routerBase.product_list.page = 'basic/products'
module.exports = routerBase