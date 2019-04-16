/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 10/25/18
 * Time: 11:51 AM
 */
import React from 'react'
import Base from '../BaseAbstract'
import Identify from "../../../Helper/Identify";
import CartModelCollection from "./CartModel";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CustomerHelper from "../../../Helper/Customer";

class CartAbstract extends Base{
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{loaded: false, simiData: null, message: ''}}
        let json = Identify.getMerchantConfig();
        this.cartModelCollection = new CartModelCollection({obj: this});
        this.enable_guest_checkout = json.storeview.checkout.enable_guest_checkout;
    }

    componentDidMount() {
        this.cartModelCollection.getCart();
    }

    processData(data){
        if(data.message){
            this.showErrorMessage(data.message);
        }
        Identify.ApiDataStorage('quoteitems','update', data);
        this.props.updateCart(data)
    }

    showErrorMessage(message){
        let text = "";
        if (message) {
            let errors = message;
            for (let i in errors) {
                let error = errors[i];
                text += error + ' ';
            }
        }

        if(text) Identify.showToastMessage(text);
    }

    handleEditCart = (e, key, deleted = 0) =>{
        let value = e.target.value;
        let txt = true;
        if(deleted === 1 || !value || value === ''){
            value = 0;
        }

        if(deleted === 1){
            txt = false;
            confirmAlert({
                title: '',                        // Title dialog
                message: Identify.__('Are you sure you want to delete this product'),        // Message dialog
                buttons: [
                    {
                        label: Identify.__('Confirm'),
                        onClick: () => this.updateCart(key,0)
                    },
                    {
                        label: Identify.__('Cancel'),
                        // onClick: () => alert('Click No')
                    }
                ]
            });
        }

        if(txt){
            Identify.showLoading();
            this.updateCart(key,value)
        }

    }

    updateCart(key,value){
        Identify.showLoading();
        this.cartModelCollection.updateCart(key,value)
    }

    handleCoupon(coupon_code) {
        Identify.showLoading()
        this.cartModelCollection.updateCoupon(coupon_code);
    }

    handleGoCheckout = (event) => {
        let quoteItemsData = this.props.cart_data || {};
        let forceLogin = false
        if (!CustomerHelper.isLogin()) {
            if (parseInt(this.enable_guest_checkout, 10) === 0)
                forceLogin = true
            else {
                let isVirtualCart = false;
                if (quoteItemsData.quoteitems !== undefined) {
                    isVirtualCart = Identify.isVirtualCart(quoteItemsData.quoteitems);
                }
                if (isVirtualCart)
                    forceLogin = true
            }
        }
        if (forceLogin) {
            let location = {
                pathname: '/customer/account/login',
                pushTo: '/checkout/onepage'
            };
            this.pushLink(location);
        } else {
            this.pushLink('/checkout/onepage');
        }
    }
}
export default CartAbstract