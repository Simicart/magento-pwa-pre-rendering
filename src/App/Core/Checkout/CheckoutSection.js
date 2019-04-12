/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 10/26/18
 * Time: 10:58 AM
 */
import React from 'react'
import Base from '../BaseAbstract'
import Identify from "../../../Helper/Identify";
class CheckoutSection extends Base{
    constructor(props) {
        super(props);
        this.CheckoutParent = this.props.CheckoutParent
        this.order_data = this.props.order_data
    }

    renderSectionTitle = (title) => {
        return <div className="checkout-section-title">{Identify.__(title)}</div>
    }
}
export default CheckoutSection