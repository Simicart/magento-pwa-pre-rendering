import React from 'react';
import LazyLoad from 'react-lazyload';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import CustomerHelper from '../../../../Helper/Customer';
import ObjectHelper from '../../../../Helper/ObjectHelper';
import './item.scss';
import Price from '../../../../BaseComponent/Price';
import {Link,Router} from 'simiLink';
import Rate from '../../../../BaseComponent/Rate';
import Img from './ImgItem'
import {ItemActionHoC} from "../HoC";

const configColor = Identify.getColorConfig()
class Griditem extends Abstract {
    constructor(props, context) {
        super(props, context);
        this.item = this.props.item;
        this.wishlistActived = false;
        this.addWishlist = false;
        this.state = {loaded:false}
    }

    shouldComponentUpdate(nextProps,nextState){
        if (!this.item)
            return ObjectHelper.shallowCompare(this,nextProps,nextState);
        else
            return (JSON.stringify(this.item) !== JSON.stringify(nextProps.item) || this.wishlistActived === true);
    }

    renderImg(item){
        let sale_off = <div/>;
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
        return (
            <div className="tapita-product-image"
                 style={{borderColor: this.configColor.image_border_color}}>
                <div style={{position:'absolute',top:0,bottom:0,width: '100%'}}>
                    {Identify.isClient() ?
                        <Img src={item.images[0].url} alt={item.name}/> : <img src={item.images[0].url} alt={item.name}/>}

                </div>
                {sale_off}
            </div>
        )
    }

    renderReview(item){
        if(item.app_reviews instanceof Object && item.app_reviews.hasOwnProperty('rate')){
            return (
                <div className="review-rate">
                    <Rate rate={item.app_reviews.rate}/>
                    <span className="review-count">
                        ({item.app_reviews.number} {(item.app_reviews.number)?Identify.__('Reviews'):Identify.__('Review')})
                    </span>
                </div>
            )
        }
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

        url_path = '/'+url_path
        Identify.setUrlMatchApi(url_path,'product_detail',{id:item.entity_id})
        let appreview = this.renderReview(item)
        let image = this.renderImg(item)
        return (
            <div className="product-item tapita-product-grid-item">
                <Link route={url_path}>
                    <a>
                        {this.props.lazyImage?
                            (<LazyLoad placeholder={<div className="tapita-product-image"/>}>
                                {image}
                            </LazyLoad>):
                            image
                        }
                    </a>

                </Link>
                <div className="tablet-product-des">
                    <div className="prices-layout" id={`price-${item.entity_id}`} onClick={()=>Router.pushRoute(url_path)}>
                        <Price config={1} prices={item.app_prices} type={item.type_id}/>
                    </div>
                    <div className="product-name small" onClick={()=>Router.pushRoute(url_path)}>{item.name}</div>
                    {appreview}
                    <ItemActionHoC item={item} url_path={url_path}/>
                </div>
            </div>
        );
    }

    componentDidMount(){
        const $ = window.$;
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
}

export default Griditem;
