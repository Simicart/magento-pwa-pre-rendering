/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/20/18
 * Time: 9:54 AM
 */
import React from 'react'
import CheckoutSection from '../../Core/Checkout/CheckoutSection'
import Identify from '../../../Helper/Identify'
import Price from '../../../BaseComponent/Price';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDown from '../../../BaseComponent/Icon/ArrowUp'
import Totals from './Totals'
import {AddressItem} from "../../Core/Address/Item";
import EditIcon from '../../../BaseComponent/Icon/Edit';
import Panel from '../../../BaseComponent/Panel'
const configColor = Identify.getColorConfig()
class OrderSummary extends CheckoutSection{
    constructor(props){
        super(props);
        this.CheckoutParent = this.props.parent;

        let merchantConfig = Identify.getMerchantConfig()
        this.tax_sales_display_price = 2;
        if (merchantConfig.storeview !== undefined && merchantConfig.storeview.tax) {
            this.tax_sales_display_price = parseInt(merchantConfig.storeview.tax.tax_sales_display_price, 10) || 0;
        }
    }

    renderOrderItem = () => {
        this.data = this.props.quoteitems ;
        if (this.data === null || this.data.quoteitems === undefined) {
            return null;
        }
        let totalLabel = Identify.__(' item in cart');
        if (this.data.cart_total > 1) {
            totalLabel = Identify.__(' items in cart');
        }

        let items = this.data.quoteitems.map((item) => {
            let itemsOption = '';
            let optionElement = ''
            if (item.option.length > 0) {
                itemsOption = item.option.map((optionObject) => {
                    return (
                        <div key={Identify.makeid()}>
                            <span className="option-title">{optionObject.option_title}: </span>
                            <span className="option-value">{optionObject.option_value}</span>
                        </div>
                    );
                });

                optionElement = (
                    <div className="item-options">
                        <div className="show-label" onClick={(e) => this.handleToggleOption(e)}>
                            <span>{Identify.__('See details')}</span>
                            <ArrowDropDown className={`arrow-down`}/>
                        </div>
                        <div className="options-selected" style={{display: 'none'}}>
                            {itemsOption}
                        </div>
                    </div>
                );
            }

            return (
                <li key={Identify.makeid()} className="order-item">
                    <div className="item-image" style={{borderColor: configColor.image_border_color}}>
                        <img src={item.image} alt={item.name} width={80} height={80}
                             style={{objectFit: 'scale-down'}}/>
                    </div>
                    <div className="item-info" style={{width:'100%'}}>
                        <label className="item-name">{item.name}</label>
                        <div className="item-qty-price">
                            <span className="qty">{Identify.__("Qty")}: {item.qty}</span>
                            <span className="price"><Price size={18} prices={{price: this.tax_sales_display_price===1?item.row_total:item.row_total_incl_tax}}/></span>
                        </div>
                        {optionElement}
                    </div>
                </li>
            );
        });
        return (
            <div className="order-review-container">
                <div className="order-review item-box">
                    <div className="order-items-header" key={Identify.makeid()} id="order-items-header"
                         onClick={(e) => this.handleToggleItems(e)}>
                        <div className="item-count">
                            <span>{this.data.cart_total + totalLabel} </span>
                            <ArrowDown className={`expand_icon`}/>
                        </div>
                    </div>
                    <ul className="items">
                        {items}
                    </ul>
                </div>
            </div>
        );
    };

    handleToggleItems = (e) => {
        const $ = window.$
        let parent = $(e.currentTarget);
        parent.next('.items').slideToggle('fast');
        $('.item-count .expand_icon').toggleClass('rotate-180')
    };

    handleToggleOption = (e) => {
        const $ = window.$
        let parent = $(e.currentTarget);
        parent.next('.options-selected').slideToggle('fast');
        parent.children('.arrow-down').toggleClass('rotate-180');
    }

    renderBlockTotal = () => {
        return (
            <div className="totals-container">
                <Totals totals={this.CheckoutParent.getStateOrder('total')}/>
            </div>

        );
    };

    renderBlockShippingDetail = () => {
        let isVirtualCart = this.CheckoutParent.isVirtualCart;
        let currentAddress = this.CheckoutParent.getStateOrder('shipping_address');
        if(currentAddress.firstname && !isVirtualCart && this.CheckoutParent.state.isSameShipping){
            return (
                <div className="shipping-address-detail">
                    <div className="current-address item-box">
                        <div className="block-header">
                            <span className="title">{Identify.__('Ship To') + ":"}</span>
                        </div>
                        <AddressItem data={currentAddress}/>
                    </div>
                </div>
            );
        }
    };

    renderBlockShipingMethodBlock = () => {
        let checkoutData = this.props.data;
        let currentCheckoutStep = this.props.step;
        let isVirtualCart = this.CheckoutParent.isVirtualCart;
        let editIcon = currentCheckoutStep === 2 ?
            <span className="edit-icon"
                  onClick={() => this.updateCheckoutStep(1)}>
                <EditIcon color={configColor.icon_color}/>
            </span> : null;
        if (checkoutData && checkoutData.order && !isVirtualCart) {
            let selectedMedthod = checkoutData.order.shipping.filter((item) => {
                return item.s_method_selected;
            })[0] || null;
            if(selectedMedthod){
                return (
                    <div className="shipping-method-detail">
                        <div className="current-method item-box">
                            <div className="header-section">
                                <span className="title">{Identify.__('Shipping Method') + ":"}</span>
                                {editIcon}
                            </div>
                            <div className="method">
                                {selectedMedthod !== null && (
                                    selectedMedthod.s_method_name + " - " + selectedMedthod.s_method_title
                                )}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    };

    renderViewPhone = () => {
        return (
            <div className="order-summary-content" >
                {this.renderOrderItem()}
                {/*{this.renderBlockShippingDetail()}*/}
                {/*{this.renderBlockShipingMethodBlock()}*/}
                {this.renderBlockTotal()}
            </div>
        )
    }

    renderView = ()=>{
        return (
            <div className="order-summary-content">
                {this.renderOrderItem()}
                {this.renderBlockShippingDetail()}
                {this.renderBlockTotal()}
            </div>
        )
    }

    render(){
        let content = this.renderView()
        return (
            <div className="order-summary" id="order-summary">
                <Panel title={this.renderSectionTitle("Order summary",{})}
                       renderContent={content}
                       isToggle={false}
                       expanded={true}
                />
            </div>
        )
    }
}

export default OrderSummary