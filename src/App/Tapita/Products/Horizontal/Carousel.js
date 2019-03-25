import React from 'react'
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Base from '../../../../../../magento-pwa1/src/BaseComponent/ViewComponent';
import Identify from '../../../../../../magento-pwa1/src/Helper/Identify'

class CarouselProduct extends Base{

    constructor(props){
        super(props)
        this.SlideToShow = 3;
        this.state = {
            ...this.state,
            ...{ width : window.innerWidth }
        }
    }

    componentDidMount(){
        let obj = this;
        const $ = window.$;
        $(window).resize(function () {
            let w = $(this).width();
            obj.setState({width: w})
        })
    }

    renderCarousel = (data=this.props.data) =>{
        let slideSettings = {
            autoPlay: false,
            showArrows: true,
            showThumbs: false,
            showIndicators: false,
            showStatus: false,
            infiniteLoop: true,
            lazyLoad: true
        };
        let width = this.state.width;
        if(width < 768) {
            this.SlideToShow = 2;
        }else if(width >= 768 && width < 1024){
            this.SlideToShow = 3;
        }else if(width >= 1024 && width < 1440){
            this.SlideToShow = 4;
        }else if(width >= 1440){
            this.SlideToShow = 5;
        }
        let totalItem = data.length;
        let totalSlide = Math.ceil(totalItem/this.SlideToShow);
        let slides = [];
        let w = 100/this.SlideToShow + '%';
        for (let i = 0 ; i < totalSlide ; i++){
            let start = this.SlideToShow*i;
            let end = this.SlideToShow * (i+1);
            let items = data.slice(start,end).map((item,key) => {
                return this.props.parent.renderProductItem(item,w)
            });
            let slide = <div className="product-container" style={{display: 'flex'}} key={Identify.makeid()}>
                        {items}
                    </div>;
            Identify.isRtl() ?  slides.unshift(slide) : slides.push(slide);
        }
        return (
            <Carousel {...slideSettings} selectedItem={Identify.isRtl() ? totalSlide-1 : 0} className={this.props.className}>
                {slides}
            </Carousel>
        )
    }

    render(){
        if (!this.props.data)
            return ''
        return (
            <div>
                {this.props.data && this.renderCarousel()}
            </div>
        )
    }
}
export default CarouselProduct