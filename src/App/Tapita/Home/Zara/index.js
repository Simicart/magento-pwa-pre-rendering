/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 2:09 PM
 */
import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify'
import {
    Link
} from 'simiLink';
import Url from '../../../../Helper/Url';
import ArrowRight from '../../../../BaseComponent/Icon/ArrowRight';
import ArrowLeft from '../../../../BaseComponent/Icon/ArrowLeft';
import {HomeContext} from "../../../Core/Home/HomeAbstract";
import Img from '../../../../BaseComponent/Img'
import LazyLoad from 'react-lazyload';
import Placeholder from "../../../../BaseComponent/Placeholder";

const style_title = {
    position: 'absolute',
    top: '40%',
    'fontSize': '26px',
    width: '100%',
    'textAlign': 'center',
    zIndex: 1,
}
const style_span = {
    background: '#fff',
    color: '#000',
    opacity: '0.8',
}
class Zara extends Abstract {
    constructor(props) {
        super(props);
        this.state.width = '100%'
        this.merchant_config = Identify.getMerchantConfig();
        this.is_show_home_title = this.merchant_config && (this.merchant_config.storeview.base.is_show_home_title === '1');
        this.is_show_link_all_product = this.merchant_config.storeview.catalog.frontend.is_show_link_all_product;
    }

    componentDidMount(){
        this.setState({
            width:window.innerWidth
        })
    }

    analyticsTracking(item) {
        let name = ''
        if (item.simicategory_name)
            name = item.simicategory_name
        else if (item.list_title)
            name = item.list_title

        // Analytics.analyticsTracking(
        //     {
        //         mixpanel : true,
        //         ga : false
        //     },
        //     {
        //         action: `selected_home_zara_item`,
        //         title: name,
        //     }
        // )
    }

    renderLinkAllProduct(item) {
        let is_show_link_all_product = this.is_show_link_all_product;

        if (is_show_link_all_product === 1) {
            let url_path = item.url_path ? '/'+item.url_path : '/category/'+item.category_id
            return (
                <li key={Identify.makeid()}>
                    <Link  route={url_path}>
                        <a>
                            <div className="cate-item">
                                <span className="cate-name">All Products</span>
                                {this.state.isPhone && (Identify.isRtl()?
                                    <ArrowRight className="cate-row" color='#8a8a8a'/>:
                                    <ArrowLeft className="cate-row" color='#8a8a8a'/>)}
                            </div>
                        </a>
                    </Link>
                </li>
            );
        }
    }

    renderItemCate = (data) => {
        if (data) {
            let categories = data.map(function (item) {
                let path_name = item.request_path ? item.request_path : item.url_path
                path_name = '/' + path_name
                if (!path_name || path_name === '/')
                    path_name = `/category/${item.entity_id}`
                Identify.setUrlMatchApi(path_name,'category',{id:item.entity_id})
                return (
                    <li>
                        <Link key={Identify.makeid()} route={path_name}>
                            <a>
                                <div className="cate-item">
                                    <span className="cate-name">{item.name}</span>
                                    {this.state.isPhone && (Identify.isRtl()?
                                        <ArrowRight className="cate-row" color='#8a8a8a'/>:
                                        <ArrowLeft className="cate-row" color='#8a8a8a'/>)}
                                </div>
                            </a>
                        </Link>
                    </li>

                );
            }, this);
            return categories;
        }
        return '';
    };

    renderBanner(data){
        let rows = [];
        let count = data.length;
        const {width} = this.state;
        for (let i = 0; i < count; i++) {
            let item = data[i];
            let title = null;
            if (this.is_show_home_title) {
                title = <p className="title" style={style_title}><span style={style_span}>{item.banner_title}</span>
                </p>;
            }
            let content = (
                <div key={Identify.makeid()} className="zara-rows"
                     style={{position: 'relative', marginBottom: '2px'}}>
                    <div className="banner-item">
                        {title}
                        <LazyLoad throttle={200}
                                  width='100%'
                                  placeholder={<Placeholder/>}>
                            <Img width={width} alt={item.banner_title}
                                 src={item.banner_name}/>
                        </LazyLoad>
                    </div>
                </div>
            )
            if(parseInt(item.type, 10) === 1){
                let url_path = '/product/'+item.product_id
                content = (
                    <Link route={url_path} key={Identify.makeid()}>
                        <a>
                            {content}
                        </a>
                    </Link>
                )
            }else if(parseInt(item.type, 10) === 2){
                let url_path = '/category/'+item.category_id
                content = (
                    <Link route={url_path} key={Identify.makeid()}>
                        <a>
                            {content}
                        </a>
                    </Link>
                )
            }else{
                let url_path = item.banner_url
                content = (
                    <a href={url_path} target="_blank" key={Identify.makeid()}>
                        {content}
                    </a>
                )
            }
            rows.push(content);
        }
        return rows;
    }

