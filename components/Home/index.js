import React from "react";
import Layout from "../Layout";
import Banner from "./Banner";
import Category from "./Category";
import ProductList from './ProductList'
import fetch from "isomorphic-unfetch";
import './style.css'
import {Loading} from "../Loading";
/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 5:49 PM
 */
class Home extends React.Component{
    state = {data:null}
    static async getInitialProps(context) {
        console.log(context)
        const res = await fetch('https://cody.pwa-commerce.com/simiconnector/rest/v2/homes');
        const data = await res.json()
        return {...data}
    }


    render() {
        return (
            <Layout header={{
                title : 'Home'
            }}>
                <Banner data={this.props.home.homebanners}/>
                <Category data={this.props.home.homecategories}/>
                <ProductList data={this.props.home.homeproductlists}/>
            </Layout>
        );
    }
}
export default Home