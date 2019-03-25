import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Loading from '../../../../BaseComponent/Loading';
import Identify from '../../../../Helper/Identify';
import CarouselProduct from "./Carousel";
import {WIDTH_IMAGE, HEIGHT_IMAGE, LIMIT, OFFSET} from '../../../../Helper/Constants';
import Model from '../../../../Model'
import './horizontal.css';
import {GridItemHoc} from "./HoC";



class Horizontal extends Abstract {
    
    constructor(props){
        super(props);
        if (this.props.static) {
            this.state = {...this.state, ...{loaded: true, data: null}};
        } else {
            this.state = {...this.state, ...{loaded: false, data: null}};
        }
        this.cateId = -1;
        if (this.props.cat_id) {
            this.cateId = this.props.cat_id;
        }

        this.related_id = 0;
        if (this.props.related_id) {
            this.related_id = this.props.related_id;
        }

        this.parentObject = this.props.obj;
        
        this.showTitle = this.props.showTitle || false;
        this.titleClassName = this.props.titleClassName || '';
        this.title = this.props.title || '';
    }

    componentDidMount() {
        if (this.related_id !== 0) {
            if (!this.productModelCollection)
                this.productModelCollection = new Model({obj: this});
            if (!this.state.loaded) {
                let jQuery = {image_height: HEIGHT_IMAGE, image_width: WIDTH_IMAGE, limit: LIMIT, offset: OFFSET};
                if (this.cateId !== -1) {
                    jQuery['filter[cat_id]'] = this.cateId;
                }
                if (this.related_id !== 0) {
                    jQuery['filter[related_to_id]'] = this.related_id;
                }
                this.productModelCollection.getCollection(jQuery);
            }
        }
    }
    
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.loaded !== nextState.loaded){
            return true
        }
        return false
    }

    setData(data) {
        this.setState({data: data});
        if (this.related_id === 0) {
            this.props.storeData({key: this.cateId, products: data});
        }

    }

    renderRows() {
        let data = null;
        if (this.props.static)
            data = this.props.product_home_data;
        else
            data = this.state.data;
        return (
            <div style={{width: "100%", margin:"10px auto 0 auto"}}>
                {this.state.isPhone ?
                    this.renderProductGrid(data.products):
                    this.renderProductsCarousel(data.products)
                }
            </div>);
    }
    
    renderProductsCarousel(data) {
        return <CarouselProduct className="default-home-productlist-carousel" data={data} parent={this}/>
    }
    
    renderProductGrid(data) {
        let products = data.map((item, index) => {
            if (this.props.homepage && index > 7)
                return ''
            return this.renderProductItem(item, '50%')
        })
        return (
            <div style={{
                    width: '100%', 
                    flexWrap: 'wrap', 
                    display: 'flex', 
                    direction: Identify.isRtl()?'rtl':'ltr'
                }} className="list-wrap">
                {products}
            </div>
        )
    }

    renderProductItem(item,w = '50%') {
        return (
            <div 
            key={`horizontal-tablet-item-${item.entity_id}`} 
            style={{width: w, display: 'inline-block', minWidth:160}}>
                <GridItemHoc
                    item={item} 
                    lazyImage={this.state.isPhone}
                />
            </div>
        );
    }

    renderTitle = () => {
        let data = null;
        if (this.props.static) {
            data = this.props.product_home_data;
        } else {
            data = this.state.data;
        }
        if(this.showTitle && this.title !=='' && data.products.length > 0){
            return(
                <div className={this.titleClassName}>
                    <span>{this.title}</span>
                </div>
            );
        }
    };

    render() {
        if (!this.state.loaded) {
            return (<Loading className="loading"/>);
        }

        let data = null;
        if (this.props.static) {
            data = this.props.product_home_data;
        } else {
            data = this.state.data;
        }
        return (
            <div className="product-list">
                {this.renderTitle()}
                <div className="product-horizotal">
                    {this.renderRows()}
                </div>
            </div>

        );
    }
}

export default Horizontal;

