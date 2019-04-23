import React, { Component } from 'react';
import Identify from '../../../../Helper/Identify';
import Abstract from '../../../Core/BaseAbstract';
import Price from '../../../../BaseComponent/Price';

class Totals extends Abstract {
    constructor(props) {
        super(props);
        const configs = Identify.getMerchantConfig();
        this.tax_cart_display_price = parseInt(configs.storeview.tax.tax_cart_display_price,10);
        this.tax_cart_display_subtotal = parseInt(configs.storeview.tax.tax_cart_display_subtotal,10);
        this.tax_cart_display_shipping = parseInt(configs.storeview.tax.tax_cart_display_shipping,10);
        this.tax_cart_display_grandtotal = parseInt(configs.storeview.tax.tax_cart_display_grandtotal,10);
    }

    renderSubtotal = () => {
        let totals = this.props.totals;
        let tax_cart_display_subtotal = this.tax_cart_display_subtotal;

        return (
            <div key={Identify.makeid()} className="item-subtotal">
                {tax_cart_display_subtotal === 1 && totals.subtotal_excl_tax !== undefined && (
                    <div className="checkout-total-item">
                        <span className="total-label"
                              style={{color: this.configColor.content_color}}>{Identify.__('Subtotal') + ':'}</span>
                        <span className="total-price"><Price prices={{price: totals.subtotal_excl_tax}}/></span>
                    </div>
                )}

                {tax_cart_display_subtotal === 2 && totals.subtotal_incl_tax !== undefined && (
                    <div className="checkout-total-item">
                        <span className="total-label"
                              style={{color: this.configColor.content_color}}>{Identify.__('Subtotal') + Identify.__(':')}</span>
                        <span className="total-price"><Price prices={{price: totals.subtotal_incl_tax}}/></span>
                    </div>
                )}

                {tax_cart_display_subtotal === 3 && (
                    <React.Fragment>
                        {totals.subtotal_excl_tax !== undefined && (
                            <div className="checkout-total-item">
                            <span className="total-label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Subtotal (Excl. Tax)') + Identify.__(':')}</span>
                                <span className="total-price"><Price prices={{price: totals.subtotal_excl_tax}}/></span>
                            </div>
                        )}
                        {totals.subtotal_incl_tax !== undefined && (
                            <div className="checkout-total-item">
                            <span className="total-label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Subtotal (Incl. Tax)') + Identify.__(':')}</span>
                                <span className="total-price"><Price prices={{price: totals.subtotal_incl_tax}}/></span>
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    };

    renderCustomTotal = () => {
        let totals = this.props.totals;
        if (totals.custom_rows) {
            let custom_rows = totals.custom_rows;
            let rows = [];
            for (let i in custom_rows) {
                let row = custom_rows[i];
                let title = row.title;
                let value = <Price prices={{price: row.value}}/>;
                if (row.hasOwnProperty('value_string') && row.value_string) {
                    value = row.value_string;
                }
                let el = (
                    <div key={Identify.makeid()} className="checkout-total-item">
                        <span className="total-label">{Identify.__(title)}:</span>
                        <span className="total-price">{value}</span>
                    </div>
                );


                rows.push(el);
            }
            return (
                <div className="item-custom-totals">
                    {rows}
                </div>
            );
        }
    };

    renderShippingTotal = () => {
        let totals = this.props.totals;
        let tax_cart_display_shipping = this.tax_cart_display_shipping;
        return (
            <div key={Identify.makeid()} className="item-shipping-total">
                {tax_cart_display_shipping === 1 && totals.shipping_hand_excl_tax !== undefined && (
                    <div className="checkout-total-item">
                        <span className="total-label"
                              style={{color: this.configColor.content_color}}>{Identify.__('Shipping') + ':'}</span>
                        <span className="total-price"><Price prices={{price: totals.shipping_hand_excl_tax}}/></span>
                    </div>
                )}

                {tax_cart_display_shipping === 2 && totals.shipping_hand_incl_tax !== undefined && (
                    <div className="checkout-total-item">
                        <span className="total-label"
                              style={{color: this.configColor.content_color}}>{Identify.__('Shipping') + Identify.__(':')}</span>
                        <span className="total-price"><Price prices={{price: totals.shipping_hand_incl_tax}}/></span>
                    </div>
                )}

                {tax_cart_display_shipping === 3 && (
                    <React.Fragment>
                        {totals.shipping_hand_excl_tax !== undefined && (
                            <div className="checkout-total-item">
                            <span className="total-label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Shipping (Excl. Tax)') + Identify.__(':')}</span>
                                <span className="total-price"><Price
                                    prices={{price: totals.shipping_hand_excl_tax}}/></span>
                            </div>
                        )}
                        {totals.shipping_hand_incl_tax !== undefined && (
                            <div className="checkout-total-item">
                            <span className="total-label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Shipping (Incl. Tax)') + Identify.__(':')}</span>
                                <span className="total-price"><Price
                                    prices={{price: totals.shipping_hand_incl_tax}}/></span>
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    };

    renderDiscount = () => {
        let totals = this.props.totals;
        let couponCode = '';
        if (totals.coupon_code !== undefined) {
            couponCode = `(${totals.coupon_code})`
        }
        if (totals.discount !== undefined && parseFloat(totals.discount) !== 0) {
            return (
                <div className="checkout-total-item">
                            <span className="total-label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Discount') + couponCode + ':'}</span>
                    <span className="total-price"><Price
                        prices={{price: totals.discount}}/></span>
                </div>
            );
        }
    };

    rendertax = () => {
        let totals = this.props.totals;
        if (totals.tax !== undefined && parseFloat(totals.tax) !== 0) {
            return (
                <div className="checkout-total-item">
                            <span className="total-label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Tax') + ':'}</span>
                    <span className="total-price"><Price
                        prices={{price: totals.tax}}/></span>
                </div>
            );
        }
    };

    renderGrandTotal = () => {
        let totals = this.props.totals;
        let tax_cart_display_grandtotal = this.tax_cart_display_grandtotal;
        return (
            <div key={Identify.makeid()} className="item-grandtotal">

                {tax_cart_display_grandtotal === 0 && totals.grand_total_incl_tax !== undefined
                && parseFloat(totals.grand_total_incl_tax) !== 0 && (

                    <div className="checkout-total-item">
                        <span className="total-label"
                              style={{color: this.configColor.content_color}}>{Identify.__('Grand Total') + ':'}</span>
                        <span className="total-price"><Price prices={{price: totals.grand_total_incl_tax}}/></span>
                    </div>

                )}

                {tax_cart_display_grandtotal === 1 && (
                    <React.Fragment>
                        {totals.grand_total_excl_tax !== undefined && parseFloat(totals.grand_total_excl_tax) !== 0 && (
                            <div className="checkout-total-item">
                            <span className="total-label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Grand Total (Excl. Tax)') + ':'}</span>
                                <span className="total-price"><Price
                                    prices={{price: totals.grand_total_excl_tax}}/></span>
                            </div>
                        )}
                        {totals.grand_total_excl_tax !== undefined && parseFloat(totals.grand_total_excl_tax) !== 0 && (
                            <div className="checkout-total-item">
                            <span className="total-label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Grand Total (Incl. Tax)') + ':'}</span>
                                <span className="total-price"><Price
                                    prices={{price: totals.grand_total_incl_tax}}/></span>
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    };
    
    render() {
        return (
            <div className="checkout-totals item-box">
                {this.renderCustomTotal()}
                {this.renderSubtotal()}
                {this.renderShippingTotal()}
                {this.renderDiscount()}
                {this.rendertax()}
                {this.renderGrandTotal()}
            </div>
        );
    }
}

export default Totals;