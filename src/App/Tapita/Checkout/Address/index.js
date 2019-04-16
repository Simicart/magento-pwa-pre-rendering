/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/20/18
 * Time: 2:00 PM
 */
import React from 'react'
import Identify from '../../../../Helper/Identify'
import Panel from '../../../../BaseComponent/Panel'
import CheckoutAddress from '../../../Core/Checkout/CheckoutAddress'
import LoadingImg from "../../../../BaseComponent/Loading/LoadingImg";
import Customer from "../../../../Helper/Customer";
class ShippingAddress extends CheckoutAddress{

    constructor(props) {
        super(props);
        this.idFormAddress = 'shipping-checkout-address'
    }


    handleSaveAddress = (params) => {
        Identify.showLoading();
        let json = {};
        json['s_address'] = params;
        if(params instanceof Object && params.hasOwnProperty('entity_id')){
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'shipping_selected',params.entity_id);
            json['s_address'] = {entity_id : params.entity_id}
        }
        this.CheckoutParent.OrderModel.updateOrder(json)
        Analytics.analyticsTracking(
            {
                mixpanel : true,
                ga : false
            }, 
            {
                action: 'edit_shipping_address',
            }
        )
    };

    checkAddressSelected = id => {
        return id === Identify.ApiDataStorage('shipping_selected');
    }

    renderContent = () => {
        let {data} = this.state || {};
        if(!data && Customer.isLogin()){
            return <LoadingImg/>
        }
        const currentShipping = this.CheckoutParent.getStateOrder('shipping_address') || {};
        data = data && data.hasOwnProperty('addresses') ? data.addresses : [];
        let addressComponent = data.length > 0 ? this.renderListAddress(data) : <Dynamic component={()=>import(/* webpackChunkName: "CheckoutAddressForm"*/'./AddressForm')}
                                                                                               parent={this}
                                                                                               className={`shipping-address-form`}
                                                                                               id={this.idFormAddress}
                                                                                               address={currentShipping}
                                                                                               shipping={true}
                                                                                               CheckoutParent={this.CheckoutParent}/>
        return (
            <div>
                {addressComponent}
                <div className="current-select-address">
                    {currentShipping.firstname && currentShipping.lastname && (
                        <div className="title-address">{Identify.__('Ship To') + ':'}</div>
                    )}
                    {this.renderAddressItem(currentShipping)}
                </div>
            </div>
        )
    }

    render(){
        return(
            <div className="checkout-section" id="shipping-address">
                <Panel title={this.renderSectionTitle('Shipping Address')}
                       expanded={!this.CheckoutParent.address_is_selected}
                       renderContent={this.renderContent()}/>
            </div>
        )
    }
}
export default ShippingAddress;