/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/20/18
 * Time: 5:05 PM
 */
import React from 'react'
import CheckoutSection from '../../../Core/Checkout/CheckoutSection'
import Identify from '../../../../Helper/Identify'
import DefaultType from './Method/DefaultType'
import CcType from './Method/CcType'
import Paypal from '../../../Core/Payment/Paypal'
import Panel from '../../../../BaseComponent/Panel'
class Payment extends CheckoutSection{

    renderListPayment = () => {
        const {payment_data} = this.props || [];
        if (!payment_data || payment_data.length === 0) {
            return (
                <li className="payment-item" style={{fontSize:18,textAlign:'center',paddingBottom:10}}>
                    {Identify.__('No payment method available')}
                </li>
            );
        }
        let obj = this;
        return payment_data.map((item,key) => {
            if (parseInt(item.show_type,10) !== 1){
                if(item.payment_method.toUpperCase() === 'PAYPAL_EXPRESS'){
                    return <Paypal key={key} CheckoutParent={obj.CheckoutParent} payment_item={item}/>
                }
                return <DefaultType key={key} CheckoutParent={obj.CheckoutParent} payment_item={item}/>
            }else {
                return <CcType key={key} CheckoutParent={obj.CheckoutParent} payment_item={item}/>
            }
        });
    };

    render = () => {
        return (
            <div className="checkout-section" id="payment-section">
                <Panel expanded={true}
                       title={this.renderSectionTitle('Payment Method')}
                       renderContent={
                           <div className="payment-content">
                               <div className="payment-methods">
                                   {this.renderListPayment()}
                               </div>
                           </div>
                       }/>

            </div>
        );

    }
}
export default Payment