import md5 from 'js-md5';
import * as Constants from './Constants'
import serverCache from 'memory-cache'
import {ColorConfig,Simicart_Api} from '../../static/config'
class Identify {
    static SESSION_STOREAGE = 1;
    static LOCAL_STOREAGE = 2;

    //main functions
    
    static isClient(){
        return typeof window !== 'undefined' && window instanceof Object
    }

    static storeDataToStoreage(type, key, data) {
        if (typeof(Storage) !== "undefined") {
            if (!key)
                return;
            //process data
            let pathConfig = key.split('/');
            let rootConfig = key;
            if (pathConfig.length === 1) {
                rootConfig = pathConfig[0];
            }
            //save to storegae
            data = JSON.stringify(data);
            if (type === this.SESSION_STOREAGE) {
                sessionStorage.setItem(rootConfig, data);
                return;
            }

            if (type === this.LOCAL_STOREAGE) {
                localStorage.setItem(rootConfig, data);
                return;
            }
        }
        console.log('This Browser dont supported storeage');
    }

    static clearQuote() {
        sessionStorage.removeItem('quote_id');
        sessionStorage.removeItem('cart_number');
        sessionStorage.removeItem('quoteitems');
    }

    static getDataFromStoreage(type, key) {
        if (typeof(Storage) !== "undefined") {
            //process data
            let value = "";
            let data = '';
            if (type === this.SESSION_STOREAGE) {
                value = sessionStorage.getItem(key);
            }

            if (type === this.LOCAL_STOREAGE) {
                value = localStorage.getItem(key);
            }

            try {
                data = JSON.parse(value) || null;
            } catch (err) {
                data = value;
            }
            return data
        }
        console.log('This browser does not support local storage');
    }

    static setMerchantConfig(data = null){
        if(this.isClient()){
            this.storeDataToStoreage(this.SESSION_STOREAGE,'merchant_config',data)
        }else{
            serverCache.put(Constants.MERCHANT_DATA_CONFIG,data,1000*60*60)
        }
    }

    static getMerchantConfig() {
        let data = null;
        if(this.isClient()){
            data = this.getDataFromStoreage(this.SESSION_STOREAGE, Constants.MERCHANT_DATA_CONFIG);
        }else{
            data = serverCache.get(Constants.MERCHANT_DATA_CONFIG);
        }
        return data;
    }

    // check storeview server and client
    static checkMerchantConfig(){
        let serverData = serverCache.get(Constants.MERCHANT_DATA_CONFIG) || {};
        let clientData = this.getMerchantConfig() || {}
        if(serverData.hasOwnProperty('storeview') || clientData.hasOwnProperty('storeview')){
            return true;
        }
        return false;
    }

    static storeAppSettings(data) {
        if (typeof(Storage) !== "undefined") {
            this.storeDataToStoreage(this.LOCAL_STOREAGE, Constants.APP_SETTINGS, data)
        }else{
            serverCache.put(Constants.APP_SETTINGS,data)
        }
    }

    static initAppSettings(data){
        let settingsValue = {};
        if (data && data.storeview) {
            settingsValue.store_id = data.storeview.base.store_id;
            settingsValue.group_id = data.storeview.base.group_id;
            settingsValue.currency_code = data.storeview.base.currency_code;
            settingsValue.enabled_notification = true;
            settingsValue.enabled_location = false;
            this.storeAppSettings(settingsValue);
        }
    }

    static getAppSettings(){
        if(this.isClient()){
            return this.getDataFromStoreage(this.LOCAL_STOREAGE,Constants.APP_SETTINGS);
        }else{
            return serverCache.get(Constants.APP_SETTINGS);
        }
    }

    static getAppDashboardConfigs() {
        return Simicart_Api;
    }

