import React, { Component } from 'react';
import Abstract from '../../../../Core/BaseAbstract';
import OrderModel from '../../../../../App/Core/Order/OrderModel';
import { SubscribeOne } from 'unstated-x';
import { AppState } from '../../../../../Observer/AppState';
import { Loading } from '../../../../../BaseComponent/Loading';
import PaginationTable from '../../../../../BaseComponent/Pagination/table';
import Identify from '../../../../../Helper/Identify';

class TableOrder extends Abstract {
    constructor(props) {
        super(props);
        this.OrderModel = new OrderModel({obj: this});
        this.state = {loaded: false};
        this.limit = 5;
        this.currentPage = 1;
        this.parent = props.parent
    }

    componentDidMount() {
        if(!this.checkExistData()) {
            this.OrderModel.getOrderConllection();
        }
    }
    
    checkExistData = () => {
        if(this.props.order_history) {
            const data = this.props.order_history;
            if(data.hasOwnProperty('orders') && data.orders.length > 0) {
                this.setState({loaded: true});
                return true;
            }
        }
        return false;
    }
    
    processData(data) {
        this.props.updateOrder(data);
    }

    handleViewOrder = (item) => {
        this.pushLink(`/sales/order/order-detail/${item.increment_id}`)
    }
    
    renderOrderItem(item) {
        let date = Date.parse(item.created_at);
        date = new Date(date);
        // if (Identify.detectPlatforms() === 1) {
        //     let arr = item.created_at.split(/[- :]/);
        //     date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        // }
        let m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        date = m + '/' + date.getDate() + '/' + date.getFullYear();
        return (
            <tr key={Identify.makeid()}>
                <td>{Identify.__(item.increment_id)}</td>
                <td>{date}</td>
                <td>{`${item.customer_firstname} ${item.customer_lastname}`}</td>
                <td>{Identify.formatPrice(item.grand_total)}</td>
                <td>{item.status}</td>
                <td className="item-action">
                    <p onClick={() => this.handleViewOrder(item)}
                        style={{
                            color: this.configColor.button_background,
                            cursor: 'pointer'
                        }}
                    >{Identify.__('View Order')}</p>
                    {this.parent.isAllowReOrder && (
                        <span>
                            <span>|</span>
                            <span onClick={() => this.parent.handleReOrder(item.entity_id)}
                                  style={{
                                      marginLeft: 5,
                                      color: this.configColor.button_background,
                                      cursor: 'pointer'
                                  }}>{Identify.__('Reorder')}</span>
                        </span>
                    )}
                </td>
            </tr>
        )
    }

    renderTableData() {
        if(!this.state.loaded) {
            return <Loading />
        }

        let isDashBoard = this.props.useForDashboard;

        let data = this.props.order_history;

        if(!data || !data.hasOwnProperty('orders') || data.orders.length === 0) {
            return <div className="text-center">{Identify.__('You have no items in your order')}</div>
        } else {
            const order = isDashBoard ? data.orders.slice(0, 3) : data.orders;
            const cols = ['Order #', 'Date', 'Ship to', 'Order Total', 'Status', 'Action'];

            return (
                <div className="table-list-order">
                    <PaginationTable 
                        renderItem={this.renderOrderItem.bind(this)}
                        data={order}
                        cols={cols}
                        showPageNumber={!isDashBoard}
                    />
                </div>
            )
        }


    }
    render() {
        return (
            this.renderTableData()
        );
    }
}

const OrderTable = props => (
    <SubscribeOne to={AppState} bind={['order_history']}>
        {app => <TableOrder order_history={app.state.order_history}
                            updateOrder={(data) => app.updateOrderHistory(data)}
                            {...props}/>}
    </SubscribeOne>
)

export default OrderTable;