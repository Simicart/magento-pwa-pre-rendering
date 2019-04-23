/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/28/19
 * Time: 5:42 PM
 */
import {Container} from 'unstated-x'
import Identify from "../Helper/Identify";
class AppStateContainer extends Container {
    state = {
        cart_data : Identify.getDataFromStoreage(Identify.SESSION_STOREAGE,'quoteitems') || null,
        wishlist_data : null,
        order_history : null,
        downloadable_data : null,
    };

    updateCart = (data) => {
        this.setStateSync({cart_data : data})
        if(data){
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'cart_number', data.cart_total);
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'quote_id',parseInt(data.quote_id, 10))
            Identify.ApiDataStorage('quoteitems','update', data);
        }
    }

    updateWishlist = (data) => {
        this.setStateSync({wishlist_data : data})
        // console.log(this.state.wishlist_data,'data in appState')

    }

    updateOrderHistory = (data) => {
        this.setStateSync({order_history:data})
    }

    updateDownloadable = (data) => {
        this.setStateSync({downloadable_data:data})
    }
}
export const AppState = new AppStateContainer();