/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 10:08 AM
 */
import React from 'react';
import Base from "../../../Core/BaseAbstract";
import Button from "../../../../BaseComponent/Button";
import WishListButton from '@material-ui/core/Button';
import WishListIcon from '@material-ui/icons/Favorite';
import Identify from "../../../../Helper/Identify";
import CustomerHelper from "../../../../Helper/Customer";
import {Qty} from '../../../../BaseComponent/Input/index';
import {SubscribeOne} from 'unstated-x'
import {AppState} from "../../../../Observer/AppState";
import CartModel from '../../../Core/Cart/CartModel';
import WishlistModel from '../../../Core/Wishlist/Model';
class ProductAddToCart extends Base {
    constructor(props){
        super(props)
        this.data = this.props.data.product;
        this.CartModel = new CartModel({obj : this});
        this.WishListModel = new WishlistModel({obj: this});
        // this.addWishlist = false;
        this.wishlist = false;
        this.wishlistActived = false;
       
        this.wishlist_id = this.data.wishlist_item_id;
        this.isRemove = this.wishlist_id ? true : false
        this.iconColor = this.wishlist_id ? "#ff271b" : "#e0e0e0";
        // this.removeWishlist = false;
        this.state = {
            addWishlist: false,
            removeWishlist: false
        }
    }

    componentWillReceiveProps(nextProps) {
        const wishListData = nextProps.wishListData;
        if(nextProps.wishListData && nextProps.wishListData.hasOwnProperty('all_ids')) {
            const wishlistId = wishListData.all_ids.filter(id => id === this.wishlist_id)
            if(wishlistId.length === 0) {
                this.isRemove = false;
                this.iconColor = '#e0e0e0'
                this.setState({});
            }
        }
    }
    

    processError(data){
        this.addCartBtn.hideLoading()
        this.addWishlistBtn.hideLoading()
        console.log(data)
    }

    processData(data){
        this.addCartBtn.hideLoading()
        // this.addWishlistBtn.hideLoading()
        const messages = data.message;
        if(data.errors){
            console.log(data.errors)
        }
        // if(messages instanceof Array){
        //     Identify.showToastMessage(messages[0])
        // }
        if(this.AddCart && messages){
            this.AddCart = false
            Identify.showToastMessage(messages[0])
            this.props.updateCart(data)
        }
        if(this.state.addWishlist){
            Identify.showToastMessage(Identify.__('Product was added to your wishlist'));
            
            this.wishlistActived = true
            if(this.wishlistActived){
                this.isRemove = true;
                this.iconColor = "#ff271b"
            }
            this.props.updateWishlist(data)
            const apiCache = Identify.ApiDataStorage('product_detail_api') || {};
            if(typeof apiCache === 'object' && Object.keys(apiCache).length !== 0) {
                apiCache[this.data.entity_id].product.wishlist_item_id = data.wishlistitem.wishlist_item_id;
                Identify.ApiDataStorage('product_detail_api', 'update', apiCache);
            }
            this.setState({addWishlist: false});
        }
        if(this.state.removeWishlist) {
            this.wishlistActived = false;
            Identify.showToastMessage(Identify.__('Product was removed to your wishlist'));
            this.props.updateWishlist(data);
            this.isRemove = false;
            this.iconColor = '#e0e0e0';
            const apiCache = Identify.ApiDataStorage('product_detail_api') || {};
            if(typeof apiCache === 'object' && Object.keys(apiCache).length !== 0) {
                apiCache[this.data.entity_id].product.wishlist_item_id = null;
                Identify.ApiDataStorage('product_detail_api', 'update', apiCache);
            }
            this.setState({removeWishlist: false});
        }
    }

    AddToCart =(disable=false,type=1)=>{
        if(disable) return ;
        let params = this.parent.getParams();
        if(params){
            if(type === 2){
                // for buy now
                this.AddCart = true;
                this.buynow = true;
                this.btnPurchase.showLoading();
                this.CartModel.addToCart(params);
                return;
            }
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'add_to_cart',true);
            this.addCartBtn.showLoading();
            this.AddCart = true;
            this.CartModel.addToCart(params);
        }
        // Analytics.analyticsTracking(
        //     {
        //         mixpanel : true,
        //         ga : false
        //     },
        //     {
        //         action: 'added_to_cart',
        //         product_id: this.props.data.entity_id,
        //         product_name: this.props.data.name,
        //         sku: this.props.data.sku,
        //     }
        // )
    };


    renderAddCartButton = () => {
        let disable = parseInt(this.data.is_in_stock,10) === 0
        //|| (this.data.stock_item && parseInt(this.data.stock_item.is_in_stock,10) === 0); //comment in some strange cases

        let text = disable ? 'Out of Stock' : 'Add to Cart';

        return (
            <div className={`btn-add-to-cart`} style={{opacity : disable ? 0.5 : 1}}>
                <Button
                    ref={(btn) => {
                        this.addCartBtn = btn
                    }}
                    style={{
                        height: "36px",
                        width: "190px",
                        float: "left",
                        padding: 0,
                    }}
                    textStyle={{
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: "600"
                    }}
                    onClick={() => this.AddToCart(disable)}
                    text={Identify.__(text)}
                />
            </div>
        )

    };

    wishListAction(e, isRemove = false) {
        if (!CustomerHelper.isLogin()) {
            Identify.showToastMessage(Identify.__('Please login first!'));
            return;
        }else {
            if(isRemove && this.isRemove){
                Identify.showLoading();
                this.WishListModel.removeItem(this.wishlist_id)
                this.setState({removeWishlist: true})
                return;
            };
            this.setState({addWishlist : true})
            this.WishListModel.addItemToWishList(this.props.data.product.entity_id);
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'add_to_cart',true);
            Identify.showLoading()
        }
    }

    renderWishListButton = (width = 36, height = 36) => {
        // if(this.data && this.data.wishlist_item_id){
        //     this.iconColor = "#ff271b";
        // }

        return (
            <WishListButton
                onClick={(e) => this.wishListAction(e, this.isRemove)}
                style={{minWidth:width, height, padding: 0,marginLeft : 8}} className="wishlist-btn-icon">
                <WishListIcon style={{fill:this.iconColor,width,height}} className="wishlist-icon"/>
            </WishListButton>
        );


    };

    renderAddToCartView = () => {
        let qty = !this.props.hidden ?
            <div id="add-cart-qty">
                <span>{Identify.__("Qty")}</span>
                <Qty className={`input-qty ${this.props.inputClass}`} inputStyle={{borderRadius : 5,height:36,fontSize : 18}}/>
            </div> : null;
        let hidden = this.data.type_id === 'bundle' ? 'hidden' : ''
        return (
            <div className={`product-add-cart ${hidden} `} style={{alignItems : 'center'}}>
                {qty}
                {this.renderAddCartButton()}
                {this.renderWishListButton()}
            </div>
        );
    };


    render(){
        return this.renderAddToCartView();
    }
}
const ProductAction = props => (
    <SubscribeOne to={AppState} bind={['wishlist_data']}>
        {app => <ProductAddToCart updateCart={(data) => app.updateCart(data)}
                                  updateWishlist={(data) => app.updateWishlist(data)}
                                  wishListData ={app.state.wishlist_data}
                                  {...props}/>}
    </SubscribeOne>
)
export default ProductAction