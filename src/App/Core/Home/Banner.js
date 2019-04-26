/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 5:08 PM
 */
import React from 'react'
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LazyLoad from 'react-lazyload';
import Identify from '../../../Helper/Identify';
import Router from 'next/router'

class Banner extends React.Component{

    renderBannerItem = data => {
        const {isPhone} = this.props;
        let location_dest = null;
        let item_type = parseInt(data.type, 10);
        if(item_type === 1){
            location_dest = `/product/${data.product_id}`;
        }else if(item_type === 2){
            location_dest = `/products?cat=${data.category_id}`;
        }else{
            location_dest = data.banner_url;
        }

        return(
            <div className="banner-item" onClick={() => this.redirectTo(item_type, location_dest)}>
                <LazyLoad key={Identify.makeid()}
                                offset={200}
                                once={true}
                                placeholder={<div style={{width: "100%"}}/>}>
                    {isPhone && data.banner_name_tablet ? <img src={data.banner_name_tablet} alt={data.title}/> : <img src={data.banner_name} alt={data.title}/>}
                </LazyLoad>
            </div>
        )
    }

    redirectTo = (type, dest) => {
        if(!dest){
            return;
        }
        if(type === 3){
            if(dest.includes('http')){
                window.location.replace(dest)
            }else if(dest.length > 0){
                if(dest.charAt(0) !== '/'){
                    Router.push(`/${dest}`);
                }else{
                    Router.push(dest)
                }
            }else{
                Router.push(dest)
            }
        }else{
            Router.push(dest)
        }
    }

    render() {
        const {data} = this.props;
        const bannerCount = data.homebanners.length;
        if(bannerCount < 1) return null;
        let slideSettings = {
            autoPlay: true,
            showArrows: false,
            showThumbs: false,
            showIndicators: bannerCount && bannerCount !== 1,
            showStatus: false,
            infiniteLoop: true,
            rtl: false,
            lazyLoad: true,
            dynamicHeight : true
        };
        let banner = data.homebanners.map((item,key)=>{
            return (
                <div key={key}>
                    {this.renderBannerItem(item)}
                </div>
            )
        },this)
        return (
            <div className="banner-homepage">
                <Carousel {...slideSettings}>
                    {banner}
                </Carousel>
            </div>
        );
    }
}
export default Banner