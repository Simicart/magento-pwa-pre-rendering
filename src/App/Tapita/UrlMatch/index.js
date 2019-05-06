import React from 'react'
import Identify from '../../../Helper/Identify';
import Model from '../../../Model';
import CmsModel from '../../Core/CmsPage/CmsModel';
import {Page404} from "../../Core/NotFound";
import Layout from '../../../Layout/'
import ProductDetail from '../Product/Detail'
import CmsContent from '../CmsPage/CmsContent';
import ProductList from '../Products'
const ApiModel = new Model();
let product_api = null;
let catetrees = null
class UrlMatch extends React.Component{

    static async getInitialProps(ctx){
        let query = ctx.query
        let component = 'home'
        if(query && query.hasOwnProperty('0')){
            let obj = Identify.getUrlMatchApi('/'+query[0])
            if(obj){
                // for url match
                component = obj.type
                if(component === 'product_detail'){
                    if(Identify.isClient()){
                        product_api = {product : obj.params.data}
                        return {component,data:product_api,cache_data:true}
                    }
                    let api = `products/${obj.params.id}`
                    product_api = await ApiModel.getProductApi(api)
                    return {component,data:product_api}
                } else if(component === 'category'){
                    let api = 'categorytrees'
                    let cateId = obj.params.id
                    catetrees = await ApiModel.connect(api)
                    return {component,data : catetrees,cateId}
                }
                else if (component === 'cms_page') {
                    const cmsModel = new CmsModel();
                    const cmsData = await cmsModel.getCmsPage(obj.params.id);
                    return { component, data: cmsData}
                } else if(component === 'simi-product-lists') {
                    const api = `homeproductlists/${obj.params.id}`;
                    const params = {
                        image_height: 180,
                        image_width: 180,
                        limit: 12,
                        offset: 0
                    };
                    const homeProductList = await ApiModel.connect(api, params);
                    return { component, data: homeProductList.homeproductlist, cateId: obj.params.id }
                }
            }else{
                // for urldicts
                let api = `urldicts/detail?url=${query[0]}`
                let data = await ApiModel.connect(api)
                if(data.urldict &&
                    data.urldict.hasOwnProperty('category_id')
                    && data.urldict.hasOwnProperty('simi_category_products'))
                {
                    catetrees = await ApiModel.connect('categorytrees')
                    return {
                        component : 'category',
                        cateId : data.urldict.category_id,
                        list_products : data.urldict.simi_category_products,
                        data : catetrees
                    }
                }
                if(data.urldict
                    && data.urldict.hasOwnProperty('product_id')
                    && data.urldict.hasOwnProperty('simi_product_data'))
                {
                    return {
                        component : 'product_detail',
                        data : data.urldict.simi_product_data
                    }
                }
            }
        }else{
            return {component : '404',data : null}
        }
    }

    render(){
        const {component,data} = this.props;
        if(component === 'product_detail'){
            return <ProductDetail data={data} cache_data={this.props.cache_data}/>
        } else if(component === 'category' || component === 'simi-product-lists' ){
            return <ProductList catetrees={data}
                                cateId={this.props.cateId}
                                list_products={this.props.list_products}
                                page_type={component}/>
        } 
        else if(component === 'cms_page') {
            return <CmsContent data={data} />
        }
        return (
            <Layout>
                <Page404/>
            </Layout>
        )
    }
}
export default UrlMatch