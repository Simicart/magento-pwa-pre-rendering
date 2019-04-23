import React from 'react';
import { SubscribeOne } from 'unstated-x';
import ListViewAbstract from '../ListViewAbstract';
import CustomerModel from '../../../../Core/Customer/CustomerModel';
import { AppState } from '../../../../../Observer/AppState';
import Loading from '../../../../../BaseComponent/Loading';
import Identify from '../../../../../Helper/Identify';
import DownloadIcon from '../../../../../BaseComponent/Icon/Download';

class ListDownloadable extends ListViewAbstract {
    constructor(props) {
        super(props);
        this.CustomerModel = new CustomerModel({ obj: this })
        this.state = {loaded: false}
        if(this.props.data instanceof Object 
            && this.props.data.hasOwnProperty('downloadableproducts')
            && this.props.data.downloadableproducts.length > 0
        ) {
            this.total = this.props.data.total;
        }
    }

    processData(data) {
        if(
            !this.props.data 
            || this.props.data.downloadableproducts === undefined 
            || this.props.data.downloadableproducts.length === 0
        ) {
            this.props.updateDownloadable(data);
            this.total = data.total;
        } else {
            const oldData = this.props.data;
            const newData = {
                from: data.from,
                page_size: data.page_size,
                all_ids: [...oldData.all_ids, ...data.all_ids],
                downloadableproducts: [...oldData.downloadableproducts, ...data.downloadableproducts]
            }
            this.props.updateDownloadable(newData);
            this.loadMore = true;
        }
        this.hideLoadingMore();
    }

    initLoadData = () => {
        this.CustomerModel.getDownloadableProducts();
    }

    checkExistData = () => {
        if(this.props.data) {
            const data = this.props.data;
            if(data.hasOwnProperty('downloadableproducts') && data.downloadableproducts.length > 0) {
                this.setState({loaded: true});
            }
        }
        return false;
    }

    loadMoreData = () => {
        if(this.props.data.downloadableproducts != undefined && this.props.data.downloadableproducts.length > 0) {
            const totalItems = this.total;
            if(totalItems > this.props.data.downloadableproducts.length) {
                this.offset = this.offset + 15;
                this.showLoadingMore();
                if(this.offset > totalItems) {
                    this.offset = totalItems;
                }
                const query = {
                    limit: this.limit,
                    offset: this.offset
                }
                this.CustomerModel.getDownloadableProducts(query);
                this.loadMore = false;
            }
        }
    }

    handleViewOrder = (item) => {
        this.pushLink(`/sales/order/order-detail/${item.order_id}`);
    }

    renderListItem() {
        if(this.props.data.downloadableproducts !== undefined || this.props.downloadableproducts.length > 0) {
            const dataItems = this.props.data.downloadableproducts;
            return dataItems.map(item => {
                return (
                    <li key={Identify.makeid()} className="list-item" onClick={() => this.handleViewOrder(item)}>
                        <div className="item-header item-field">
                            <span className="item-title label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Order') + " #" + item.order_id}</span>
                            {item.order_status.toLowerCase() === 'available' && (
                                <span className="item-icon value"
                                      style={{color: this.configColor.content_color}}>
                                    <a href={item.order_link} download target="_self"
                                       onClick={(e) => e.stopPropagation()}>
                                    <DownloadIcon
                                        style={{width: 18, height: 18}}
                                        color={this.configColor.button_background}/></a>
                                </span>
                            )}
                        </div>
                        <div className="item-field">
                            <span className="label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Date')}</span>
                            <span className="value"
                                  style={{color: this.configColor.content_color}}>{this.getDateFormat(item.order_date)}</span>
                        </div>
                        <div className="item-field">
                                <span className="label"
                                      style={{color: this.configColor.content_color}}>{Identify.__('Title')}</span>
                            <span
                                className="value"
                                style={{color: this.configColor.content_color}}>{item.link_title}</span>
                        </div>
                        <div className="item-field">
                            <span className="label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Order status')}</span>
                            <span className="value status"
                                  style={{color: this.configColor.button_background.toLowerCase() !== '#ffffff' ? this.configColor.button_background : '#f69435'}}>{item.order_status.toUpperCase()}</span>
                        </div>
                        <div className="item-field">
                            <span className="label"
                                  style={{color: this.configColor.content_color}}>{Identify.__('Remaining Download')}</span>
                            <span className="value"
                                  style={{color: this.configColor.content_color}}>{item.order_remain}</span>
                        </div>
                    </li>
                )
            });
        }
    }
    
    render() {
        if(!this.state.loaded || this.props.data === null) {
            return <Loading />
        }

        if (this.props.data.downloadableproducts === undefined || this.props.data.downloadableproducts.length === 0) {
            return <div className="no-item">{Identify.__('List is empty')}</div>;
        }

        return <ListViewAbstract renderItems={this.renderListItem()}/>
    }
}

const ListDownloadablePage = props => (
    <SubscribeOne to={AppState} bind={['downloadable_data']}>
        {app => <ListDownloadable 
                    data={app.state.downloadable_data}
                    updateDownloadable={(data) => app.updateDownloadable(data)}
                    {...props}
                />
        }
    </SubscribeOne>
)

export default ListDownloadablePage;