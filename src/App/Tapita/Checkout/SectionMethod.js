/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 10/26/18
 * Time: 1:53 PM
 */
import React from 'react'
import {CheckoutContext} from "../../Core/Checkout/CheckoutAbstract";
import Shipping from './Shipping'
import Payment from './Payment'
import CouponCode from './CouponCode'
// import {layout} from "../../../Observer/layout";

class SectionMethod extends React.Component{
    render() {
        return (
            <CheckoutContext.Consumer>
                {
                    checkout =>
                        <div>
                            <Shipping CheckoutParent={checkout} shipping_data={checkout.getStateOrder('shipping')}/>
                            <Payment CheckoutParent={checkout} payment_data={checkout.getStateOrder('payment')}/>
                            {/*{layout.tapita_checkout_content.before_render_couponcode(checkout)}*/}
                            <CouponCode CheckoutParent={checkout} order_total={checkout.getStateOrder('total')}/>
                            {/*{layout.tapita_checkout_content.after_render_couponcode(checkout)}*/}
                        </div>
                }
            </CheckoutContext.Consumer>
        );
    }
}
export default SectionMethod