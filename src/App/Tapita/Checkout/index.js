/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/20/18
 * Time: 9:02 AM
 */
import React from 'react'
import CheckoutAbstract from '../../Core/Checkout/CheckoutAbstract'
import Identify from '../../../Helper/Identify'
import ObjectHelper from '../../../Helper/ObjectHelper'
import './style.scss'
import SectionAddress from './SectionAddress'
import SectionMethod from './SectionMethod'
import OrderSummary from './OrderSummary'
class CheckoutPage extends CheckoutAbstract{

    state = {
        loaded : false,
        data : null,
        isSameShipping:true,
        step : 1
    }


    callApi(){
        if(this.place_order_paypal){
            this.place_order = true
            let api = 'ppexpressapis/placeOrder';
            this.OrderModel.connect(api,{})
            return
        }
        this.OrderModel.getOrderOnepage()
    }

    componentDidMount(){
        this.callApi()
        let obj = this;
        const $ = window.$;
        $(window).scroll(function () {
            if(obj._mounted && window.innerWidth >=1024){
                let el = $('.col-3-content');
                let scrollTop = $(this).scrollTop()
                if(scrollTop > 95 && el.height() < 768-100){
                    el.addClass('col-fixed')
                }else{
                    el.removeClass('col-fixed')
                }
            }
        })
    }

    processError(data){
        this.place_order = false;
        if(this.place_order_paypal){
            this.replaceLink('/checkout/onepage')
        }
    }

    processData(data){
        if(data.hasOwnProperty('quoteitems')){ // for update cart
            this.props.updateCart(data);
            let location = this.getBrowserHistory().location;
            location.key = Identify.makeid();
            this.replaceLink(location)
            return;
        }
        if(this.place_order){ // for place order
            this.processOrderAfter(data)
            return;
        }
        if(data.hasOwnProperty('message')){
            Identify.showToastMessage(data.message)
        }
        if(Identify.getDataFromStoreage(Identify.SESSION_STOREAGE,'using_new_address')){
            sessionStorage.setItem('new_checkout_address', JSON.stringify(data.order.shipping_address));
        }
        this.setOrderIsSelected(data);
        this.updateOrderData(data);
        this.handleCheckIsSameShipping(data.order)
        this.setState({loaded:true})
    }

    componentWillMount(){
        let params = new URLSearchParams(window.location.search);
        if (params.get('placeOrder') && params.get('placeOrder') === 'paypal') {
            this.place_order_paypal = true;
            return;
        }
        let quoteitems = Identify.ApiDataStorage('quoteitems');
        this.checkCart = quoteitems && quoteitems.hasOwnProperty('cart_total') && quoteitems.cart_total > 0;
        if(!this.checkCart){
            this.replaceLink('/checkout/cart');
            return;
        }
        if(this.checkCart){
            this.props.updateCart(quoteitems)
            this.isVirtualCart = Identify.isVirtualCart(quoteitems.quoteitems);
            return;
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.cart_data.cart_total < 1){
            this.replaceLink('/checkout/cart');
            return false
        }
        return ObjectHelper.shallowCompare(this,nextProps,nextState);
    }

    renderCheckout = () => {
        return (
            <div className="checkout-column">
                <div className="checkout-col-1 col-content">
                    <SectionAddress parent={this}/>
                </div>
                <div className="checkout-col-2 col-content">
                    <SectionMethod/>
                </div>
                <div className="checkout-col-3 col-content">
                    <div className="col-3-content">
                        <OrderSummary parent={this} quoteitems={this.props.cart_data} />
                        {this.renderTerm()}
                        {this.renderBtnPlaceOrder()}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return super.render()
    }

}
export default CheckoutPage