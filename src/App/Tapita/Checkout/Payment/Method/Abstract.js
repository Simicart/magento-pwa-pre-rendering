/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/21/18
 * Time: 8:29 AM
 */
import React from 'react'
import Abstract from '../../../../Abstract'
import Identify from '../../../../../Helper/Identify'
import Radio from '../../../../../BaseComponent/Radio'
import BillingAddress from '../../Billing';
import TermAndCondition from '../TermAndCondition'
class MethodAbstract extends Abstract{
    constructor(props){
        super(props);
        this.CheckoutParent = this.props.parent;
        this.storview_configs = Identify.getMerchantConfig().storeview;
    }

    renderPaymentContent = (data) => {
        if (data.content && data.content !== "") {
            return (
                <div className="payment-content"
                     style={{
                         whiteSpace: 'pre-wrap',
                         paddingTop: 26,
                         paddingBottom: 14,
                         maxHeight: 200,
                         lineHeight:'30px',
                         overflowY: 'auto'
                     }}>{data.content}</div>
            );
        }
    };

    renderSelected = (data) => {
        if(data.p_method_selected){
            this.CheckoutParent.payment_is_selected = true;
        }
        return (
            <div className="payment-selected">
                <Radio checked={data.p_method_selected}/>
            </div>
        );
    };

    renderSubContent = (data) => {
        if (data.p_method_selected) {
            return (
                <div className="method-sub-content">
                    {this.renderTermsConditions()}
                    {this.renderPaymentContent(data)}
                    <div className="billing-address-container">
                        <BillingAddress CheckoutParent={this.CheckoutParent} orderData={this.CheckoutParent.state.data}/>
                    </div>
                </div>
            );
        }
    };

    renderTermsConditions = () => {
        if (this.storview_configs.checkout && this.storview_configs.checkout.checkout_terms_and_conditions) {
            let terms = this.storview_configs.checkout.checkout_terms_and_conditions;
            return (
                <TermAndCondition data_terms={terms}/>
            );
        }else{
            this.CheckoutParent.term_is_selected = true;
            return null
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
            // if (this.props.data.selectedShippingAddress !== null) {
            //     jQuery['b_address'] = this.props.data.selectedShippingAddress;
            // }
            this.CheckoutParent.requestUpdateOrder(params);
        }

    };

    renderPayment = () => {
        let data = this.props.data_payment;
        return (
            <li className="payment-item" onClick={() => this.savePaymentMethod(data)}>
                <div className="payment-info">
                    {this.renderSelected(data)}
                    {this.renderTitle(data)}
                </div>
                {this.renderSubContent(data)}
            </li>
        );
    }
}
export default MethodAbstract