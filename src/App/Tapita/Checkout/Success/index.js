/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/24/18
 * Time: 1:45 PM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import OrderModel from '../../../Core/Checkout/CheckoutModel'
import Identify from '../../../../Helper/Identify'
import {SubscribeOne} from "unstated-x";
import {AppState} from "../../../../Observer/AppState";
// import Analytics from '../../../../Helper/Analytics'
class CheckoutSuccess  extends Abstract{
    constructor(props) {
        super(props);
        this.modelCollection = new OrderModel({obj: this});
        let orderId = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'order_success_id');
        if(!orderId && localStorage.lastPwaInvoiceNum) {
            orderId = localStorage.lastPwaInvoiceNum;
        }
        this.orderId = orderId || '';
        // } else if (localStorage.lastPwaInvoiceNum) {
        //     this.orderId = localStorage.lastPwaInvoiceNum;

        // else {
        //     if (window.location.search) {
        //         let q = window.location.search;
        //         if (q) {
        //             let query = new URLSearchParams(q);
        //             this.orderId = query.get('orderId')?query.get('orderId'):false;
        //         }
        //     }
        // }
    }

    renderCheckoutMessage = () => {
        return (
            <div className="checkout-message">
                <div className="row">
                    <div className='col-sm-12'>
                        <h1 className="heading">{Identify.__('Thank you for your purchase')}</h1>
                        <div className="sub-content">
                            <p className="order-number content-message"
                               onClick={()=>this.pushLink('/sales/order/order-detail/'+this.orderId)}>
                                {Identify.__('Your order number is')}: <span style={{color: this.configColor.button_background}}>#{this.orderId}</span>
                            </p>
                            <p className="order-message content-message">{Identify.__("We'll email you an order confirmation with details and tracking info")}</p>
                            <div onClick={()=>this.pushLink('/')} style={{
                                color: this.configColor.button_text_color,
                                background: this.configColor.button_background,
                                padding : '10px 20px',
                                marginTop : 5,
                                borderRadius: 5,
                                textAlign:'center'
                            }}
                                  className={"btn-action"}>{Identify.__('Continue Shopping')}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    renderAccountInfo = () => {
        return (
            <div className="account-info" style={{paddingTop: 15}}>
                <div className="row">
                    <div className='col-sm-12'>
                        <div className="sub-content">
                            <p className="account-message content-message">{Identify.__('You can track your order status by creating an account.')}
                            </p>
                            <p className="account-email content-message">{Identify.__("Email Address")}: <span>{this.email}</span>
                            </p>
                            <div onClick={()=>this.pushLink('/customer/account/create')} className={"btn-action btn-checkout-page"}
                                  style={{
                                      color: this.configColor.button_text_color,
                                      background: this.configColor.button_background,
                                      padding : '10px 20px',
                                      marginTop : 5,
                                      textAlign:'center'
                                  }}>{Identify.__('Create an Account')}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    clearCheckoutData = () => {
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'quoteitems', {});
        sessionStorage.removeItem('list_address');
        sessionStorage.removeItem('billing_selected')
        sessionStorage.removeItem('shipping_selected')
        sessionStorage.removeItem('order_success_id')
        this.props.updateCart(null)
    }

    componentDidMount(){
        this.clearCheckoutData()
        this.modelCollection.getOrderCollection()
        // Analytics.analyticsTracking(
        //     {
        //         mixpanel : true,
        //         ga : true
        //     }, 
        //     {
        //         action: 'opened_thankyou_page',
        //     }
        // )
    }

    processData(data){
        this.props.updateOrder(data);
    }

    render = () => {
        // this.orderId = '';
        this.email = '';
        if (this.props.location && this.props.location.state !== undefined) {
            // this.orderId = this.props.location.state.orderId || '';
            this.email = this.props.location.state.email || '';
        }

        return (
            <div className="checkout-success-container container">
                {this.renderCheckoutMessage()}
                {this.email !== '' && (
                    this.renderAccountInfo()
                )}
            </div>
        );

    }
}
const Success = props => (
    <SubscribeOne to={AppState} bind={[]}>
        {app => <CheckoutSuccess updateOrder={(data)=>app.updateOrderHistory(data)}
                              updateCart={(data)=>app.updateCart(data)}
                              {...props}/>}
    </SubscribeOne>
)
export default Success