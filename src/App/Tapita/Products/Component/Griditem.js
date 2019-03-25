import React from 'react';
import LazyLoad from 'react-lazyload';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import CustomerHelper from '../../../../Helper/Customer';
import ObjectHelper from '../../../../Helper/ObjectHelper';
import './item.css';
import Price from '../../../../BaseComponent/Price';
import {Link} from 'simiLink';
import Rate from '../../../../../../magento-pwa1/src/BaseComponent/Rate/index';
import Button from '../../../../BaseComponent/Button/index';
import HearthOutline from '../../../../BaseComponent/Icon/Heart-shape-outline';
import HearthFilled from '../../../../BaseComponent/Icon/Heart-shape-filled';
import PropTypes from 'prop-types';
import Img from './ImgItem'
const $ = window.$;

class Griditem extends Abstract {
    constructor(props, context) {
        super(props, context);
        this.item = this.props.item;
        this.wishlistActived = false;
        this.cartModel = new CartModel({obj: this});
        this.addWishlist = false;
        this.state = {loaded:false}
    }

    shouldComponentUpdate(nextProps,nextState){
        if (!this.item)
            return ObjectHelper.shallowCompare(this,nextProps,nextState);
        else
            return (JSON.stringify(this.item) !== JSON.stringify(nextProps.item) || this.wishlistActived === true);
    }

    render() {
        if (!this.item)
            return '';
        const item = this.item;
        let url_path = item.request_path ? item.request_path : (item.url_key ? item.url_key : item.url_path);
        if (url_path && !url_path.includes('.html'))
            url_path += '.html';
        if (!url_path)
            url_path = 'product/' + item.entity_id;
        if(this.item.type_id === "simigiftvoucher") url_path = url_path+'?giftcard='+this.item.entity_id;
        this.location = {
            pathname: "/" + url_path,
            state: {
                product_id: item.entity_id,
                item_data: item,
                giftcard : this.item.type_id === 'simigiftvoucher'
            },
        };
        let sale_off = <div></div>;
        if (item.app_prices.has_special_price !== null && item.app_prices.has_special_price === 1) {
            if (item.app_prices.show_ex_in_price !== null && item.app_prices.show_ex_in_price === 1) {
                let number_sale = 100 - (item.app_prices.price_including_tax.price / item.app_prices.regular_price) * 100;
                number_sale = number_sale.toFixed(0);
                sale_off = <div className="sale-label" style={{color: configColor.button_background}}>{number_sale}% OFF</div>;
            } else {
                let number_sale = 100 - (item.app_prices.price / item.app_prices.regular_price) * 100;
                number_sale = number_sale.toFixed(0);
                sale_off = <div className="sale-label" style={{color: configColor.button_background}}>{number_sale}% OFF</div>;
            }
        }
        // let appreview = '';
        // if (item.app_reviews && item.app_reviews.rate) {
        let appreview = null;
        if(item.app_reviews instanceof Object && item.app_reviews.hasOwnProperty('rate')){
             appreview = this.props.IsListGiftCard ? <div></div> : <div className="review-rate">
                <Rate rate={item.app_reviews.rate}/>
                <span className="review-count">
                    ({item.app_reviews.number} {(item.app_reviews.number)?Identify.__('Reviews'):Identify.__('Review')})
                </span>
            </div>;
        }

        // }
        // else if (!this.state.isPhone) {
        //     appreview = (<div className="review-rate"><Rate rate={0}/>
        //         <span className="review-count">
        //             (0 {Identify.__('Review')})
        //         </span></div>);
        // }

        // peter customize
        let itemAction = (item.has_options === '0')?
            <div className="product-item-action">
                <div style={{width : '100%'}}>
                    {this.renderAddCartButton(item)}
                </div>
                {this.renderWishListButton()}
            </div> :
            <div className="product-item-action" style={{justifyContent : 'space-between'}}>
                <Link to={this.location} style={{width : '100%'}}>
                    {this.renderAddCartButton(item)}
                </Link>
                {this.renderWishListButton()}
            </div>;

        let image = (
            <div className="tapita-product-image"
                 style={{borderColor: configColor.image_border_color,
                     // backgroundImage: `url("${item.images[0].url}")`
                 }}>
                <div style={{position:'absolute',top:0,bottom:0,width: '100%'}}>
                    <Img src={item.images[0].url} alt={item.name}/>
                </div>
                {sale_off}
                {layout.render_product_label(item)}
            </div>
        )
        // image = <div>
        //     <Img src={item.images[0].url} alt={item.name}/>
        // </div>
        return (
            <div className="product-item tapita-product-grid-item">
                <Link to={this.location}>
                    {this.props.lazyImage?
                        (<LazyLoad placeholder={<div className="tapita-product-image"/>}>
                            {image}
                        </LazyLoad>):
                        image
                    }
                </Link>
                <div className="tablet-product-des">
                    <div className="prices-layout" id={`price-${item.entity_id}`} onClick={()=>this.handleLink(this.location)}>
                        <Price config={1} prices={item.app_prices} type={item.type_id}/>
                    </div>
                    <div className="product-name small" onClick={()=>this.handleLink(this.location)}>{item.name}</div>
                    {appreview}
                    {itemAction}
                </div>
            </div>
        );
    }

