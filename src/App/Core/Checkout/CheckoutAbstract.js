/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 10/26/18
 * Time: 9:53 AM
 */
import React from 'react'
import Base from '../BaseAbstract'
import Identify from "../../../Helper/Identify";
import CustomerHelper from "../../../Helper/Customer";
import Model from "./CheckoutModel";
import Loading from "../../../BaseComponent/Loading";
import TermAndCondition from "../../Tapita/Checkout/Payment/TermAndCondition";
import Button from '@material-ui/core/Button'
export const CheckoutContext = React.createContext();
const configColor = Identify.getColorConfig()
class CheckoutAbstract extends Base{

    constructor(props){
        super(props)
        this.merchantConfig = Identify.getMerchantConfig();
        this.checkRedirect(this.merchantConfig);

        this.OrderModel = new Model({obj:this});
        this.payment_is_selected = false;
        this.shipping_is_selected = false;
        this.address_is_selected = false;
        this.billing_is_selected = false;
        this.term_is_selected = false;
        this.place_order = false;
        this.credit_card = false;
        this.isVirtualCart = false;
        this.spendPoint = false;
        this.params = {} // for place order
    }

    callApi(){
        this.OrderModel.getOrderOnepage()
    }

    componentDidMount(){
        this.callApi()
    }

    getStateData = (name) => {
        return this.state[name];
    }

    getStateOrder = (name = null) => {
        const {data} = this.state;
        if(data instanceof Object && data.order instanceof Object){
            if(name){
                return data.order[name];
            }else{
                return data.order
            }
        }
        return data;
    }

    updateOrderData= (data)=>{
        this.setState({data});
    }

    requestUpdateOrder = (params = {})=>{
        if(params.hasOwnProperty('p_method') && params.p_method.hasOwnProperty('cc_type')){
            this.credit_card = params['p_method'];
        }
        if(this.spendPoint){
            this.OrderModel.spendingPoint(params);
            this.spendPoint = false;
            return;
        }
        this.OrderModel.updateOrder(params)
    }

    clearCheckoutSession(){
        sessionStorage.removeItem('billing_address_selected')
        sessionStorage.removeItem('shipping_selected')
        sessionStorage.removeItem('checkout_step')
        Identify.clearQuote()
    }

    processOrderAfter = (data) => {
        let order = data.order;
        let OrderId = order.invoice_number;
        Identify.storeDataToStoreage(Identify.LOCAL_STOREAGE,'lastPwaInvoiceNum',OrderId)
        this.clearCheckoutSession()
        if (order.payment_method === 'paypal_express') { // for paypal
            this.handleLink('/paypalexpress/checkout')
            return true
        } else if (order.url_action) { // for payment webview
            window.location.replace(order.url_action)
            return true
        } else {
            let location = {
                pathname: '/checkout/onepage/success',
                state: {
                    orderId: OrderId
                }
            };
            this.handleLink(location)
        }
    }

    handleCheckIsSameShipping = (order)=>{
        let billing_address = order.billing_address || {};
        let shipping_address = order.shipping_address || {};
        let isSameShipping = true;
        for (let key in billing_address){

            if(key === 'email' || key === 'street' || shipping_address[key] === null){
                continue;
            }

            if(billing_address[key] !== shipping_address[key]){
                isSameShipping = false;
                break;
            }
        }
        if(this.state.isSameShipping !== isSameShipping){
            this.handleToggleShipping(isSameShipping)
        }
    }

    handleToggleShipping = (checked) => {
        this.setState({isSameShipping:checked})
    }

    renderTerm = () => {
        const storview_configs = this.merchantConfig.storeview;
        if (storview_configs.checkout && storview_configs.checkout.checkout_terms_and_conditions) {
            let terms = storview_configs.checkout.checkout_terms_and_conditions;
            return (
                <TermAndCondition data_terms={terms}/>
            );
        }else{
            this.term_is_selected = true;
            return null
        }
    }

