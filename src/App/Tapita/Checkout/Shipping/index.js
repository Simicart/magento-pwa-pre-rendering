/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/20/18
 * Time: 3:56 PM
 */
import React from 'react'
import CheckoutSection from '../../../Core/Checkout/CheckoutSection'
import Identify from '../../../../Helper/Identify';
import Method from './Method'
import Panel from '../../../../BaseComponent/Panel'
class Shipping extends CheckoutSection{

    renderShipingMethod = (data) => {
        let obj = this;
        if (!data || data.length === 0) {
            return <div style={{fontSize:16,textAlign:'center',paddingBottom:10}}>{Identify.__('No shipping method available')}</div>;
        }
        return data.map((item) => {
            if(item.s_method_selected){
                obj.CheckoutParent.shipping_is_selected = true;
            }
            return (
                <Method key={Identify.makeid()} data={item}
                        onClick={() => this.handleSaveShippingMethod(item)}/>
            );
        });
    };

    handleSaveShippingMethod = (item) => {
        Identify.showLoading();
        let params = {};
        params['s_method'] = {method: item.s_method_code};
        this.CheckoutParent.requestUpdateOrder(params);
    };

    render(){
        const {shipping_data} = this.props || [];
        return (
            <div className="checkout-section" id="shipping-method-section">
                <Panel title={this.renderSectionTitle('Shipping Method')}
                       renderContent={
                           <div className="shipping-content">
                               {/*<div id="shipping-methods-loading">*/}
                               {/*<Loading/>*/}
                               {/*</div>*/}
                               <div className="list-shipping">
                                   {this.renderShipingMethod(shipping_data)}
                               </div>
                           </div>
                       }/>

            </div>
        )
    }
}
export default Shipping