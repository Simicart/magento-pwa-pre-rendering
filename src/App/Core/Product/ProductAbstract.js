/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 5:40 PM
 */
import React from 'react'
import Abstract from '../BaseAbstract'
import Model from '../../../Model'

class ProductAbstract extends Abstract{

    static async getInitialProps(ctx) {
        let query = ctx.query
        let api = 'products/' + query.id
        const ProductModel = new Model();
        let data = await ProductModel.getProductApi(api)
        return {...data}
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.loaded !== this.state.loaded
    }

}
export default ProductAbstract