    static __(text) {
        let simicart_config = this.getAppDashboardConfigs();
        let config = null;
        if (simicart_config !== null) {
            config = simicart_config['app-configs'][0] || null;
        }
        let merchant_config = this.getMerchantConfig();
        try {
            let languageCode = merchant_config.storeview.base.locale_identifier;
            if (config.language.hasOwnProperty(languageCode)) {
                let language = config.language;
                let laguageWithCode = language[languageCode];
                if (laguageWithCode.hasOwnProperty(text)) {
                    return laguageWithCode[text];
                }
            }
        } catch (err) {

        }
        return text;
    }

    static makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return md5(text + Date.now());
    }

    static isRtl() {
        let is_rtl = false;
        let configs = this.getMerchantConfig();
        if (configs !== null) {
            is_rtl = parseInt(configs.storeview.base.is_rtl, 10) === 1;
        }
        return is_rtl;
    }

    //price handling
    
    static formatPrice(price, type = 0) {
        if (typeof(price) !== "number") {
            price = parseFloat(price);
        }
        //let merchant_config = JSON.parse(localStorage.getItem('merchant_config'));
        let merchant_config = this.getMerchantConfig();
        if (merchant_config !== null) {
            let currency_symbol = merchant_config.storeview.base.currency_symbol || merchant_config.storeview.base.currency_code;
            let currency_position = merchant_config.storeview.base.currency_position;
            let decimal_separator = merchant_config.storeview.base.decimal_separator;
            let thousand_separator = merchant_config.storeview.base.thousand_separator;
            let max_number_of_decimals = merchant_config.storeview.base.max_number_of_decimals;
            if (type === 1) {
                return Identify.putThousandsSeparators(price, thousand_separator, decimal_separator, max_number_of_decimals);
            }
            if (currency_position === "before") {
                return currency_symbol + Identify.putThousandsSeparators(price, thousand_separator, decimal_separator, max_number_of_decimals);
            } else {
                return Identify.putThousandsSeparators(price, thousand_separator, decimal_separator, max_number_of_decimals) + currency_symbol;
            }
        }

    }

    static putThousandsSeparators(value, sep, decimal, max_number_of_decimals) {
        if (!max_number_of_decimals) {
            let merchant_config = this.getMerchantConfig();
            max_number_of_decimals = merchant_config.storeview.base.max_number_of_decimals || 2;
        }

        if (sep == null) {
            sep = ',';
        }
        if (decimal == null) {
            decimal = '.';
        }

        value = value.toFixed(max_number_of_decimals);
        // check if it needs formatting
        if (value.toString() === value.toLocaleString()) {
            // split decimals
            var parts = value.toString().split(decimal)
            // format whole numbers
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
            // put them back together
            value = parts[1] ? parts.join(decimal) : parts[0];
        } else {
            value = value.toLocaleString();
        }
        return value;
    }

    //string handling

    static validateEmail(email) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    };

    //validate Password
    static validatePassword = password => {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    }

    static capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static showLoading() {
        const $ = window.$;
        if(!!$){
            $(document).ready(function () {
                $('#app-loading').css({display: 'flex'});
            });
        }
    }

    static hideLoading() {
        const $ = window.$;
        if(!!$){
            $(document).ready(function () {
                $('#app-loading').css({display: 'none'});
                $('#app-loading-more').css({display: 'none'});
            });
        }
    }

    
    static setUrlMatchApi(urlPath = null,type = null,params=null){
        if(!urlPath || !type || !params) return false;
        let url_match = {};
        if(this.isClient()){
            url_match = this.getDataFromStoreage(this.LOCAL_STOREAGE,'url_match') || {}
        }else{
            url_match = serverCache.get('url_match') || {}
        }
        url_match[urlPath] = {type,params};
        if(this.isClient()){
            this.storeDataToStoreage(this.LOCAL_STOREAGE,'url_match',url_match);
        }else{
            serverCache.put('url_match',url_match)
        }
    }

    static getUrlMatchApi(url){
        let data = {}
        if(this.isClient()){
            data = this.getDataFromStoreage(this.LOCAL_STOREAGE,'url_match') || {}
        }else{
            data = serverCache.get('url_match') || {}
        }
        console.log(data)
        if(data.hasOwnProperty(url) && data[url]){
            return data[url]
        }
        return false
    }

    static ApiDataStorage(key='',type='get',data={}){
        let api_data = this.getDataFromStoreage(this.SESSION_STOREAGE,key);
        if(type === 'get'){
            return api_data
        }else if(type === 'update' && data){
            api_data = api_data ? api_data : {};
            api_data = {...api_data,...data}
            this.storeDataToStoreage(this.SESSION_STOREAGE,key,api_data)
        }
    }

    static getColorConfig(){
        return ColorConfig
    }

    static setIsMobile(isMobile = true){
        if (this.isClient()){
            this.storeDataToStoreage(this.SESSION_STOREAGE,'isMobile',isMobile)
        } else {
            serverCache.put('isMobile',isMobile)
        }
    }

    static isMobile(){
        if(this.isClient()){
            return this.getDataFromStoreage(this.SESSION_STOREAGE,'isMobile')
        }else {
            return serverCache.get('isMobile')
        }
    }

    static showToastMessage(message) {
        const $ = window.$
        console.log(message)
        $('#error-message').text(message);
        $('.message-global').show();
        setTimeout(function () {
            $('#error-message').text("");
            $('.message-global').hide();
        }, 4000)
    }

    static showMsgLogin(){
        let msg = this.getDataFromStoreage(Identify.SESSION_STOREAGE,'msg_login')
        if(msg){
            this.showToastMessage(msg)
            sessionStorage.removeItem('msg_login')
        }
    }

    static getColorTranparent (){
        const color = {
            a100: "FF",
            a95: "F2",
            a90: "E6",
            a85: "D9",
            a80: "CC",
            a75: "BF",
            a70: "B3",
            a65: "A6",
            a60: "99",
            a55: "8C",
            a50: "80",
            a45: "73",
            a40: "66",
            a35: "59",
            a30: "4D",
            a25: "40",
            a20: "33",
            a15: "26",
            a10: "1A",
            a5: "0D",
            a0: "00"
        };
        return color
    }

    static connectorVersion(version = '0.1.2') {
        let merchantConfigs = this.getMerchantConfig();
        if (merchantConfigs.storeview.base.hasOwnProperty('connector_version')) {
            return merchantConfigs.storeview.base.connector_version >= version;
        }
        return false;
    }

    static hasVirtualItem = (quoteItems = []) => {
        let hasIt = false
        for (let i in quoteItems) {
            let item = quoteItems[i]
            if(item.is_virtual && parseInt(item.is_virtual, 10) !== 0) {
                hasIt = true
                break
            }
        }
        return hasIt
    }

    static isVirtualCart = (quoteItems = []) => {
        let cartLength = quoteItems.length;
        let virtualItems = quoteItems.filter(item => {
            return item.is_virtual === true || parseInt(item.is_virtual, 10) === 1;
        });
        return cartLength === virtualItems.length;
    }

    static magentoPlatform() {
        let merchantConfig = this.getMerchantConfig();
        let platform = 1;
        if (merchantConfig !== null) {
            if (merchantConfig.storeview.base && merchantConfig.storeview.base.magento_version) {
                platform = parseInt(merchantConfig.storeview.base.magento_version, 10);
            }
        }
        return platform;
    }

    static smoothScrollToView = (querySelector, duration = 350) => {
        const $ = window.$
        if(querySelector && querySelector.offset() instanceof Object){
            let offsetTop = querySelector.offset().top;

            let elementHeight = querySelector.height();
            let windowHeight = $(window).height();
            let offset = offsetTop;

            if (elementHeight < windowHeight) {
                offset = offsetTop - ((windowHeight / 2) - (elementHeight / 2));
            }

            $('html, body').animate({
                scrollTop: offset
            }, duration);
        }

    }
}

export default Identify;
