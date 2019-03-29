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

}
export default CartModel