
import React from "react";
import HomeAbstract from '../../Core/Home/HomeAbstract';
import Banner from "./Banner";
import Category from "./Category";
import ProductList from './ProductList';
import './style.css';
import Button from '@material-ui/core/Button'
import Model from '../../../Model'
class Home extends HomeAbstract{
    
    constructor(props){
        super(props)
        this.HomeModel = new Model({obj:this})
    }

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

    render(){
        this.metaHeader.title = 'Tapita Home'
        return super.render()
    }
}
export default Home