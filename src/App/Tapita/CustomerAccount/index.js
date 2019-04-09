/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 1:43 PM
 */
import React from 'react'
import Abstract from '../../Core/BaseAbstract'
import Layout from '../../../Layout/Tapita'
import Login from './Login'
import './style.css'
import Register from './Register';
class CustomerAccount extends Abstract{
    state = {
        content: 'login'
    }

    showContent(content){
        this.setState({content})
    }

    renderDialogContent(){
        const {content} = this.state
        if(content === 'login'){
            return <Login parent={this}/>
        } else if(content === 'register'){
            return <Register parent={this}/>
        }
    }

    render(){
        return(
            <Layout>
                {this.renderDialogContent()}
            </Layout>
        )
    }
}
export default CustomerAccount