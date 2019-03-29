/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 5:56 PM
 */
import React from 'react'
// import Link from 'next/link'
import {Link} from 'simiLink'
import Identify from '../../../Helper/Identify';
class ProductList extends React.Component{

    renderListProduct = data => {
        let products = data.products.map(item => {
            let img = item.images[0].url;
            Identify.setUrlMatchApi(item.url_path,'product_detail',{id : item.entity_id});
            return(
                <div className="product-item" key={item.entity_id}>
                    <Link route={'url_match'} params={{url:item.url_path}}>
                        <a>
                            <div>
                                <div className="product-img">
                                    <img src={img} alt={item.name}/>
                                </div>
                                <div className="product-info">
                                    <div className="product-name">{item.name}</div>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            )
        },this)
        return (
            <div className="product-list-content">
                {products}
            </div>
        )
    }

    render() {
        const {data} = this.props
        let productList = data.homeproductlists.map(item => {
            if(item.product_array.length < 1) return null;
            return (
                <div key={item.productlist_id} className="default-productlist-tapita">
                    <div className="default-productlist-header flex" style={{margin:10}}>
                        <div className="default-productlist-name">{item.list_title}</div>
                    </div>
                    {
                        this.renderListProduct(item.product_array)
                    }
                </div>
            );
        },this)
        return (
            <div className="home-productlist">
                {productList}
            </div>
        );
    }
}
export default ProductList