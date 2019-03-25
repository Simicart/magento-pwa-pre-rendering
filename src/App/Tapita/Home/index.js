
import React from "react";
import HomeAbstract from '../../Core/Home/HomeAbstract';
import Banner from "../../Core/Home/Banner";
import Category from "./Category";
import ProductList from './ProductList';
import './style.css';
import DefaultTheme from './Default'
class Home extends HomeAbstract{
    
    renderHomeContent() {
        if(this.props.home){
            return (
                <React.Fragment>
                    <Banner data={this.props.home.homebanners}/>
                    {/* <Button onClick={()=>this.HomeModel.connectWithUrl('/storeview/2')}>
                        Change Storeview
                    </Button> */}
                    <Category data={this.props.home.homecategories}/>
                    <ProductList data={this.props.home.homeproductlists}/>
                </React.Fragment>
            );
        }
        
    }

    renderTheme(){
        this.layout = 1;
        if(this.layout === 1){
            return <DefaultTheme/>
        }
    }

    render(){
        return super.render()
    }
}
export default Home