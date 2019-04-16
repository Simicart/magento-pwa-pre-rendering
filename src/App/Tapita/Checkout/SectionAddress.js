/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 10/26/18
 * Time: 11:12 AM
 */
import React from 'react'
import Base from '../../Core/BaseAbstract'
import BillingAddress from './Billing'
import ShippingAddress from './Address'
import {CheckoutContext} from "../../Core/Checkout/CheckoutAbstract";

class SectionAddress extends Base{

    render(){
        return(
            <CheckoutContext.Consumer>
                {
                    checkout =>
                        <div>
                            <BillingAddress CheckoutParent={checkout} />
                            {!checkout.state.isSameShipping && !checkout.isVirtualCart && (
                                <ShippingAddress CheckoutParent={checkout}/>
                            )}
                        </div>
                }
            </CheckoutContext.Consumer>
        )
    }
}
export default SectionAddress