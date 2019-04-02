/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 9:49 AM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Identify from "../../../../Helper/Identify";

class ProductSkuStock extends Abstract{

    render(){
        this.data = this.data.product
        let stockLabel = Identify.__('In stock');
        if (parseInt(this.data.is_salable, 10) !== 1) {
            stockLabel = Identify.__('Out of stock');
        }
        return (
            <div className="product-stock-status">
                <div className="stock-status">
                    {stockLabel}
                </div>
                {
                    this.data.sku &&
                    <div className="product-sku flex" id="product-sku">
                        <span className="sku-label">{Identify.__('Sku') + ": "}</span>
                        {this.data.sku}
                    </div>
                }
            </div>
        )
    }
}
export default ProductSkuStock