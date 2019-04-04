import React from 'react';
import StoreView from './Storeview';
import Identify from '../../../../Helper/Identify';
import Check from '../../../../BaseComponent/Icon/SingleSelect';
import ListItem from '../../../../BaseComponent/MuiListItem/Text';
import ListItemNested from '../../../../BaseComponent/MuiListItem/Nested';
import Model from '../../../../Model'
const configColor = Identify.getColorConfig()
class Currency extends StoreView {

    constructor(props){
        super(props);
        this.checkCurrency = false;
        this.Model = new Model({obj:this})
    }
    
    renderItem() {
        if (typeof(Storage) !== "undefined") {
            const merchantConfigs = Identify.getMerchantConfig();
            const currencies = merchantConfigs.storeview.base.currencies;
            
            if(currencies.length > 1) {
                this.checkCurrency = true;
                return(
                    <div style={{marginLeft: 15}}>
                        <ListItemNested
                            primarytext={<span className="cms-menu-text">{Identify.__('Currency')}</span>}
                            onClick={(e)=>{
                                this.props.parent.handleShowSubMenu(e,true);
                            }}
                            className={this.props.className}
                        >
                            {this.renderSubItem()}
                        </ListItemNested>
                    </div>
                )
            }
        }
        return null;
    }

    ChangeCurrency(currency){
        if (typeof(Storage) !== "undefined") {
            let appSettings = Identify.getAppSettings();
            if (currency.value !== appSettings.currency_code) {
                Identify.showLoading();
                appSettings.currency_code = currency.value;
                Identify.storeAppSettings(appSettings);
                let api = this.SMCONFIGS.merchant_url + this.SMCONFIGS.api_path +`storeviews/${appSettings.store_id}?currency=${currency.value}`;
                this.Model.connectWithUrl('/change-storeview','POST',{},{api})
            }
        }
    }

    processData(data){
        Identify.setMerchantConfig(data);
        window.location.replace(window.location.origin)
    }

    renderSubItem(){
        if(!this.checkCurrency) return;
        let storesRender = [];
        let merchantConfigs = Identify.getMerchantConfig();
        let currencyList = merchantConfigs.storeview.base.currencies || null;
        let appSettings = Identify.getAppSettings();
        if (currencyList !== null) {
            storesRender = currencyList.map((currency) => {
                let isSelected = currency.value === appSettings.currency_code ? 
                    <Check color={configColor.button_background}/> : 
                    <span className="not-selected" style={{borderColor : configColor.menu_text_color}}/>;
                let currencyItem =<span className="store-item">
                                    <div className="selected">
                                        {isSelected}
                                    </div>
                                    <div className="store-name">
                                        {currency.title}
                                    </div>
                                </span>
                return (
                <div key={Identify.makeid()}
                     style={{marginLeft: 30}}
                     onClick={() => this.ChangeCurrency(currency)}>
                    <ListItem primarytext={currencyItem}
                              className={this.props.className}
                    />
                </div>
                );
            });
            return storesRender;
        }
    }

    render(){
        return this.renderItem()
    }
}
export default Currency;