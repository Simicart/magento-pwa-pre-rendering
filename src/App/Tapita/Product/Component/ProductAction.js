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
import CartModel from '../../../Core/Cart/CartModel'
class ProductAddToCart extends Base {
    constructor(props){
        super(props)
        this.data = this.props.data.product;
        this.CartModel = new CartModel({obj : this});
        this.addWishlist = false;
        this.wishlist = false
        this.wishlistActived = false;
        this.wishlist_id = this.data.wishlist_item_id;
        this.removeWishlist = false;
    }

    processError(data){
        this.addCartBtn.hideLoading()
        this.addWishlistBtn.hideLoading()
    }

    processData(data){
        this.addCartBtn.hideLoading()
        // this.addWishlistBtn.hideLoading()

        const messages = data.message;
        console.log(messages)
        if(messages instanceof Array){
            Identify.showToastMessage(messages[0])
        }
        if(this.AddCart){
            this.AddCart = false
            this.props.updateCart(data)
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
                this.WishListModel.removeItem(this.wishlist_id)
                this.removeWishlist = true;
                return;
            };
            this.addWishlist = true;
            this.WishListModel.addItemToWishList(this.props.data.entity_id);
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'add_to_cart',true);
            Identify.showLoading()
        }
    }

    renderWishListButton = (width = 36, height = 36) => {
        let iconColor = "#e0e0e0";
        let isRemove = false;
        if (this.data.wishlist_item_id && this.data.wishlist_item_id !== null ) {
            if(this.wishlistActived) this.isRemove = true;
            this.wishlistActived = true;
            isRemove = true;
            iconColor = "#ff271b";
        }
        if(this.wishlistActived){
            isRemove = true;
            iconColor = "#ff271b";
        }
        return (
            <WishListButton
                onClick={(e) => this.wishListAction(e, isRemove)}
                style={{minWidth:width, height, padding: 0,marginLeft : 8}} className="wishlist-btn-icon">
                <WishListIcon style={{fill:iconColor,width,height}} className="wishlist-icon"/>
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
    <SubscribeOne to={AppState} bind={[]}>
        {app => <ProductAddToCart updateCart={(data) => app.updateCart(data)}
                                  updateWishlist={(data) => app.updateWishlist(data)}
                                  {...props}/>}
    </SubscribeOne>
)
export default ProductAction