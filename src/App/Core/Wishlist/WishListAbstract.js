import Model from './Model';
import Base from '../BaseAbstract';
// import { showFogLoading, hideFogLoading } from '../../../BaseComponent/Loading/GlobalLoading'
import Identify from '../../../Helper/Identify';

// const $ = window.$;

class WishListAbstract extends Base {
    constructor(props) {
        super(props);
        let isPhone = this.state.isPhone;
        this.state = {
            data: null,
            loaded: false,
            isPhone
        };
        // this.supportNavigatorShare = window.navigator.share !== undefined || false;
        this.addCart = false;
        this.removeItem = false;
        this.wishlistModel = new Model({ obj: this });
        this.parent = props.sidebarParent
        //wishlist opened from shared url
        this.wishlist_code = false
        if (props.match && props.match.params && props.match.params.id)
            this.wishlist_code = props.match.params.id
    }

    getApiData() {
        // showFogLoading()
        if (this.wishlist_code){
            this.wishlistModel.getWishlistWithCode(this.wishlist_code)
        }     
        else{
            this.wishlistModel.getWishlist();
        }
    }

    processError(data){
        if (data.errors) {
            let errors = data.errors;
            let text = "";
            for (let i in errors) {
                let error = errors[i];
                text += error.message + ' ';
            }
            Identify.showToastMessage(text);
            this.pushLink(`/`)
        }
    }

    processData(data){
        if (this.addCart || this.removeItem) {
            this.wishlistModel.getWishlist();
            if (this.addCart) {
                Identify.showToastMessage(Identify.__('This product added to cart'));
                this.wishlistModel.getCart();
            }
            if (this.removeItem) {
                Identify.showToastMessage(Identify.__('This wishlist item has been removed from your wishlist'));
                // this.props.updateWishlist(data.wishlistitems);
            }
            this.addCart = false;
            this.removeItem = false;
            return;
        }
        if (data.cart_total) {
            Identify.updateCart(data.cart_total);
            // $('.cart-number').text(data.cart_total);
            this.props.updateCart(data);
            return;
        }
        this.props.updateWishlist(data);
        //this.setState({data: data, loaded: true});
    }



    handleDelete = (id) => {
        // showFogLoading()
        this.removeItem = true;
        this.wishlistModel.removeItem(id);
    }

    requestAddToCart = (itemId) => {
        // showFogLoading()
        this.addCart = true
        this.wishlistModel.requestAddToCart(itemId);
    }

    addCartHandle = (item) => {
        if (item.selected_all_required_options === false) {
            Identify.showToastMessage('Please select the options(*)');
            if (this.parent)//&& this.parent.wishlistSideBar)
                // this.parent.wishlistSideBar.handleCloseSideBar()
                this.pushLink(`/product/${item.product_id}`);
        } else {
            this.requestAddToCart(item.wishlist_item_id);
        }
    }

    copyToClipBoard(copyText, message) {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(copyText).then(function () {
                Identify.showToastMessage(message)
                return
            }, function (err) {
                Identify.showToastMessage(Identify.__('Could not save url to clipboard'))
            });
        } else {
            Identify.showToastMessage(Identify.__('Could not save url to clipboard'))
        }
    }

    shareAction = (e, obj) => {
        if (navigator.share !== undefined) {
            e.preventDefault();
            navigator.share({ title: obj.title, text: obj.text, url: obj.url })
                .then(() => console.log('Sharing completed'),
                    error => {
                        console.log('Error sharing:', error)
                    });
        } else {
            this.copyToClipBoard(obj.url, Identify.__('Sharing Url has been saved to your clipboard!'))
        }
    }

}

export default WishListAbstract;
