import Identify from './Identify'

class CustomerHelper {

    static getCustomerData() {
        if (this.isLogin()) {
            return Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'customer_data');
        }
        return false;
    }

    static isLogin() {
        if (sessionStorage.getItem('email')) {
            return true;
        }
        return false;
        
    }

    static logout() {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('cache_email');
        sessionStorage.removeItem('cache_password');
        sessionStorage.removeItem('customer_data');
        sessionStorage.removeItem('list_address');
        this.showMenuAccount();
        Identify.clearQuote();
    }

    static setLogin(data) {
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('password', data.password);
        sessionStorage.setItem('simi_hash', data.simi_hash);
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'customer_data',data);
        // this.showMenuAccount();
    }

    static showMenuAccount() {
        const $ = window.$;
        $('.menu-top-left-item .customer-account').toggleClass('hidden');
    }

    static isAllowGuestAddReview() {
        if (!this.isLogin()) {
            let merchantConfigs = Identify.getMerchantConfig();
            if (merchantConfigs) {
                let reviewConfig = merchantConfigs.storeview.catalog.review.catalog_review_allow_guest;
                return parseInt(reviewConfig, 10) === 1;
            }
        }
        return true;
    }
}

export default CustomerHelper;
