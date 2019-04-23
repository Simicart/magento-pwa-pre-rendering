import Model from '../../../Model';

class WishlistCollection extends Model {
    getWishlist = ()=>{
        let api = 'wishlistitems';
        this.connect(api,{})
    }

    getWishlistWithCode = (code)=>{
        let api = 'wishlistitems';
        this.connect(api,{code : code})
    }

    getCart = ()=>{
        let api = 'quoteitems';
        this.connect(api,{});
    };

    requestAddToCart=(itemId) =>{
        let api = `wishlistitems/${itemId}`;
        let queryParams = {};
        queryParams['add_to_cart'] = 1;
        this.connect(api, queryParams);
    };

    addItemToWishList = (id, params = null)=>{
        let api = 'wishlistitems';
        if (!params)
            params = {
                product : id,
                qty : 1
            };
        this.advancedConnect('POST',api,{},params);
        sessionStorage.setItem('wishlist',true);
    }

    removeItem = (id) => {
        let api = `wishlistitems/${id}`;
        this.advancedConnect('DELETE',api,{},{});
    }
}
export default WishlistCollection;