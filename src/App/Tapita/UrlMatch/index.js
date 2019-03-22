import React from 'react'
import Identify from '../../../Helper/Identify';
import Home from '../Home'
import Model from '../../../Model';

const ApiModel = new Model();
let home_api = null;
let product_api = null;
class UrlMatch extends React.Component{

    static async getInitialProps(ctx){
        let query = ctx.query
        let component = 'home'
        if(query.url){
            let obj = Identify.getUrlMatchApi(query.url)
            if(obj){
                component = obj.type
                if(component === 'product_detail'){
                    let api = `products/${obj.params.id}`
                    product_api = await ApiModel.connect(api)
                    return {component,data:product_api}
                }
            }
        }else{
            let api = 'homes';
            if(!home_api)
                home_api = await ApiModel.connect(api)
            return {component,data : home_api}
        }
    }

    render(){
        const {component,data} = this.props;
        if(component === 'home'){
            return <Home home={data.home}/>
        }else if(component === 'product_detail'){
            return <div>Product Detail</div>
        }
        return null
    }
}
export default UrlMatch