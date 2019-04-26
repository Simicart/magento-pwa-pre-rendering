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
import ListItem from './List/index'
import Loading from '../../../BaseComponent/Loading'
class ProductList extends ProductListAbstract{

    render() {
        const {loaded,data} = this.state;
        const {catetrees,cateId} = this.props;
        this.getCateData(catetrees.categorytrees,cateId)
        return (
            <Layout server_render={true} header={this.getMetaHeader()}>
                <ListHeader {...this.props} currentCate={this.cateData} catePath={this.catePath}/>
                {data && loaded ? <ListItem data={data} currentCate={this.cateData} parent={this}/> : <Loading/>}
            </Layout>
        );
    }
}
export default ProductList