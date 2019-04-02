const tapitaRoute = {
    home : {
        name : 'home',
        page : 'Tapita/Home',
        pattern : '/'
    },
    product_detail : {
        name : 'product_detail',
        page : 'Tapita/Product',
        pattern : '/product/:id?'
    },
    product_list : {
        name : 'product_list',
        page : 'Tapita/Products',
        pattern : '/products'
    },
    cms : {
        name : 'cms',
        page : 'Tapita/Cms',
        pattern : '/cms/:id?'
    },
    cart : {
        name : 'cart',
        page : 'Tapita/Cart',
        pattern : '/checkout/cart'
    },
    checkout : {
        name : 'checkout',
        page : 'Tapita/Checkout',
        pattern : '/checkout/onepage'
    },
    customer_login :{
        name : 'customer_login',
        page : 'Tapita/Login',
        pattern : '/customer/account/login'
    },
    contact :{
        name : 'contact',
        page : 'Tapita/Contact',
        pattern : '/contacts'
    },
    url_match : {
        name : 'url_match',
        page : 'Tapita/UrlMatch',
        pattern : '/(.*)'
    }
}
module.exports = tapitaRoute