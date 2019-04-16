import Model from '../../../Model'

class OrderModel extends Model{
    reOrder = (orderId) => {
        let params = {reorder: 1};
        return this.connect(`orders/${orderId}`, params);
    }

    getOrderConllection = (params = {}) => {
        return this.connect('orders', params);
    }

    getOrderDetail = (orderId) => {
        const params = {};
        return this.connect(`orders/${orderId}`, params);
    }
}
export default OrderModel