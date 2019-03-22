import React from 'react'
import Identify from '../../../Helper/Identify';
import Home from '../Home'
import Model from '../../../Model';

const ApiModel = new Model();
class UrlMatch extends React.Component{

    static async getInitialProps(ctx){
        let query = ctx.query
        let component = 'home'
        let data = null;
        if(query.url){
            let obj = Identify.getUrlMatchApi(query.url)
            if(obj){
                component = obj.type
                if(component === 'product_detail'){
                    let api = `products/${obj.params.id}`
                    data = await ApiModel.connect(api)
                    return {component,data}
                }
            }
        }else{
            let api = 'homes';
            data = await ApiModel.connect(api)
            return {component,data}
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