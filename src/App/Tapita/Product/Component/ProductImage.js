import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import Identify from "../../../../Helper/Identify";
// import Analytics from "../../../../Helper/Analytics";
import ImageLightbox from "./ImageLightbox";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class ProductImage extends React.Component {
    prepareData() {
        this.images = this.props.data.product.images || [];
        this.title = this.props.title || 'Alt';
        this.showThumbs = this.props.showThumbs || false;
        this.showArrows = this.props.showArrows || true;
        this.showIndicators = this.props.showIndicators || false;
        this.autoPlay = this.props.autoPlay || true;
        this.showStatus = this.props.showStatus || true;
        this.itemClick = this.props.itemClick || function (e) {
        };
        this.onChange = this.props.onChange || function (e) {
        };
        this.onClickThumb = this.props.onClickThumb || function (e) {
        };
        this.defaultStatusFormatter = function defaultStatusFormatter(current, total) {
            return Identify.__('%c of %t').replace('%c', current).replace('%t', total);
        };
        this.statusFormatter = this.props.statusFormatter || this.defaultStatusFormatter;
        this.infiniteLoop = this.props.infiniteLoop || false;
    }

    openImageLightbox = (index) => {
        this.lightbox.showLightbox(index);
        Analytics.analyticsTracking(
            {
                mixpanel : true,
                ga : false
            }, 
            {
                action: 'showed_images_screen',
                product_name: this.props.title,
            }
        )
    }

    renderImageLighboxBlock = () => {
        let images = this.images.sort((a, b) => {
            return parseInt(a.position,10) > parseInt(b.position,10) ? 1 : parseInt(b.position,10) > parseInt(a.position,10) ? -1 : 0;
        })
        images = images.map((item) => {
            return item.url;
        });
        return (
            <ImageLightbox ref={(lightbox) => {
                this.lightbox = lightbox
            }} images={images}/>
        );
    }

    renderImage() {
        // let width = $('.left-layout.product-media').width();
        return this.images.map(function (item) {
            return (
                <div key={Identify.makeid()} style={{cursor: 'pointer', backgroundColor: '#ffffff'}} className="carousel-img-item">
                    <img src={item.url} alt={item.url}
                         style={{objectFit: 'scale-down'}}
                    />
                </div>
            );
        })
    }

    onChangeItemDefault = (e) => {
        console.log('Onchange');
    }

    onClickThumbDefault = (e) => {
        console.log('Click Thumb');
    }

    componentDidMount(){
        const $ = window.$
        let carousel = $('.carousel.carousel-slider');
        let mediaWidth = carousel.width();
        carousel.css('max-height',mediaWidth);
        $('.carousel.carousel-slider img').css('max-height',mediaWidth);
    }

    componentDidUpdate(){
        const $ = window.$
        let carousel = $('.carousel.carousel-slider');
        let mediaWidth = carousel.width();
        carousel.height(mediaWidth);
        $('.carousel.carousel-slider img').height(mediaWidth);
    }

    render() {
        this.prepareData()
        const images = this.renderImage()
        return (
            <div>
                <Carousel 
                    key={Identify.makeid()} //to update while needed
                    showArrows={this.showArrows}
                    showThumbs={this.showThumbs}
                    showIndicators={this.showIndicators||false}
                    showStatus={this.showStatus}
                    onClickItem={(e) => this.openImageLightbox(e)}
                    onClickThumb={(e) => this.onClickThumbDefault}
                    onChange={(e) => this.onChangeItemDefault}
                    infiniteLoop={true}
                    autoPlay={this.autoPlay}
                    thumbWidth={80}
                    statusFormatter={this.statusFormatter}
                >
                    {images}
                </Carousel>
                {this.renderImageLighboxBlock()}
            </div>

        );
    }
}

export default ProductImage;