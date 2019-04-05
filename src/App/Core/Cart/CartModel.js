/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 10:49 AM
 */
import Model from '../../../Model'
import Identify from "../../../Helper/Identify";

class CartModel extends Model{

    addToCart(jQuery) {
        let urlParams = {
            pwa : 1,
        };
        let quote_id = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'quote_id');
        if(quote_id){
            quote_id = parseInt(quote_id,10);
            urlParams['quote_id'] = quote_id;
        }
        return this.advancedConnect('POST', 'quoteitems', urlParams, jQuery);
    }

    getCart(){
        let data = this.getSavedData();
        let urlParams = {
            pwa : 1,
        }
        if(data.quote_id){
            urlParams['quote_id'] = data.quote_id

        }
        return this.connect('quoteitems',urlParams);
    }

    getSavedData = ()=> {
        if (Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'quote_id')) {
            return {'quote_id': Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'quote_id')};
        }
        if (localStorage.getItem('quote_id')) {
            return {'quote_id': localStorage.getItem('quote_id')};
        }
        return {}
    }

}
export default CartModel