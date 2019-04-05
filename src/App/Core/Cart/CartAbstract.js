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
        Identify.ApiDataStorage('quoteitems','update', data);
        this.props.updateCart(data)
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
}
export default CartAbstract