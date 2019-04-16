/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/23/18
 * Time: 4:11 PM
 */
import React from 'react'
import Identify from '../../../../Helper/Identify'
import CustomerHelper from '../../../../Helper/Customer'
import CheckoutAddress from '../../../Core/Checkout/CheckoutAddress'
import Panel from '../../../../BaseComponent/Panel'
import LoadingImg from '../../../../BaseComponent/Loading/LoadingImg'
import Radio from '@material-ui/core/Radio'
import {Dynamic} from "../../../../BaseComponent/Async";
const configColor = Identify.getColorConfig()
class BillingAddress extends CheckoutAddress{

    constructor(props) {
        super(props);
        this.idFormAddress = 'billing-checkout-address'
    }


    renderButtonUpdateBillingAddress = (newAddress = false) => {
        return (
            <div className="update-billing">
                <div className="btn-billing btn-cancel"
                     onClick={() => this.resetChange()}
                     style={{
                         color: configColor.button_background,
                         background: configColor.button_text_color
                     }}>{Identify.__('Cancel')}</div>
                <div className="btn-billing btn-update"
                     onClick={() => this.updateBillingAddress(newAddress)}
                     style={{
                         color: configColor.button_text_color,
                         background: configColor.button_background
                     }}>{Identify.__('Update')}</div>
            </div>
        );

    };

    handleSaveAddress = params => {
        Identify.showLoading()
        const {isSameShipping} = this.CheckoutParent.state
        let json = {
            b_address : params
        }
        if(params instanceof Object && params.hasOwnProperty('entity_id')){
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'billing_selected',params.entity_id);
            json['b_address'] = {entity_id:params.entity_id}
        }
        if(isSameShipping){
            json['s_address'] = params;
            if(params instanceof Object && params.hasOwnProperty('entity_id')){
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'shipping_selected',params.entity_id);
                json['s_address'] = {entity_id:params.entity_id}
            }
        }
        this.CheckoutParent.requestUpdateOrder(json);
        // Analytics.analyticsTracking(
        //     {
        //         mixpanel : true,
        //         ga : false
        //     },
        //     {
        //         action: 'edit_billing_address',
        //     }
        // )
    }

    checkAddressSelected = id => {
        return id === Identify.ApiDataStorage('billing_selected');
    }

    renderOptionalShipping = () => {
        const {isSameShipping} = this.CheckoutParent.state;
        let isVirtualCart = this.CheckoutParent.isVirtualCart;
        if(!isVirtualCart){
            return(
                <div className="select-same-shipping">
                    <div className="flex" onClick={()=>this.CheckoutParent.handleToggleShipping(true)}>
                        <Radio checked={isSameShipping===true} color="primary"/>
                        <div style={{fontWeight:500}}>{Identify.__('Ship to this address')}</div>
                    </div>
                    <div className="flex" onClick={()=>this.CheckoutParent.handleToggleShipping(false)}>
                        <Radio checked={isSameShipping === false} color="primary"/>
                        <div style={{fontWeight:500}}>{Identify.__('Ship to a different address')}</div>
                    </div>
                </div>
            )
        }
    }

    renderContent = () => {
        if(!this.state.loaded && CustomerHelper.isLogin()){
            return <LoadingImg/>
        }
        let currentBillingAddress = this.CheckoutParent.getStateOrder('billing_address');
        let {data} = this.state
        data = data && data.hasOwnProperty('addresses') ? data.addresses : []
        return(
            <div className="billing-content">
                {CustomerHelper.isLogin() && (
                    <div className="select-billing">
                        {this.renderListAddress(data)}
                    </div>
                )}
                {!CustomerHelper.isLogin() && (
                    <div className="new-billing-address">
                        <Dynamic component={()=>import(/* webpackChunkName: "CheckoutAddressForm"*/'../Address/AddressForm')}
                                       parent={this}
                                       className={`billing-address-form`}
                                       id={this.idFormAddress}
                                       address={currentBillingAddress}
                                       CheckoutParent={this.CheckoutParent}/>
                    </div>
                )}
                <div className="current-select-address">
                    {this.renderAddressItem(currentBillingAddress)}
                </div>
                {this.renderOptionalShipping()}
            </div>
        )
    }

    render(){
        return(
            <div className="checkout-section" id="billing-section">
                <Panel title={this.renderSectionTitle('Billing Address')}
                       expanded={!this.CheckoutParent.billing_is_selected}
                       renderContent={this.renderContent()} />
            </div>
        )
    }
}
export default BillingAddress;