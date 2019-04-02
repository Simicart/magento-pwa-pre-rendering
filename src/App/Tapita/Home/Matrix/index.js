/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 11:34 AM
 */
import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import {HomeContext} from "../../../Core/Home/HomeAbstract";
import Rows from './Rows'
import ProductList from './ProductList'
class MatrixTapita extends Abstract {

    render() {
        return (
            <HomeContext.Consumer>
                {data =>
                    <div>
                        <Rows data={data} hide_product_list={1}/>
                        <ProductList data={data.homeproductlists}/>
                    </div>
                }
            </HomeContext.Consumer>
        );
    }

    shouldComponentUpdate(nextProps,nextState){
        return false
    }
}
export default MatrixTapita;