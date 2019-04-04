import React from 'react';
import ViewComponent from '../ViewComponent';
import Identify from '../../Helper/Identify';

class Subtotal extends ViewComponent {

    constructor(props){
        super(props);
        let json = Identify.getMerchantConfig();
        this.tax_cart_display_price = parseInt(json.storeview.tax.tax_cart_display_price, 10);
        this.tax_cart_display_subtotal = parseInt(json.storeview.tax.tax_cart_display_subtotal, 10);
        this.tax_cart_display_shipping = parseInt(json.storeview.tax.tax_cart_display_shipping, 10);
        this.tax_cart_display_grandtotal = parseInt(json.storeview.tax.tax_cart_display_grandtotal, 10);
    }

    renderTotalView(data = this.props.data) {
        let subtotal = <div/>;
        if (this.tax_cart_display_subtotal === 1 && data.subtotal_excl_tax) {
            let subtotal_excl_tax = Identify.__('Subtotal') + Identify.__(':');
            subtotal = (<div key={Identify.makeid()} className="subtotal">
                <div>
                    <span className="label">{subtotal_excl_tax}</span>
                    <span className="price" style={{color : this.colorConfig.price_color}}>{Identify.formatPrice(data.subtotal_excl_tax)}</span>
                </div>
            </div>);
        } else if (this.tax_cart_display_subtotal === 2 && data.subtotal_incl_tax) {
            let subtotal_incl_tax = Identify.__('Subtotal') + Identify.__(':');
            subtotal = (<div key={Identify.makeid()} className="subtotal">
                <div>
                    <span className="label">{subtotal_incl_tax}</span>
                    <span className="price" style={{color : this.colorConfig.price_color}}>{Identify.formatPrice(data.subtotal_incl_tax)}</span>
                </div>
            </div>);
        } else if (this.tax_cart_display_subtotal === 3) {
            let subtotal_excl_tax = Identify.__('Subtotal (Excl. Tax)') + Identify.__(':');
            let subtotal_incl_tax = Identify.__('Subtotal (Incl. Tax)') + Identify.__(':');
            subtotal = (<div key={Identify.makeid()} className="subtotal">
                {data.subtotal_excl_tax ?
                <div>
                    <span className="label">{subtotal_excl_tax}</span>
                    <span className="price"
                          style={{color: this.colorConfig.price_color}}>{Identify.formatPrice(data.subtotal_excl_tax)}</span>
                </div> : ''
                }
                {data.subtotal_incl_tax ?
                <div>
                    <span className="label">{subtotal_incl_tax}</span>
                    <span className="price"
                          style={{color: this.colorConfig.price_color}}>{Identify.formatPrice(data.subtotal_incl_tax)}</span>
                </div> : ''
                }
            </div>);
        }
        let shipping = <div/>;
        if (this.tax_cart_display_shipping === 1 && data.shipping_hand_excl_tax) {
            if (data.shipping_hand_excl_tax) {
                let shipping_hand_excl_tax = Identify.__('Shipping') + ` (${Identify.__('Excl. Tax')}):`;
                shipping = (<div key={Identify.makeid()} className="shipping">
                    <div>
                        <span className="label">{shipping_hand_excl_tax}</span>
                        <span
                            className="price" style={{color : this.colorConfig.price_color}}>{Identify.formatPrice(data.shipping_hand_excl_tax)}</span>
                    </div>
                </div>);
            }
        } else if (this.tax_cart_display_shipping === 2 && data.shipping_hand_incl_tax) {
            if (data.shipping_hand_incl_tax) {
                let shipping_hand_incl_tax = Identify.__('Shipping (Incl. Tax)') + Identify.__(':');
                shipping = (<div key={Identify.makeid()} className="shipping">
                    <div>
                        <span className="label">{shipping_hand_incl_tax}</span>
                        <span
                            className="price" style={{color : this.colorConfig.price_color}}>{Identify.formatPrice(data.shipping_hand_incl_tax)}</span>
                    </div>
                </div>);
            }
        } else if (this.tax_cart_display_shipping === 3) {
            let shipping_hand_excl_tax = Identify.__('Shipping (Excl. Tax)') + Identify.__(':');
            let shipping_hand_incl_tax = Identify.__('Shipping (Incl. Tax)') + Identify.__(':');
            shipping = (<div key={Identify.makeid()} className="shipping">
                {data.shipping_hand_excl_tax || data.shipping_hand_excl_tax>=0 ?
                <div>
                    <span className="label">{shipping_hand_excl_tax}</span>
                    <span
                        className="price"
                        style={{color: this.colorConfig.price_color}}>{Identify.formatPrice(data.shipping_hand_excl_tax)}</span>
                </div> : ''
                }
                {data.shipping_hand_incl_tax || data.shipping_hand_incl_tax >=0 ?
                <div>
                    <span className="label">{shipping_hand_incl_tax}</span>
                    <span
                        className="price"
                        style={{color: this.colorConfig.price_color}}>{Identify.formatPrice(data.shipping_hand_incl_tax)}</span>
                </div> : ''
                }
            </div>);
        }
        let discount = <div/>;
        if (data.discount) {
            let discount_label = Identify.__('Discount')+ ':';
            discount = (<div key={Identify.makeid()} className="discount">
                <div>
                    <span className="label">{discount_label}</span>
                    <span className="price" style={{color : this.colorConfig.price_color}}>{Identify.formatPrice(data.discount)}</span>
                </div>
            </div>);
        }
        let tax = <div/>;
        if (data.tax) {
            let tax_label = Identify.__('Tax') + ':';
            tax = (<div key={Identify.makeid()} className="tax">
                <div>
                    <span className="label">{tax_label}</span>
                    <span className="price" style={{color : this.colorConfig.price_color}}>{Identify.formatPrice(data.tax)}</span>
                </div>
            </div>);
        }

        let grand_total = <div/>;
        if (this.tax_cart_display_grandtotal === 1) {
            let grand_total_excl_tax = Identify.__('Grand Total (Excl. Tax)') + Identify.__(':');
            let grand_total_incl_tax = Identify.__('Grand Total (Incl. Tax)') + Identify.__(':');
            grand_total = (<div key={Identify.makeid()} className="grand_total">
                {data.grand_total_excl_tax !== null ?
                <div>
                    <span className="label">{grand_total_excl_tax}</span>
                    <span className="price"
                          style={{color: this.colorConfig.price_color}}>{Identify.formatPrice(data.grand_total_excl_tax)}</span>
                </div> : ''
                }
                {data.grand_total_incl_tax !== null ?
                <div>
                    <span className="label">{grand_total_incl_tax}</span>
                    <span className="price"
                          style={{color: this.colorConfig.price_color}}>{Identify.formatPrice(data.grand_total_incl_tax)}</span>
                </div> : ''
                }
            </div>);
        } else if (data.grand_total_incl_tax) {
            let grand_total_incl_tax = Identify.__('Grand Total') + Identify.__(':');
            grand_total = (<div key={Identify.makeid()} className="grand_total">
                <div>
                    <span className="label">{grand_total_incl_tax}</span>
                    <span className="price" style={{color : this.colorConfig.price_color}}>{Identify.formatPrice(data.grand_total_incl_tax)}</span>
                </div>
            </div>);
        }

        let custom = <div className="custom"/>;
        if (data.custom_rows) {
            let custom_rows = data.custom_rows;
            let rows = [];
            for (let i in custom_rows) {
                let row = custom_rows[i];
                let title = row.title;
                let value = Identify.formatPrice(row.value);
                if(row.hasOwnProperty('value_string') && row.value_string ){
                    value = row.value_string;
                }
                let el = <div key={Identify.makeid()}><span className="label">{title}:</span>
                    <span className="price" style={{color : this.colorConfig.price_color}}>{value}</span></div>;
                rows.push(el);
            }
            custom = <div key={Identify.makeid()} className="custom">{rows}</div>;
        }
        return (
            <div className="cart-total" >
                {custom}
                {subtotal}
                {shipping}
                {discount}
                {tax}
                {grand_total}
            </div>
        );
    }

    render(){
        return this.renderTotalView();
    }
}

export default Subtotal;