const routerTapita = require('../Tapita/Config')

let routerBase = {
    ...routerTapita
}

routerBase.home.page = 'Basic/Home';
routerBase.product_detail.page = 'Basic/Product';
routerBase.product_list.page = 'Basic/Products';
routerBase.url_match.page = 'Basic/UrlMatch';
module.exports = routerBase