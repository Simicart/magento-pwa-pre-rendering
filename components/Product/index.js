/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/1/19
 * Time: 4:54 PM
 */
/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/28/19
 * Time: 10:36 AM
 */
import React from 'react'
import Index from '../../src/Layout/index'
import fetch from "isomorphic-unfetch";
import {Loading} from "../../src/BaseComponent/Loading";
class Product extends React.Component {

    state = {
        data : null,
        loaded : false
    }

    setData(data){
        console.log(data)
        this.setState({
            data,loaded:true
        })
    }

    static async getInitialProps({req,query}) {
        let id = query.id
        const isServer = !!req
        console.log('getInitialProps called:', isServer ? 'server' : 'client')
        const res = await fetch('https://cody.pwa-commerce.com/simiconnector/rest/v2/products/'+id);
        const data = await res.json()
        return {...data}
    }

    renderContent = (data) => {
        if(!data) return <Loading/>
        return (
            <div className="product-detail container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="product-detail-img" style={{marginBottom:10}}>
                            <img className="img-fluid" style={{width:330,height:330,objectFit:'contain',border:'1px solid #eee'}} src={data.images[0].url} alt={data.name}/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="product-detail-info">
                            <div className="product-name" style={{fontSize:18,fontWeight:700}}>{data.name}</div>
                            <div className="product-sku">sku : {data.sku}</div> 
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="product-accordion" style={{marginTop:10}}>
                            <div id="description">
                                <div className="item-title" style={{fontSize:18,fontWeight:700}}>Description</div>
                                <div className="item-content">{data.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const data = this.props.product
        let header = {
            title : 'Product Detail'
        }
        if(data instanceof Object ){
            header['title'] = data.name
            header['description'] = data.description
        }
        // console.log(cache.get('merchant_config'))
        return (
            <Index header={header}>
                {this.renderContent(data)}
            </Index>
        );
    }
}
export default Product