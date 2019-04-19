import React, { Component } from 'react';
import {AppState} from "../../../../Observer/AppState";
import {SubscribeOne} from 'unstated-x';
import OrderModel from '../../../Core/Order/OrderModel';
import CartModel from '../../../Core/Cart/CartModel';
import PageAbstract from './PageAbstract';
import Identify from '../../../../Helper/Identify';
import ListOrder from '../Component/Order/ListOrder';
import TableOrder from '../Component/Order/TableOrder';

class MyOrder extends PageAbstract {
    constructor(props) {
        super(props);
        this.OrderModel = new OrderModel({ obj: this});
        this.CartModel = new CartModel({ obj: this });
        this.state.isPhone = window.innerWidth < 768;
        this.configs = Identify.getMerchantConfig() || {};
        this.isAllowReOrder = false;
        if (this.configs.storeview !== undefined) {
            let saleConfigs = this.configs.storeview.sales || false;
            if (saleConfigs) {
                this.isAllowReOrder = parseInt(saleConfigs.sales_reorder_allow, 10) === 1;
            }
        }
        this.isQuoteItemRequest = false;
    }

    handleReOrder(orderId) {
        Identify.showLoading();
        this.isReOrderRequest = true;
        this.OrderModel.reOrder(orderId);
    }

    processData(data) {
        if (this.isReOrderRequest) {
            if (data.message !== undefined) {
                Identify.showToastMessage(data.message);
                Identify.showLoading();
                this.isQuoteItemRequest = true;
                this.isReOrderRequest = false;
                this.CartModel.getCart();
            } 
        } else if (this.isQuoteItemRequest) {
            this.isQuoteItemRequest = false;
            this.props.updateCart(data);
        }
    }
    
    renderContentPage(useForDashboard = false) {
        if (this.state.isPhone) {
            return <ListOrder parent={this} useForDashboard={useForDashboard} />
        }

        return <TableOrder parent={this} useForDashboard={useForDashboard} />
    }

    render() {
        if(this.props.hasOwnProperty('page') && this.props.page === 'dashboard') {
            return this.renderSection({
                class: 'section-order',
                title: this.renderSectionHeader(
                    'Recent Order',
                    <div 
                        className="section-link"
                        style={{color: this.configColor.button_background}}
                        onClick={(e) => this.pushLink('/sales/order/history')}
                    >
                        {Identify.__('View all >>')}
                    </div>
                ),
                content: this.renderContentPage(true)
            })
        }
        return (
            <div className="order-history-page">
                {this.renderPageTitle('My Orders')}
                <div className="page-content">
                    {
                        this.renderSection({
                            class: 'section-order-history',
                            title: null,
                            content: this.renderContentPage()
                        })
                    }
                </div>
            </div>
        );
    }
}

const Order = props => (
    <SubscribeOne to={AppState} bind={['order_history']}>
        {app => <MyOrder order_history={app.state.order_history}
                         updateOrder={(data)=>app.updateOrderHistory(data)}
                         updateCart={(data)=>app.updateCart(data)}
                         {...props}/>}
    </SubscribeOne>
)
export default Order;

