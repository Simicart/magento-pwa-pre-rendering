import React from 'react'
import Identify from '../../../Helper/Identify';
import Model from '../../../Model';
import {Page404} from "../../Core/NotFound";
import Layout from '../../../Layout/Tapita'
import ProductDetail from '../Product/Detail'
const ApiModel = new Model();
let product_api = null;
class UrlMatch extends React.Component{

    static async getInitialProps(ctx){
        let query = ctx.query
        let component = 'home'
        if(query && query.hasOwnProperty('0')){
            let obj = Identify.getUrlMatchApi('/'+query[0])
            if(obj){
                component = obj.type
                if(component === 'product_detail'){
                    let api = `products/${obj.params.id}`
                    product_api = await ApiModel.getProductApi(api)
                    return {component,data:product_api}
                }
            }
        }else{
            return {component : '404',data : null}
        }
    }

    render(){
        const {component,data} = this.props;
        if(component === 'product_detail'){
            return <ProductDetail data={data}/>
        }
        return (
            <Layout>
                <Page404/>
            </Layout>
        )
    }
}
export default UrlMatch