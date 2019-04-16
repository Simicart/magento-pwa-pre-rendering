/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/1/19
 * Time: 5:03 PM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Identify from "../../../../Helper/Identify";

class ProductPath extends Abstract{
    render(){
        this.product = this.props.data.product || {}
        return (
            <div className="row top-header">
                <div className="col-sm-12">
                    <div className="product-path" id="product-path" style={{display : 'flex'}}>
                        <div onClick={()=>this.pushLink('/')}>{Identify.__('Home')} </div> <div style={{margin : '0 5px'}}>|</div> <div> {this.product.name}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductPath