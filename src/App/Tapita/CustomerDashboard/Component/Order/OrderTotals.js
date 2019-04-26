import React from 'react';
import Totals from '../../../Checkout/Totals';

class OrderTotals extends Totals {
    render = () => {
        return (
            <div className="checkout-totals item-box order-detail-total">
                {this.renderCustomTotal()}
                {this.renderSubtotal()}
                {this.renderShippingTotal()}
                {this.renderDiscount()}
                {this.rendertax()}
                {this.renderGrandTotal()}
            </div>
        );
    }
}

export default OrderTotals;