    renderCate(data){
        let rows = [];
        let count = data.length;
        for (let i = 0; i < count; i++) {
            let item = data[i];
            let image_url = item.simicategory_filename_tablet;
            if (this.state.isPhone) {
                image_url = item.simicategory_filename;
            }
            if (!image_url || image_url === '')
                continue;

            let title = null;
            this.cate_id = item.category_id;
            if (this.is_show_home_title) {
                title = item.cat_name;
            }
            if (item.has_children) {
                rows.push(
                    <div
                        key={Identify.makeid()}
                        className="cate-parent"
                        id={`cate-id-${item.simicategory_id}`}
                        onClick={()=> this.analyticsTracking(item)}
                    >
                        <div className="cate-img" style={{
                            width: '100%',
                            marginRight: '1px',
                            position: 'relative',
                            marginBottom: '2px'
                        }} onClick={() => this.clickFunction(item)}>
                            <p className="title" style={style_title}><span style={style_span}>{title}</span></p>
                            <LazyLoad throttle={200}
                                      width='100%'
                                      placeholder={<Placeholder/>}>
                                <Img key={Identify.makeid()}
                                     width='100%' src={image_url}
                                     alt={title}/>
                            </LazyLoad>
                        </div>
                        <div className="cate-sub" style={{display: 'none', marginTop: '-2px'}}>
                            <ul id="categories">
                                {this.renderLinkAllProduct(item)}
                                {this.renderItemCate(item.children)}
                            </ul>
                        </div>
                    </div>
                );
            } else {
                let url_path = item.url_path ?'/'+item.url_path : '/category/'+item.category_id
                Identify.setUrlMatchApi(url_path,'category',{id:item.category_id})
                rows.push(
                    <div key={Identify.makeid()} onClick={()=> this.analyticsTracking(item)}>
                        <Link route={url_path}>
                            <a>
                                <div style={{
                                    width: '100%',
                                    marginRight: '1px',
                                    marginBottom: '2px',
                                    position: 'relative'
                                }}>
                                    <p className="title" style={style_title}>
                                        <span style={style_span}>{title}</span>
                                    </p>
                                    <LazyLoad throttle={200}
                                              width='100%'
                                              placeholder={<Placeholder/>}>
                                        <Img width='100%' src={item.simicategory_filename} alt={item.cat_name}/>
                                    </LazyLoad>
                                </div>
                            </a>

                        </Link>
                    </div>
                );
            }
        }

        return rows;
    }

    renderProductlist(data){
        let rows = [];
        let count = data.length;
        for (let i = 0; i < count; i++) {
            let item = data[i];

            let image_url = item.list_image_tablet;
            if (this.state.isPhone) {
                image_url = item.list_image;
            }
            if (!image_url || image_url === '')
                continue;

            let title = null;
            let url_path = '/'+Url.convertToSlug(item.list_title);
            if (this.is_show_home_title) {
                title = item.list_title;
            }
            Identify.setUrlMatchApi(url_path,'simi-product-lists',{id:item.item_id})
            rows.push(
                <Link key={Identify.makeid()} route={url_path}>
                    <a>
                        <div style={{
                            width: '100%',
                            marginRight: '1px',
                            position: 'relative',
                            marginBottom: '2px'
                        }}>
                            <p className="title" style={style_title}>
                                <span style={style_span}>{title}</span>
                            </p>
                            <LazyLoad throttle={200}
                                      width='100%'
                                      placeholder={<Placeholder/>}>
                                <Img key={Identify.makeid()} width="100%" src={image_url} alt={title}/>
                            </LazyLoad>
                        </div>
                    </a>
                </Link>
            );
        }
        return rows;
    }


    clickFunction = (item) => {
        const $ = window.$;
        if (!this.sliding) {
            this.sliding = true;
            let cate_parent = $('#cate-id-' + item.simicategory_id + '');
            $(cate_parent).children('.cate-sub').slideToggle(250, () => {
                this.sliding = false;
            });
            let firstCateSub = $(cate_parent).children('.cate-sub')[0];
            $('html, body').animate({
                scrollTop: $(firstCateSub).offset().top-200
            }, 500);
        }
    }
    render() {
        return (
            <HomeContext.Consumer>
                {data =>
                    <div className="zara-home-tapita">
                        {this.renderBanner(data.homebanners.homebanners)}
                        {this.renderCate(data.homecategories.homecategories)}
                        {this.renderProductlist(data.homeproductlists.homeproductlists)}
                    </div>
                }
            </HomeContext.Consumer>

        );
    }
}
export default Zara;
