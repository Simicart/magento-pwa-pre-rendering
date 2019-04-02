/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 9:12 AM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'

class ProductName extends Abstract{
    render() {
        return (
            <div className="product-name" style={{color: this.configColor.content_color}}>
                {this.data.product.name}
            </div>
        );
    }
}
export default ProductName