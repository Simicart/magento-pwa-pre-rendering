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
        cart_data : null,
        wishlist_data : null,
        order_history : null,
        downloadable_data : null,
    };

    updateCart = (data) => {
        this.setStateSync({cart_data : data})
        if(data){
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'quote_id',parseInt(id, 10))
        }
    }

    updateWishlist = (data) => {
        this.setStateSync({wishlist_data : data})
    }

    updateOrderHistory = (data) => {
        this.setStateSync({order_history:data})
    }

    updateDownloadable = (data) => {
        this.setStateSync({downloadable_data:data})
    }
}
export const AppState = new AppStateContainer();