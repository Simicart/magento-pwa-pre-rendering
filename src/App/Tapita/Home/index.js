
import React from "react";
import HomeAbstract from '../../Core/Home/HomeAbstract';
import DefaultTheme from './Default'
import MatrixTheme from './Matrix'
import ZaraTheme from './Zara'
import Layout from '../../../Layout/'
import './style.scss';
class Home extends HomeAbstract{

    renderTheme(){
        if(this.layout === 1){
            return <DefaultTheme/>
        }else if(this.layout === 2){
            return <MatrixTheme/>
        }else{
            return <ZaraTheme/>
        }
    }

    renderLayout(component){
        return(
            <Layout header={this.metaHeader} server_render={true}>
                {component}
            </Layout>
        )
    }

    render(){
        return super.render()
    }
}
export default Home