    componentDidMount(){
        const id = '#price-'+this.item.entity_id;
        const special_price = $(id).find('.special-price');
        const w = special_price.width();
        let w_price = 0;
        const price = special_price.find('span.price')
        price.each(function () {
            w_price += $(this).width();
        })
        if(w < w_price){
            special_price.css('flex-wrap','wrap');
            special_price.find('.special-price-label').css('margin','0');
        }
    }

    renderAddCartButton(item) {
        const addToCartString = (parseInt(item.is_salable) !== 1)?Identify.__('Out of stock'):Identify.__('Add to Cart');
        if (!this.addCartFontSize) {
            let fontSizeViewport = 30/addToCartString.length;
            this.addCartFontSize = fontSizeViewport<2? fontSizeViewport+'vw' : '16px';
        }
        if(!this.props.IsListGiftCard){
            return <Button
                ref={(btn) => {this.addCartBtn = btn}}
                style={{
                    marginTop: "5px",
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
            marginTop: "2px",
            float: "left",
            backgroundColor: "transparent"
        };
        if(!this.props.IsListGiftCard){
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
    }

    addToCart() {
        const item = this.props.item;
        if (parseInt(item.has_options, 10) !== 0 || parseInt(item.is_salable, 10) !== 1)
            return;
        this.addCartBtn.showLoading();
        this.cartModel.addToCart({"product": item.entity_id, "qty": 1});

        Analytics.analyticsTracking(
            {
                mixpanel : true,
                ga : false
            },
            {
                action: `clicked_add_to_cart_button`,
                name: `selected_product_${this.item.name}`,
                sku: `selected_product_${this.item.sku}`,
                product_id: `selected_product_${this.item.entity_id}`,
            }
        )
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
        this.cartModel.addItemToWishList(item.entity_id);
    }

    setData(data) {
        this.addCartBtn.hideLoading();
        this.addWishlistBtn.hideLoading();
        if (data.errors) {
            const errors = data.errors;
            let text = "";
            for (const i in errors) {
                const error = errors[i];
                text += error.message + ' ';
            }
            Identify.showToastMessage(text);
        } else {
            if (!this.addWishlist) {
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'quote_id', data.quote_id);
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'cart_number', data.cart_total);
                $('.cart-number').show();
                $('.cart-number').text(data.cart_total);
                if(data.quote_id){
                    Identify.updateQuoteId(data.quote_id);
                }
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'quoteitems', data);
                if (this.props.updateCart)
                    this.props.updateCart(data);
            }
            if(this.wishlist){
                this.props.updateWishlist(data);
            }

            const messages = data.message;

            if (messages) {
                let text = "";
                for (const i in messages) {
                    text += messages[i] + ' ';
                }
                if (!this.wishlist)
                    Identify.showToastMessage(text);
            } else {
                if (data.message != null) {
                    Identify.showToastMessage(data.message[0]);
                } else {
                    if (this.addWishlist) {
                        this.wishlistActived = true;
                        this.cartModel.getWishlist();
                        this.wishlist = true;
                        Identify.showToastMessage(this.item.name + ' ' + Identify.__('was added to your wishlist'));
                    } else {
                        Identify.showToastMessage(this.item.name + ' ' + Identify.__('was added to your shopping cart'));
                        this.options = null;
                        this.props.updateCart(data);

                        Analytics.analyticsTracking(
                            {
                                mixpanel : true,
                                ga : false
                            },
                            {
                                action: `added_to_cart`,
                                name: `selected_product_${this.item.name}`,
                                sku: `selected_product_${this.item.sku}`,
                                product_id: `selected_product_${this.item.entity_id}`,
                            }
                        )
                    }
                }
            }
        }
        this.addWishlist = false;
    }
}

Griditem.contextTypes = {
    router: PropTypes.object,
    lazyImage: PropTypes.bool
}

export default Griditem;
