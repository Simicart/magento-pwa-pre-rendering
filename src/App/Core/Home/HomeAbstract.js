import React from 'react'
import BaseAbstract from '../BaseAbstract'
import Model from '../../../Model'
import Layout from '../../../Layout/Layout'

const HomeModel = new Model();
class HomeAbstract extends BaseAbstract{

    static async getInitialProps(ctx) {
        console.log(ctx)
        const res = await HomeModel.connect('homes');
        return {...res}
    }

    constructor(props){
        super(props)
        this.metaHeader = {
            title : 'Home'
        }
    }

    renderHomeContent(){}

    render(){
        return (
            <Layout header={this.metaHeader} server_render={true}>
                {this.renderHomeContent()}
            </Layout>
        );
    }
}
export default HomeAbstract