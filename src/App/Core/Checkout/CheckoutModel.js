/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/20/18
 * Time: 11:10 AM
 */
import Model from '../../../Model/'
import Identify from "../../../Helper/Identify";
class OrderModel extends Model{

    updateOrder = (jQuery) => {
        let urlParams = {};
        return this.advancedConnect('PUT', 'orders/onepage', urlParams, jQuery);
    };

    getOrderOnepage = () => {
        return this.connect('orders/onepage',{});
    }

    placeOrder = (params = {}) => {
        let urlParams = {};
        return this.advancedConnect('POST', 'orders/onepage', urlParams, params);
    }

    getOrderCollection = (params = {}) => {
        return this.connect('orders', params)
    }

    reOrder = (orderId) => {
        let api = 'orders/' + orderId;
        let jQuery = {reorder: 1};
        return this.connect(api, jQuery);
    }

    getOrderDetail = (orderId) => {
        let api = 'orders/' + orderId;
        return this.connect(api, {});
    }

    getCart = ()=>{
        return this.connect('quoteitems',{})
    }

    spendingPoint = (param)=>{
        let api = "simirewardpoints/spend" ;
        return this.advancedConnect('PUT',api,{},param)
    }

    UseCredit(param,config){
        let api = '';
        if(config===1){
            api  = 'giftvouchercheckouts/usecredit';
        }else if(config===2){
            api = 'giftvouchercheckouts/usecreditcheckout';
        }
        Identify.showLoading();
        return this.advancedConnect('PUT', api, {}, param);
    }

    UseGiftCode(param,config){
        let api = '';
        if(config===1){
            api = 'giftvouchercheckouts/usecode';
        }else if(config===2){
            api = 'giftvouchercheckouts/addcodecheckout';
        }
        return this.advancedConnect('PUT', api, {}, param)
    }

    RemoveGiftCode(param, config){
        let api = '';
        if(config===1){
            api = 'giftvouchercheckouts/remove';
        }else if(config===2){
            api = 'giftvouchercheckouts/removegiftcode';
        }
        return this.advancedConnect('PUT', api, {}, param)
    }

    ChangeAmoutGiftCode(param, config){
        let api = '';
        if(config===1){
            api = 'giftvouchercheckouts/updatecode';
        }else if(config===2){
            api = 'giftvouchercheckouts/updategiftcode';
        }
        return this.advancedConnect('PUT',api, {}, param);
    }
}
export default OrderModel