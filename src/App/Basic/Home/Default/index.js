import React from 'react'
import Base from '../../../Core/BaseAbstract'
import {HomeContext} from '../../../Core/Home/HomeAbstract'
import TapitaHomeCat from './../../../Tapita/Home/Default/HomeCate'
import {Link} from 'simiLink'
import Identify from '../../../../Helper/Identify';
import Url from '../../../../Helper/Url';
import Horizontal from '../../../Tapita/Products/Horizontal'
class DefaultBasic extends Base {
    
    renderViewAllButton = (productList, url, isTop = true) => {
        return (productList.product_array && productList.product_array.total && productList.product_array.total > 3)?
            <div  
                key={productList.productlist_id} 
                className={isTop?"default-productlist-link-basic":"default-productlist-bottom-link-basic"}
                style={{color: this.configColor.button_background}}
            >
                <Link
                    route="url_match"
                    params={url}
                >
                    <a>
                        {
                            isTop?
                            (Identify.__('View all')+ ' >>'):
                            Identify.__('View all') + ' ' + productList.list_title
                        }
                    </a>
                </Link>
            </div> : null
            
    }

    renderProductList = (data) => {
        if(data && data.homeproductlists instanceof Array && data.homeproductlists.length > 0){
            const products = data.homeproductlists.map(function(item){
                    const slug = '/'+Url.convertToSlug(item.list_title);
                    Identify.setUrlMatchApi(slug,'simi-product-lists',{id:item.item_id})
                    return (
                        <div key={item.productlist_id} className="default-productlist-tapita">
                            <div className="default-productlist-header-tapita">
                                <div className="default-productlist-name-tapita">{item.list_title}</div>
                                {this.renderViewAllButton(item, slug, true)}
                            </div>
                            {
                            item.product_array &&
                                <Horizontal static={true} homepage={true} product_home_data={item.product_array} />
                            }
                            {this.state.isPhone && this.renderViewAllButton(item, slug, false)}
                        </div>
                    );
                }, this);
            return products
        }
    }

    renderHomeCate = (data) => {
        if (data) {
            return (
                <div id="categories_home">
                    <div className="categories_home_label" style={{margin:10,fontSize:16}}>{Identify.__("Category").toUpperCase()}</div>
                    <div className="category-content">
                        <TapitaHomeCat data={data}/>
                    </div>
                </div>
            );
        }
    }

    render(){
        return(
            <HomeContext.Consumer>
                {home =>
                    <div>
                        {this.renderHomeCate(home.homecategories)}
                        {this.renderProductList(home.homeproductlists)}
                    </div>
                }
            </HomeContext.Consumer>
        )
    }
}
export default DefaultBasic