    setOrderIsSelected = (data)=>{
        let order = data.order
        if(order.shipping_address && order.shipping_address.hasOwnProperty('firstname') && order.shipping_address.firstname){
            this.address_is_selected = true;
        }
        if(order.billing_address && order.billing_address.hasOwnProperty('firstname') && order.billing_address.firstname){
            this.billing_is_selected = true;
        }
        if(order.shipping instanceof Array){
            for (let i in order.shipping){
                let item = order.shipping[i]
                if(item.s_method_selected){
                    this.shipping_is_selected = true;
                    this.shipping_method = item
                    break;
                }
            }
        }
        if(order.payment instanceof Array){
            for (let i in order.payment){
                let item = order.payment[i]
                if(item.p_method_selected){
                    this.payment_is_selected = true;
                    break;
                }
            }
        }
        if (this.credit_card){
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, this.credit_card['method'], this.credit_card);
        }
    }

    scrollToCheckoutSection = (section) => {
        const $ = window.$;
        if(window.innerWidth < 768){
            Identify.smoothScrollToView($(section))
        }
    }

    placeOrderAction = () => {
        if (!this.billing_is_selected) {
            Identify.showToastMessage(Identify.__('Please choose a billing address'));
            this.scrollToCheckoutSection('#billing-section')
            return;
        }

        if(!this.address_is_selected){
            Identify.showToastMessage(Identify.__('Please choose a shipping address'))
            this.scrollToCheckoutSection('#shipping-address')
            return;
        }

        if(!this.shipping_is_selected){
            Identify.showToastMessage(Identify.__('Please choose a shipping method'));
            this.scrollToCheckoutSection('#shipping-method-section')
            return
        }

        if (!this.payment_is_selected) {
            Identify.showToastMessage(Identify.__('Please choose a payment method'));
            this.scrollToCheckoutSection('#payment-section')
            return;
        }

        //
        if (!this.term_is_selected && !Identify.getDataFromStoreage(Identify.SESSION_STOREAGE,'selected_term')) {
            Identify.showToastMessage(Identify.__('Please agree to all the terms and conditions before placing the order'));
            this.scrollToCheckoutSection('.terms-condition');
            return;
        }

        Identify.showLoading();
        this.place_order = true;
        this.OrderModel.placeOrder(this.params);

        // Analytics.analyticsTracking(
        //     {
        //         mixpanel : true,
        //         ga : true
        //     },
        //     {
        //         action: 'clicked_place_order_button'
        //     }
        // )
    };

    renderBtnPlaceOrder = () => {
        return(
            <div className="btn-place-order">
                <Button fullWidth
                        onClick={()=>this.placeOrderAction()}
                        style={{backgroundColor:configColor.button_background,color:configColor.button_text_color}}
                        variant="text">
                    {Identify.__('PLACE ORDER')}
                </Button>
            </div>
        )
    }

    renderCheckout = ()=>{
        return null;
    }

    renderCheckoutPageTitle(){
        return <h3 className="text-center checkout-page-title">{Identify.__('Checkout')}</h3>
    }

    render(){
        if(!this.state.loaded || !this.state.data){
            return <Loading divStyle={{marginTop:200}}/>
        }
        return(
            <div>
                <CheckoutContext.Provider value={this}>
                    <div className="checkout-wrapper container">
                        {this.renderCheckoutPageTitle()}
                        {this.renderCheckout()}
                    </div>
                </CheckoutContext.Provider>
            </div>
        )
    }

    checkRedirect(merchantConfig) {
        try {
            //Redirect guest to login page
            if (
                parseInt(merchantConfig.storeview.checkout.enable_guest_checkout, 10) ===0 &&
                !CustomerHelper.isLogin()
            ) {
                let location = {
                    pathname: '/customer/account/login',
                    pushTo: '/checkout/onepage'
                };
                this.props.history.push(location);
            }
            //Redirect to mobile site checkout page
            if (window.location.pathname &&
                window.location.pathname !== '' &&
                window.location.pathname !== '/' &&
                merchantConfig.storeview.pwa_configs.pwa_excluded_paths !== '') {
                let exceptionUrls = merchantConfig.storeview.pwa_configs.pwa_excluded_paths.replace(/ /g, '').split(',');
                let pathname = window.location.href
                    .replace(merchantConfig.storeview.pwa_configs.pwa_url + '/', '')
                    .replace('http://localhost:3000/pwa/', '');

                exceptionUrls.every(function (exceptionUrl) {
                    if ((exceptionUrl === 'checkout/onepage')
                        || (exceptionUrl === 'checkout/magento2')
                        || (exceptionUrl && exceptionUrl !== '' && pathname.indexOf(exceptionUrl) >= 0)) {
                        let redirectUrl = merchantConfig.storeview.base.base_url || window.SMCONFIGS.merchant_url;
                        if (redirectUrl) {
                            pathname = (exceptionUrl === 'checkout/magento2') ? 'checkout' : exceptionUrl;
                            let redirectUrl = merchantConfig.storeview.base.base_url || window.SMCONFIGS.merchant_url;
                            if (redirectUrl) {
                                window.location = redirectUrl + pathname;
                                return false;
                            }
                        }
                    }
                    return true;
                });
            }
        } catch(err) {

        }
    }
}
export default CheckoutAbstract