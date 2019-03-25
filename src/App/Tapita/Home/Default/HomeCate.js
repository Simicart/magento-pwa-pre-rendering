import React from 'react';
import Abstract from '../../../Core/BaseAbstract'
import Identify from '../../../../Helper/Identify';

import {Carousel} from 'react-responsive-carousel';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Img from '../../../../BaseComponent/Img'
import {Link} from 'simiLink';

class TapitaHomeCat extends Abstract {
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{currentValue: 1, step: 1}};
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     return false;
    // }
    
    renderCategoriesCarousel(data) {
        let categories = [];
        let renderedCategories = [];
        for (var i = 0; i < data.length; i++) {
            renderedCategories.push(
                <div style={{marginTop: '18px', display: 'inline-block'}} key={i}>
                    {this.renderCategoryItem(data[i])}
                </div>
            );
            if ((i%6 === 5) || (i===(data.length-1))) {
                if (renderedCategories.length%2 !== 0)
                    renderedCategories.push(<div key={Identify.makeid()} style={{width: 130}}></div>);
                
                const categoryContainer = <div className="home-category-container" key={i}>
                    {renderedCategories}
                </div>;
                if(Identify.isRtl())
                    categories.unshift(categoryContainer)
                else 
                    categories.push(categoryContainer);
                renderedCategories = [];
            }
        }

        let slideSettings = {
            autoPlay: false,
            showArrows: true,
            showThumbs: false,
            showIndicators: false,
            showStatus: false,
            infiniteLoop: true,
            lazyLoad: true,
            stopOnHover: true,
            swipeScrollTolerance: 100
        };
        if (Identify.isRtl() && categories.length > 0)
            slideSettings.selectedItem = categories.length - 1;
        return (
            <div style={{maxWidth: "1024px", margin:"10px auto"}}>
                <Carousel {...slideSettings} className="default-home-cat-carousel">
                    {categories}
                </Carousel>
            </div>
        );
    }

    renderCategoriesGrid(data) {
        const items = data.map((item) => {
                return (
                    <div className="home-category-container" key={item.simicategory_id}>
                        {this.renderCategoryItem(item, item.simicategory_id)}
                    </div>
                )
            }
        )
        return (
            <div className="default-home-category-grid">
                {items}
            </div>
        )
    }
    
    renderCategoryItem = (item) =>{
        const w = 230
        return (
            <Link route="product_list">
                <a>
                    <div className="category-item" style={{maxWidth: w}}>
                        <div className="category-image" style={{borderColor: this.configColor.image_border_color, margin:"0 auto", width:w, height:w,overflow : 'hidden'}}>
                            {Identify.isClient() ? 
                                <Img 
                                    alt={item.simicategory_name} 
                                    width={w}
                                    height={w}
                                    src={this.state.isPhone?item.simicategory_filename:item.simicategory_filename_tablet}/>
                                 : <img 
                                    alt={item.simicategory_name} 
                                    width={w}
                                    height={w}
                                    src={this.state.isPhone?item.simicategory_filename:item.simicategory_filename_tablet}/>
                            }
                            
                        </div>
                        <div className="category-des" style={{color: this.configColor.content_color}}>
                            <div className="category-name"
                                style={{
                                    color: this.configColor.content_color
                                }}>{item.cat_name}</div>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }

    render() {
        if (!this.props.data || !this.props.data.homecategories || this.props.data.homecategories.length === 0)
            return ''

        //sort categories
        const data = this.props.data.homecategories;
        data.sort(function(a,b){
            return parseInt(a.sort_order - b.sort_order, 10);
        });

        //render on phone
        // if (this.state.isPhone) {
        //     return this.renderCategoriesGrid(data)    
        // }

        //carousel on desktop
        return this.renderCategoriesCarousel(data)
    }
}
export default TapitaHomeCat;
