const tapitaRoute = {
    home : {
        name : 'home',
        page : 'Tapita1/Home',
        pattern : '/'
    },
    product_detail : {
        name : 'product_detail',
        page : 'Tapita1/Product',
        pattern : '/product/:id?'
    },
    product_list : {
        name : 'product_list',
        page : 'Tapita1/Products',
        pattern : '/products'
    },
    cms : {
        name : 'cms',
        page : 'Tapita1/Cms',
        pattern : '/cms/:id?'
    },
    cart : {
        name : 'cart',
        page : 'Tapita1/Cart',
        pattern : '/checkout/cart'
    },
    checkout : {
        name : 'checkout',
        page : 'Tapita1/Checkout',
        pattern : '/checkout/onepage'
    },
    customer_login :{
        name : 'customer_login',
        page : 'Tapita1/Login',
        pattern : '/customer/account/login'
    },
    contact :{
        name : 'contact',
        page : 'Tapita1/Contact',
        pattern : '/contacts'
    },
    customer_dashboard : {
        name : 'customer_dashboard',
        page : 'Tapita1/CustomerDashboard',
        pattern : '/customer'
    },
    url_match : {
        name : 'url_match',
        page : 'Tapita1/UrlMatch',
        pattern : '/(.*)'
    }
}
module.exports = tapitaRoute