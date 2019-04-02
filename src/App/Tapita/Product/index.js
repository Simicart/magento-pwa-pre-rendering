/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 5:46 PM
 */
import React from 'react'
import ProductAbstract from '../../Core/Product/ProductAbstract'
import Detail from './Detail'
class Product extends ProductAbstract{

    renderProductDetail(data){
        return <Detail data={data}/>
    }

    render(){
        const {product} = this.props;
        return (
            <div className='product-detail-page'>
                {this.renderProductDetail(product)}
            </div>
        )
    }
}
export default Product