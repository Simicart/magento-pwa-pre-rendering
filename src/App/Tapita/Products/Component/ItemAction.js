/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 9:29 AM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Button from '../../../../BaseComponent/Button/index';
import HearthOutline from '../../../../BaseComponent/Icon/Heart-shape-outline';
import HearthFilled from '../../../../BaseComponent/Icon/Heart-shape-filled';
import CustomerHelper from "../../../../Helper/Customer";
import Identify from "../../../../Helper/Identify";
import {Router} from 'simiLink'
import CartModel from '../../../Core/Cart/CartModel'
class ItemAction extends Abstract{

    constructor(props) {
        super(props);
        this.Model = new CartModel({obj:this})
    }

    processError(data){
        this.addCartBtn.hideLoading()
        this.addWishlistBtn.hideLoading()
    }

    processData(data){
        this.addCartBtn.hideLoading()
        this.addWishlistBtn.hideLoading()

        const messages = data.message;
        if(messages instanceof Array){
            Identify.showToastMessage(messages[0])
        }
        if(this.AddToCart){
            this.AddToCart = false
            this.props.updateCart(data)
        }
    }


    addToCart() {
        const item = this.props.item;
        let checkOption = item.app_options instanceof Object && item.app_options.custom_options && Array.isArray(item.app_options.custom_options) && item.app_options.custom_options.length > 0
        if(parseInt(item.has_options, 10) === 0 || (item.type_id === 'simple' && !checkOption)){
            this.AddToCart = true
            this.addCartBtn.showLoading();
            this.Model.addToCart({product:item.entity_id,qty:1})
        }else{
            Router.pushRoute(this.props.url_path)
        }
    }

    renderAddCartButton(item) {
        const addToCartString = (parseInt(item.is_salable) !== 1)?Identify.__('Out of stock'):Identify.__('Add to Cart');
        if (!this.addCartFontSize) {
            let fontSizeViewport = 30/addToCartString.length;
            this.addCartFontSize = fontSizeViewport<2? fontSizeViewport+'vw' : '16px';
        }
        return <Button
            ref={(btn) => {this.addCartBtn = btn}}
            style={{
                opacity: (parseInt(item.is_salable) !== 1)?0.5:1,
            }}
            textStyle={{
                textAlign : 'center',
                fontSize : this.addCartFontSize,
                fontWeight: "600",
                whiteSpace: 'nowrap'
            }}
            onClick={() => this.addToCart()}
            text={addToCartString}/>
    }

    renderWishListButton() {
        const width = 40;
        const height = 40;
        let activeDisplay = 'none';
        let inactiveDisplay = 'block';
        if (this.wishlistActived) {
            activeDisplay = 'block';
            inactiveDisplay = 'none';
        }
        const wishlistInactiveIcon = <HearthOutline color="#e0e0e0" style={{width, height}}/>;
        const wishlistActiveIcon = <HearthFilled color="#ff0000" style={{width, height}}/>;
        const buttonStyle = {
            height: "43px",
            width: "43px",
            float: "left",
            backgroundColor: "transparent"
        };
        return (
            <div>
                <div className="wishlist-icon actived" style={{display: activeDisplay}}>
                    <Button
                        style={buttonStyle}
                        text={wishlistActiveIcon}
                    />
                </div>
                <div className="wishlist-icon inactived" style={{display: inactiveDisplay}}>
                    <Button
                        ref={(btn) => {this.addWishlistBtn = btn}}
                        style={buttonStyle}
                        onClick={() => this.addToWishList()}
                        text={wishlistInactiveIcon}
                    />
                </div>
            </div>
        );
    }

    addToWishList() {
        if (!CustomerHelper.isLogin()) {
            Identify.showToastMessage(Identify.__('Please login first!'));
            return;
        }
        this.addWishlistBtn.showLoading();
        const item = this.props.item;
        //if (item.has_options !== '0')
        //return;
        this.addWishlist = true;
    }

    render() {
        const {item} = this.props;
        return (
            <div className="product-item-action" style={{justifyContent : 'space-between'}}>
                <div style={{width : '100%'}}>
                    {this.renderAddCartButton(item)}
                </div>
                {this.renderWishListButton()}
            </div>
        );
    }
}
export default ItemAction
