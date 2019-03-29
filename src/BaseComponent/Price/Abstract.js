/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 5/7/18
 * Time: 4:27 PM
 */
import React from 'react';
import ViewComponent from '../ViewComponent';
import Identify from '../../Helper/Identify';
const style = {
    pirce: {
        color: Identify.getColorConfig().price_color,
    },
    specialPrice: {
        color: Identify.getColorConfig().special_price_color
    }
};
class Abstract extends ViewComponent{
    constructor(props) {
        super(props);
        this.type = this.props.type;
        this.configure = null;
        this.configurePrice = this.props.configure_price ? this.props.configure_price : null;
        this.prices = this.props.prices;
        this.parent = this.props.parent;
        this.config = this.parent.props.config;
        this.tapita = this.props.tapita || 1;
    }

    formatPrice(price, special = true) {
        let merchant_config = Identify.getMerchantConfig();
        let currency_symbol = merchant_config.storeview.base.currency_symbol || merchant_config.storeview.base.currency_code;
        let currency_position = merchant_config.storeview.base.currency_position;
        let decimal_separator = merchant_config.storeview.base.decimal_separator;
        let thousand_separator = merchant_config.storeview.base.thousand_separator;
        let max_number_of_decimals = merchant_config.storeview.base.max_number_of_decimals;
        style.pirce = {...style.pirce,...this.props.stylePrice};
        style.specialPrice = {...style.specialPrice,...this.props.styleSpecialPrice};
        if (currency_position === "before") {
            if (special) {
                return (
                    <span
                        className="price" style={style.pirce}>{currency_symbol + this.putThousandsSeparators(price, thousand_separator, decimal_separator, max_number_of_decimals)}</span>
                );
            } else {
                return (
                    <span
                        className="price old" style={style.specialPrice}>{currency_symbol + this.putThousandsSeparators(price, thousand_separator, decimal_separator, max_number_of_decimals)}</span>
                );

            }

        } else {
            if (special) {
                return (
                    <span
                        className="price" style={style.pirce}>{this.putThousandsSeparators(price, thousand_separator, decimal_separator, max_number_of_decimals) + currency_symbol}</span>
                );
            } else {
                return (
                    <span
                        className="price old" style={style.specialPrice}>{this.putThousandsSeparators(price, thousand_separator, decimal_separator, max_number_of_decimals) + currency_symbol}</span>
                );
            }
        }
    }

    putThousandsSeparators(value, sep, decimal, max_number_of_decimals) {
        if (!max_number_of_decimals) {
            let merchant_config = Identify.getMerchantConfig();
            max_number_of_decimals = merchant_config.storeview.base.max_number_of_decimals||2;
        }

        if (sep == null) {
            sep = ',';
        }
        if (decimal == null) {
            decimal = '.';
        }
        if (!value) {
            value = 0;
        }
        value = parseFloat(value).toFixed(max_number_of_decimals);
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
    };

    renderViewTablet=()=>{
        return <div>Table</div>
    };

    renderView=()=>{
        return <div>Phone</div>
    }

    render(){
        if(this.config === 1 || this.tapita === 1){
            return this.renderViewTablet();
        }
        return this.renderView();
    }
}
export default Abstract;