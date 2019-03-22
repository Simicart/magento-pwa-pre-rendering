
import React from "react";
import HomeAbstract from '../../Core/Home/HomeAbstract';
import Banner from "./Banner";
import Category from "./Category";
import ProductList from './ProductList';
import './style.css';
/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 5:49 PM
 */
class Home extends HomeAbstract{
    
    renderHomeContent() {
        if(this.props.home){
            return (
                <React.Fragment>
                    <Banner data={this.props.home.homebanners}/>
                    <Category data={this.props.home.homecategories}/>
                    <ProductList data={this.props.home.homeproductlists}/>
                </React.Fragment>
            );
        }
        
    }

    render(){
        this.metaHeader.title = 'Tapita Home'
        return super.render()
    }
}
export default Home