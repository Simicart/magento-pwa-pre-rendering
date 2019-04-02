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
        this.setState({simiData: data})
    }
}
export default CartAbstract