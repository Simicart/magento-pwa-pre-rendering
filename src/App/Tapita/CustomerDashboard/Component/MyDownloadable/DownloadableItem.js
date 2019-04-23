import React from 'react';
import Abstract from '../../../../Core/BaseAbstract';
import Identify from '../../../../../Helper/Identify';
import PropTypes from 'prop-types';

class DownloadableItem extends Abstract {
    constructor(props) {
        super(props);
        this.itemData = this.props.itemData;
    }

    handleViewOrderDetail = () => {
        this.pushLink(`/sales/order/order-detail/${this.itemData.order_id}`)
    }

    getDateFormat = (dateData) => {
        let date = Date.parse(dateData);
        date = new Date(date);
        if (Identify.detectPlatforms() === 1 || Identify.detectPlatforms() === 3) {
            let arr = dateData.split(/[- :]/);
            date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        }
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        return month + "/" + day + "/" + date.getFullYear();
    };
    
    renderDownloadLink() {
        let element = this.itemData.link_title;
        if (this.itemData.order_status.toLowerCase() === 'available') {
            element = <a href={this.itemData.order_link} download target="_self">{this.itemData.link_title}</a>
        }
        return element;
    };

    render() {
        return (
            <tr>
                <td><span onClick={() => this.handleViewOrderDetail()}
                          style={{cursor: 'pointer'}}>{this.itemData.order_id}</span></td>
                <td>{this.getDateFormat(this.itemData.order_date)}</td>
                <td>{this.renderDownloadLink()}</td>
                <td>{Identify.capitalizeFirstLetter(this.itemData.order_status)}</td>
                <td>{this.itemData.order_remain}</td>
            </tr>
        );
    }
}

DownloadableItem.contextTypes = {
    router: PropTypes.object
}

export default DownloadableItem;