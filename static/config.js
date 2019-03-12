/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 4:02 PM
 */
var SMCONFIGS = {
    merchant_url: "https://cody.pwa-commerce.com/",
    api_path: "simiconnector/rest/v2/",
    simicart_url: "https://www.simicart.com/appdashboard/rest/app_configs/",
    simicart_authorization: "f95d84b5S2IHxHQxbl3HWg3kGQaw9zQpJVDSZOX",
    notification_api: "simipwa/index/",
    zopim_key: "3WlAvERBApxnMZGdc40no5lmvt1mJCQ8",
    zopim_language: "en",
    base_name: "",
    show_social_login: {
        facebook: 1,
        google: 1,
        twitter: 1
    },
    logo_url: "https://theme.zdassets.com/theme_assets/835315/46b5860567f3d9e07649c775676d979ab45b5b85.png"
};

var Firebase = {
    apiKey: "AIzaSyCjfseb2whMjvZ6aa3s5zear4fbwWqzf_o",
    authDomain: "pwajs-3b426.firebaseapp.com",
    databaseURL: "https://pwajs-3b426.firebaseio.com",
    projectId: "pwajs-3b426",
    storageBucket: "pwajs-3b426.appspot.com",
    messagingSenderId: "832571969235"
};

var DEFAULT_COLORS = {
    key_color: '#ffffff',
    top_menu_icon_color: '#616161',
    button_background: '#5580ff',
    button_text_color: '#ffffff',
    menu_background: '#1b1b1b',
    menu_text_color: '#ffffff',
    menu_line_color: '#292929',
    menu_icon_color: '#ffffff',
    search_box_background: '#f3f3f3',
    search_text_color: '#7f7f7f',
    app_background: '#ffffff',
    content_color: '#131313',
    image_border_color: '#f5f5f5',
    line_color: '#e8e8e8',
    price_color: '#ff2d00',
    special_price_color: '#ab1e00',
    icon_color: '#717171',
    section_color: '#f8f8f9',
    status_bar_background: '#000000',
    status_bar_text: '#000000',
    loading_color: '#000000',
};
module.exports = {SMCONFIGS,DEFAULT_COLORS}