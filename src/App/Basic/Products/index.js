import React from 'react'
import ProductListAbstract from '../../Core/Products/ProductListAbstract'
import Layout from '../../../Layout/'
import Loading from '../../../BaseComponent/Loading'
import ListHeader from '../../Tapita/Products/List/ListHeader'
import ListBasic from './list'

class ProductList extends ProductListAbstract {
    render() {
        const {loaded, data} = this.state;
        const {catetrees,cateId} = this.props;
        this.getCateData(catetrees.categorytrees,cateId)
        return (
            <Layout server_render={true} header={this.getMetaHeader()}>
                <ListHeader {...this.props} currentCate={this.cateData} catePath={this.catePath}/>
                {data && loaded ? <ListBasic data={data} currentCate={this.cateData} parent={this}/> : <Loading/>}
            </Layout>
        );
    }
}
export default ProductList