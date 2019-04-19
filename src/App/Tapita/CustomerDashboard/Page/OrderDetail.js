import React, { Component } from 'react';
import PageAbstract from './PageAbstract';
import Identify from '../../../../Helper/Identify';
import OrderModel from '../../../Core/Order/OrderModel';
import AddressItem from '../Component/Address/AddressItem';
import CartIcon from '../../../../BaseComponent/Icon/Cart';
import ItemOrdered from '../Component/Order/ItemOrdered';
import Loading from '../../../../BaseComponent/Loading';
import OrderTotals from '../Component/Order/OrderTotals';
import { SubscribeOne } from 'unstated-x';
import { AppState } from '../../../../Observer/AppState';
import CartModel from '../../../Core/Cart/CartModel';

class OrderDetail extends PageAbstract {
    constructor(props) {
        super(props);
        this.state = {
            orderData: {},
            isPhone: window.innerWidth < 768,
            loaded: false
        };
        this.OrderModel = new OrderModel({ obj: this});
        this.CartModel = new CartModel({ obj: this});
        this.configs = Identify.getMerchantConfig();
        this.isAllowReOrder = false;
        if (this.configs.storeview !== undefined) {
            let saleConfigs = this.configs.storeview.sales || false;
            if (saleConfigs) {
                this.isAllowReOrder = parseInt(saleConfigs.sales_reorder_allow, 10) === 1;
            }
        }
        this.isQuoteItemRequest = false;
        this.requestReOrder = false;
        this.requestOrderDetail = true;
        this.parent = this.props.parent;
    }

    componentDidMount() {
        const query = this.parent.props.query;
        if (query !== undefined && this.requestOrderDetail) {
            const orderId = query.orderId;
            this.OrderModel.getOrderDetail(orderId);
        }
    }

    processError(data) {
        if (this.requestOrderDetail) {
            this.pushLink('/sales/order/history');
        }
        this.requestReOrder = false;
        this.isQuoteItemRequest = false;
    }

    processData(data) {
        if(this.requestReOrder && data.message !== undefined) {
            Identify.showToastMessage(data.message);
            Identify.showLoading();
            this.isQuoteItemRequest = true;
            this.CartModel.getCart();
            this.requestReOrder = false;
        } else if(this.isQuoteItemRequest) {
            this.isQuoteItemRequest = false;
            this.props.updateCart(data);
        } else if(this.requestOrderDetail) {
            this.requestOrderDetail = false;
            this.setState({ orderData: data.order });
        }

    } 

    getDateFormat = (dateData) => {
        let date = Date.parse(dateData);
        date = new Date(date);
        // if (Identify.detectPlatforms() === 1 || Identify.detectPlatforms() === 3) {
        //     let arr = dateData.split(/[- :]/);
        //     date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        // }
        return date;
    };

    handleReOrder = (orderId) => {
        Identify.showLoading();
        this.requestReOrder = true;
        this.OrderModel.reOrder(orderId);
    }

    renderOrderInfoPhone() {
        const {orderData} = this.state;
        return (
            <div className="section order-info-section">
                {this.renderSectionHeader('Order Information')}
                <div className="section-content">
                    <div className="content-item">
                        <div className="item-title">
                            {Identify.__('Shipping Address')}
                        </div>
                        <div className="item-view">
                            <AddressItem addressData={orderData.shipping_address} canEdit={false}/>
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            {Identify.__('Billing Address')}
                        </div>
                        <div className="item-view">
                            <AddressItem addressData={orderData.billing_address} canEdit={false}/>
                        </div>
                    </div>
                    <div className="content-item" style={{marginTop: 30}}>
                        <div className="item-title">
                            {Identify.__('Shipping Method')}
                        </div>
                        <div className="item-view">
                            {orderData.shipping_method}
                        </div>
                    </div>
                    <div className="content-item" style={{marginTop: 30}}>
                        <div className="item-title">
                            {Identify.__('Payment Method')}
                        </div>
                        <div className="item-view">
                            {orderData.payment_method}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderItemsView() {
        const { orderData } = this.state;
        const items = orderData.order_items;
        return items.map((item) => {
            return <ItemOrdered key={Identify.makeid()} itemData={item}/>
        });
    }

    renderReOrder() {
        const {orderData} = this.state;
        if(this.isAllowReOrder) {
            return (
                <div 
                    onClick={() => this.handleReOrder(orderData.entity_id)}
                    style={{maxWidth: 150}}
                    className="reorder-section"
                >
                     <CartIcon color="#f69435" style={{width: 20}}/>
                     <span>{Identify.__('Reorder')}</span>
                </div> 
            )
        }
    }

    renderOrderItemsOrdered() {
        return (
            <div className="section section-items">
                {this.renderReOrder()}
                {this.renderSectionHeader('Items Ordered')}
                <div className="section-content">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>{Identify.__('Product Name')}</th>

                                {!this.state.isPhone && (
                                    <th>{Identify.__('SKU')}</th>
                                )}
                                <th>{Identify.__('Price')}</th>
                                <th style={{paddingLeft: 12}}>{Identify.__('Qty')}</th>

                                {!this.state.isPhone && (
                                    <th>{Identify.__('Subtotal')}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItemsView()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderOrderTotals() {
        return (
            <div className="section order-totals-section">
                <OrderTotals totals={this.state.orderData.total}/>
            </div>
        )
    }

    renderOrderInfoTablet() {
        const { orderData } = this.state;
        return (
            <div className="section order-info-section">
                {this.renderSectionHeader('Order Information')}
                <div className="section-content">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>{Identify.__('Shipping Address')}</th>
                                <th>{Identify.__('Shipping Method')}</th>
                                <th>{Identify.__('Billing Address')}</th>
                                <th>{Identify.__('Payment Method')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><AddressItem addressData={orderData.shipping_address} canEdit={false}/></td>
                                <td>{orderData.shipping_method}</td>
                                <td><AddressItem addressData={orderData.billing_address} canEdit={false}/></td>
                                <td>{orderData.payment_method}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderOrderInfo() {
        if(this.state.isPhone) {
            return this.renderOrderInfoPhone();
        }
        return this.renderOrderInfoTablet();
    }

    render() {
        const { orderData } = this.state;
        if(!this.state.loaded || !orderData || Object.keys(orderData).length === 0) {
            return <Loading />
        }

        return (
            <div className="order-detail-wrapper">
                <div className="top-header">
                    <span className="page-title">{Identify.__('Order')}</span>
                    <span className="page-title"> # </span>
                    <span className="page-title">{Identify.__(orderData.increment_id)}</span>
                    <div className="top-order-status" style={{color: this.configColor.button_background}}>{Identify.__(orderData.status)}</div>
                </div>
                <div className="sub-header order-status">{this.getDateFormat(orderData.created_at).toDateString()}</div>
                <div className="page-content">
                    {this.renderOrderItemsOrdered()}
                    {this.renderOrderTotals()}
                    {this.renderOrderInfo()}
                </div>
            </div>
        );
    }
}

const OrderDetailPage = props => (
    <SubscribeOne to={AppState} bind={['order_history']}>
        {app => <OrderDetail updateCart={(data)=>app.updateCart(data)}
                         {...props}/>}
    </SubscribeOne>
)

export default OrderDetailPage;