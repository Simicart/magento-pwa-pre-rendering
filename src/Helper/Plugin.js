import Identify from './Identify';



class Plugin {

    static  getPluginSku(){
        const simicartPlugins = {
            STORELOCATOR: 'magestore_storelocator_40',
            CUSTOMIZEPAYMENT: 'simi_simicustompayment_40',
            QRBARCODE: 'simi_simibarcode_40',
            GIFTCARD : 'simi_simigiftcard_40',
            SOCIAL_LOGIN : 'simi_fblogin_40',
            PRODUCT_REVIEW: 'simi_simiproductreview_40',
            REWARD_POINT : 'simi_loyalty_40',
            VIDEO : 'simi_simivideo_40',
            INSTANT_PURCHASE : 'simi_instant_purchase_40',
            VOICE_SEARCH : 'simi_searchvoice_40',
            ADDRESS_AUTO_FILL: 'simi_addressautofill_40',
            PAYPAL_EXPRESS: 'simi_paypalexpress_40',
            HIDDEN_ADDRESS: 'checkout_management_40',
            CONTACT_US : 'simi_simicontact_40'
        };
        return simicartPlugins
    }

    static isPluginEnabled(sku) {
        if (!sku)
            return false;
        if (!this.pluginsStatus)
            this.pluginsStatus = {};
        if (typeof this.pluginsStatus[sku] === "undefined") {
            let pluginEnabled = false;
            let simicart_config = Identify.getAppDashboardConfigs();
            if (simicart_config && simicart_config['app-configs'] && simicart_config['app-configs'][0] && simicart_config['app-configs'][0]['site_plugins']) {
                simicart_config['app-configs'][0]['site_plugins'].forEach((plugin) => {
                    if (plugin.sku && (plugin.sku === sku)) {
                        if (plugin['config'] && plugin['config']['enable'] && (parseInt(plugin['config']['enable'], 10) === 1)) {
                            pluginEnabled = true;
                        }
                        return false;
                    }
                });
            }
            this.pluginsStatus[sku] = pluginEnabled;
        }
        return this.pluginsStatus[sku];
    }
    
    static EnableRewardPoint() {
        return this.isPluginEnabled(this.getPluginSku().REWARD_POINT);
    }

    static EnableGiftCard() {
        return this.isPluginEnabled(this.getPluginSku().GIFTCARD)
    }
}

export default Plugin;
