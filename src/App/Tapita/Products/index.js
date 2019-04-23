/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/19/19
 * Time: 4:18 PM
 */
import React from 'react'
import ProductListAbstract from '../../Core/Products/ProductListAbstract'
import Layout from '../../../Layout/'
import ListHeader from './List/ListHeader'
class ProductList extends ProductListAbstract{

    render() {
        return (
            <Layout server_render={true} header={this.getMetaHeader()}>
                <ListHeader {...this.props} currentCate={this.cateData} catePath={this.catePath}/>
                Tapita Product List
            </Layout>
        );
    }
}
export default ProductList