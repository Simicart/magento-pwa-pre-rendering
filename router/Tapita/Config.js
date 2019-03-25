const tapitaRoute = {
    home : {
        name : 'home',
        page : 'index',
        pattern : '/:url?'
    },
    product_detail : {
        name : 'product_detail',
        page : 'tapita/product',
        pattern : '/product/:id?'
    },
    product_list : {
        name : 'product_list',
        page : 'tapita/products',
        pattern : '/products'
    },
    cms : {
        name : 'cms',
        page : 'tapita/cms',
        pattern : '/cms/:id?'
    },
    cart : {
        name : 'cart',
        page : 'tapita/cart',
        pattern : '/checkout/cart'
    },
    checkout : {
        name : 'checkout',
        page : 'tapita/checkout',
        pattern : '/checkout/onepage'
    },
    contact : {
        name : 'contact',
        page : 'tapita/contact',
        pattern : '/contact'
    }
}
module.exports = tapitaRoute