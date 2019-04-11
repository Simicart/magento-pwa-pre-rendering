import Model from '../../../Model'

class OrderModel extends Model{
    reOrder = (orderId) => {
        let params = {reorder: 1};
        if(sessionStorage.getItem('email')) {
            params['email'] = sessionStorage.getItem('email').replace(/['"]+/g, '');
            if (sessionStorage.getItem('simi_hash')) {
                params['simi_hash'] = sessionStorage.getItem('simi_hash').replace(/['"]+/g, '');       
            } else if (sessionStorage.getItem('password')) {
                params['password'] = sessionStorage.getItem('password').replace(/['"]+/g, '');
            }
        }
        return this.connect(`orders/${orderId}`, params);
    }

    getOrderConllection = (params = {}) => {
        if(sessionStorage.getItem('email')) {
            params['email'] = sessionStorage.getItem('email').replace(/['"]+/g, '');
            if (sessionStorage.getItem('simi_hash')) {
                params['simi_hash'] = sessionStorage.getItem('simi_hash').replace(/['"]+/g, '');       
            } else if (sessionStorage.getItem('password')) {
                params['password'] = sessionStorage.getItem('password').replace(/['"]+/g, '');
            }
        }
        return this.connect('orders', params);
    }

    getOrderDetail = (orderId) => {
        const params = {};
        if(sessionStorage.getItem('email')) {
            params['email'] = sessionStorage.getItem('email').replace(/['"]+/g, '');
            if (sessionStorage.getItem('simi_hash')) {
                params['simi_hash'] = sessionStorage.getItem('simi_hash').replace(/['"]+/g, '');       
            } else if (sessionStorage.getItem('password')) {
                params['password'] = sessionStorage.getItem('password').replace(/['"]+/g, '');
            }
        }
        return this.connect(`orders/${orderId}`, params);
    }
}
export default OrderModel