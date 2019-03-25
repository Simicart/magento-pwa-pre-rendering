/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 5:08 PM
 */
import React from 'react'
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
class Banner extends React.Component{

    renderBannerItem = data => {
        return(
            <div className="banner-item">
                <img src={data.banner_name} alt={data.title}/>
            </div>
        )
    }

    render() {
        const {data} = this.props;
        const bannerCount = data.homebanners.length;
        if(bannerCount < 1) return null;
        let slideSettings = {
            autoPlay: true,
            showArrows: false,
            showThumbs: false,
            showIndicators: (bannerCount && bannerCount !== 1)?true:false,
            showStatus: false,
            infiniteLoop: true,
            rtl: false,
            lazyLoad: true,
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