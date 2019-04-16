/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 10/26/18
 * Time: 2:41 PM
 */
import React from 'react'
import Base from '../BaseAbstract'
import Radio from "@material-ui/core/Radio";
import Identify from "../../../Helper/Identify";

class MethodAbstract extends Base{
    constructor(props) {
        super(props);
        this.CheckoutParent = this.props.CheckoutParent
    }

    renderPaymentContent = (data) => {
        if (data.content && data.content !== "") {
            return (
                <div className="payment-content">{data.content}</div>
            );
        }
    };

    renderSelected = (data) => {
        return (
            <div className="payment-selected">
                <Radio checked={data.p_method_selected} color="primary"/>
            </div>
        );
    };

    renderSubContent = (data) => {
        if (data.p_method_selected) {
            return (
                <div className="method-sub-content">
                    {this.renderPaymentContent(data)}
                </div>
            );
        }
    };

    renderTitle = (data)=>{
        return(
            <div className="payment-title">{data.title}</div>
        )
    }

    savePaymentMethod = (item) => {
        if (item.p_method_selected === false) {
            Identify.showLoading();
            let params = {};
            params['p_method'] = {method: item.payment_method};
            this.CheckoutParent.requestUpdateOrder(params);
        }

    };

    renderPayment = () => {
        this.paymentData = this.props.payment_item;
        return (
            <div className="payment-method-item" onClick={() => this.savePaymentMethod(this.paymentData)}>
                {this.renderSelected(this.paymentData)}
                <div className="payment-info">
                    {this.renderTitle(this.paymentData)}
                    {this.renderSubContent(this.paymentData)}
                </div>
            </div>
        );
    }
}
export default MethodAbstract