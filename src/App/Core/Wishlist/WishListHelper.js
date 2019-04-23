import WishlistModelCollection  from './Model';
class WishlisHelper {
    static addItemToWishList(product, options = null) {
        // obj.setLoaded(false);
        this.wishlistModel = new WishlistModelCollection();
        this.wishlistModel.addItemToWishList(product.entity_id);
        let params = {};
        params['product'] = product.entity_id;
        params['qty'] = '1';
        
        this.wishlistModel.addItemToWishList(product.entity_id, params);
    }

}
export default WishlisHelper;