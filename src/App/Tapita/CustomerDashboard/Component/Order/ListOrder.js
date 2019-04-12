import React, { Component } from 'react';
import {SubscribeOne} from 'unstated-x';
import OrderModel from '../../../../Core/Order/OrderModel';
import Abstract from '../../../../Core/BaseAbstract';
import Loading from '../../../../../BaseComponent/Loading';
import Identify from '../../../../../Helper/Identify';
import NextIcon from '../../../../../BaseComponent/Icon/Next';
import { AppState } from '../../../../../Observer/AppState';

const $ = window.$; 

class ListOrder extends Abstract {
    constructor(props) {
        super(props);
        this.OrderModel = new OrderModel({ obj: this});
        this.state = {loaded: false};
        this.offset = 0;
        this.limit = 15;
        this.total = 0;
        this.loadMore = true;
        this.unmount = false;
        if(this.props.order_history instanceof Object 
            && this.props.order_history.hasOwnProperty('orders')
            && this.props.order_history.orders.length > 0
        ) {
            this.total = this.props.order_history.total;
        }
    }

    componentDidMount() {
        if(!this.checkExistData()) {
            this.OrderModel.getOrderConllection();
        }

        const self = this;
        $(window).scroll(function() {
            const st = $(this).scrollTop();
            const lastScrollTop = $(window).height() + st + 50;
            const documentHeight = $(document).height();
            if(
                documentHeight - lastScrollTop <= 10
                && self.loadMore 
                && self.total > self.limit
                && !self.unmount
            ) {
                self.loadMoreData();
            }
        });
    }

    loadMoreData = () => {
        if(this.props.order_history.orders !== undefined
            && this.props.order_history.orders.length > 0    
        ) {
            const totalItems = this.total;
            if(
                totalItems > this.props.order_history.orders.length
                && !this.props.useForDashboard
            ) {
                
                let params = {};
                params['limit'] = this.limit;
                this.offset = this.offset + 15;
                this.showLoadingMore();
                params['offset'] = this.offset;
                this.OrderModel.getOrderConllection(params);
                this.loadMore = false;
            }
        }
    }

    handleViewOrder = (item) => {
        this.pushLink(`/sales/order/order-detail/${item.increment_id}`, { orderData: item, page: 'order-detail' });
    }

    processData(data) {
        if(
            !this.props.order_history 
            || this.props.order_history.orders === undefined
            || this.props.order_history.orders.length === 0 
        ) {
            this.props.updatedOrder(data);
            this.total = data.total;
        } else {
            const oldData = this.props.order_history;
            let newData = {
                'from': data.from,
                'page_size': data.page_size,
                'all_ids': [...oldData.all_ids, ...data.all_ids],
                'orders': [...oldData.orders, ...data.orders]
            };
            this.props.updatedOrder(newData);
            this.loadMore = true;
        }
        this.hideLoadingMore();
    }

    checkExistData = () => {
        if(this.props.order_history) {
            const data = this.props.order_history;
            if(data.hasOwnProperty('orders') && data.orders.length > 0) {
                this.setState({ loaded: true});
                return true;
            }
        }

        return false;
    }

    hideLoadingMore = () => {
        $(".listview-component .loading-more").hide();
    }

    showLoadingMore = () => {
        $(".listview-component .loading-more").show();
    }

    getDateFormat = (dateData) => {
        let date = Date.parse(dateData);
        date = new Date(date);
        // if (Identify.detectPlatforms() === 1 || Identify.detectPlatforms() === 3) {
        //     let arr = dateData.split(/[- :]/);
        //     date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        // }
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let month = date.getMonth() +   1;
        month = month < 10 ? "0" + month : month;
        return month + "/" + day + "/" + date.getFullYear();
    }

    renderListItem() {
        if(this.props.order_history.orders !== undefined || this.props.order_history.length > 0) {
            let orders = this.props.order_history.orders;
            if(this.props.useForDashboard) {
                orders = orders.slice(0, 3);
            }

            return orders.map((item, index) => {
                const firstName = (item.shipping_address && item.shipping_address.firtname !== null) ? item.shipping_address.firstname : '';
                const lastName = (item.shipping_address && item.shipping_address.lastname !== null) ? item.shipping_address.lastname : '';
                return (
                    <li key={Identify.makeid()} className="list-item" onClick={() => this.handleViewOrder(item)}>
                        <div className="item-header item-field">
                            <span 
                                className="item-title label"
                                style={{ color: this.configColor.content_color}}
                            >{Identify.__(`Order #${item.increment_id}`)}</span>
                            <span
                                className="item-icon value"
                                style={{color: this.configColor.content_color}}
                            >
                                <NextIcon 
                                    style={{ 
                                        width: 18,
                                        height: 18,
                                        transform: Identify.isRtl() ? 'rotate(180deg)' : 'unset'
                                    }}
                                    color={this.configColor.button_background}
                                />
                            </span>
                        </div>
                        <div className="item-field">
                            <span 
                                className="label"
                                style={{color: this.configColor.content_color}}
                            >{Identify.__('Date')}
                            </span>
                            <span 
                                className="value"
                                style={{color: this.configColor.content_color}}
                                
                                >{this.getDateFormat(item.updated_at)}
                            </span>
                        </div>
                        {item.shipping_address.street !== null && (
                            <div className="item-field">
                                <span 
                                    className="label"
                                    style={{color: this.configColor.content_color}}
                                >
                                    {Identify.__('Ship to')}
                                </span>
                                <span
                                    className="value"
                                    style={{color: this.configColor.content_color}}
                                >
                                    {`${firstName} ${lastName}`}
                                </span>
                            </div>
                        )}
                        <div className="item-field">
                            <span 
                                className="label"
                                style={{color: this.configColor.content_color}}
                            >
                                {Identify.__('Order total')}
                            </span>
                            <span 
                                className="value"
                                style={{color: this.configColor.content_color}}
                            >
                                {Identify.formatPrice(item.total.grand_total_incl_tax)}
                            </span>
                        </div>
                        <div className="item-field">
                            <span 
                                className="label"
                                style={{color: this.configColor.content_color}}
                            >
                                {Identify.__('Order status')}
                            </span>
                            <span 
                                className="value status"
                                style={{color: this.configColor.button_background.toLowerCase() !== '#ffffff' ? this.configColor.button_background : '#f69435'}}
                            >
                                {item.status.toUpperCase()}
                            </span>
                        </div>
                    </li>
                )
            })
        }
    }
    
    renderLoadMore() {
        return <Loading className="loading-more" divStyle={{display: 'none'}}/>
    }

    render() {
        if(!this.state.loaded || !this.props.order_history) {
            return <Loading />
        }

        const data = this.props.order_history;
        if(!data || !data.hasOwnProperty('orders') || data.orders.length === 0) {
            return <div className="no-item">{Identify.__('You have no items in your order')}</div>
        } else {
            return (
                <div className="listview-component">
                    <ul className="list-view-content" id="data-list">
                        {this.renderListItem()}
                    </ul>
                    {this.renderLoadMore()}
                </div>
            )
        }
   }

}

const OrderList = props => (
    <SubscribeOne to={AppState} bind={['order_history']}>
        {app => <ListOrder order_history={app.state.order_history}
                            updatedOrder={(data) => app.updateOrderHistory(data)}
                            {...props}
                />}
    </SubscribeOne>
)


export default OrderList;
