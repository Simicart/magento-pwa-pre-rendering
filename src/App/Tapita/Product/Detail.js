/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 5:45 PM
 */
import React from 'react'
import Abstract from '../../Core/BaseAbstract'
import Layout from '../../../Layout'
import {layoutConfig} from "./etc/tapita_product_detail";
import './style.scss'
import Identify from '../../../Helper/Identify';
import ProductModel from '../../Core/Product/Model';
import CustomerHelper from '../../../Helper/Customer';
class Detail extends Abstract{

    renderLayoutSectionFromConfig(section = {}){
        return Object.keys(section).map(key => {
            let layout = section[key]
            if(layout.enable){
                const Component = layout.component
                let props = {
                    data : this.props.data
                }
                if(this.state.data instanceof Object && this.state.data.hasOwnProperty('product')){
                    props['data'] = this.state.data
                }
                if(layout.propsComponent instanceof Object){
                    props = {...props,...layout.propsComponent}
                }
                return <Component {...props} key={key}/>
            }
            return null
        },this)
    }

    componentDidMount(){
        if(this.props.cache_data){
            const productId = this.data.entity_id
            let api_cache = Identify.ApiDataStorage('product_detail_api') || {}
            if(api_cache.hasOwnProperty(productId)){
                this.setState({data:api_cache[productId]})
                return ;
            }
            const Model = new ProductModel({obj:this})
            let api = 'products/'+productId
            Model.getProductApi(api)
        } else if(
            this.data.app_reviews.hasOwnProperty('form_add_reviews') 
            && typeof this.data.app_reviews.form_add_reviews[0] === 'string'
            && (CustomerHelper.isLogin() || CustomerHelper.isAllowGuestAddReview())
        ) {
            const model = new ProductModel({obj:this})
            model.getProductApi(`products/${this.data.entity_id}`);
        }
    }

    processData(data){
        this.setState({data})
        let api_cache = Identify.ApiDataStorage('product_detail_api') || {}
        api_cache[this.data.entity_id] = data
        Identify.ApiDataStorage('product_detail_api','update',api_cache)
    }

    render() {
        this.data = this.props.data.product || {}
        if(this.state.data instanceof Object && this.state.data.hasOwnProperty('product')){
            this.data = this.state.data.product
        }
        let meta_header = {
            title : this.data.meta_title ? this.data.meta_title : this.data.name,
            description : this.data.meta_description ? this.data.meta_description : this.data.name,
            ogImage: (this.data.images && this.data.images.length > 0) ? this.data.images[0].url : this.SMCONFIGS.logo_url
        }
        return (
            <Layout server_render={true} header={meta_header}>
                <div className={`large-device product`}>
                    <div className="container">
                        <div className="top-section">
                            {this.renderLayoutSectionFromConfig(layoutConfig.top_section)}
                        </div>
                        <div className="row slide-02">
                            <div className="col-sm-5 col-md-5">
                                <div className="left-layout product-media">
                                    {this.renderLayoutSectionFromConfig(layoutConfig.content_left_section)}
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-sm-offset-1 col-md-offset-1">
                                <div className={`right-layout`}>
                                    {this.renderLayoutSectionFromConfig(layoutConfig.content_right_section)}
                                </div>
                            </div>
                        </div>
                        <div className="bottom-section">
                            {this.renderLayoutSectionFromConfig(layoutConfig.bottom_section)}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
export default Detail