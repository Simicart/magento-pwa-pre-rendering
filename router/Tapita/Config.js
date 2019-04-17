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
    customer_logout: {
        name: 'customer_logout',
        page: 'Tapita/Logout',
        pattern: '/customer/account/logout' 
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
    customer_address: {
        name: 'address',
        page: 'Tapita/Address',
        pattern: '/customer/address'
    },
    customer_edit_address: {
        name: 'edit_address',
        page: 'Tapita/EditAddress',
        pattern: '/customer/address/edit-address'
    },
    customer_downloadable: {
        name: 'downloadable',
        page: 'Tapita/Downloadable',
        pattern: '/downloadable/customer/products'
    },
    customer_newsletter: {
        name: 'newsletter',
        page: 'Tapita/Newsletter',
        pattern: '/newsletter/manager'
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