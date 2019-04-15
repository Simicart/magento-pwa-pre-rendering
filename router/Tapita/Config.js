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
    customer_dashboard : {
        name : 'customer_dashboard',
        page : 'Tapita/CustomerDashboard',
        pattern : '/customer'
    },
    customer_order: {
        name: 'my_order',
        page: 'Tapita/MyOrder',
        pattern: '/sales/order/history'
    },
    order_detail: {
        name: 'order_detail',
        page: 'Tapita/OrderDetail',
        pattern: '/sales/order/order-detail/:orderId?'
    },
    profile: {
        name: 'my_account',
        page: 'Tapita/Profile',
        pattern: '/customer/account/edit'
    },
    url_match : {
        name : 'url_match',
        page : 'Tapita/UrlMatch',
        pattern : '/(.*)'
    }
}
module.exports = tapitaRoute