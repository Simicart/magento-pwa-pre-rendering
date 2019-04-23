/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 1:43 PM
 */
import React from 'react'
import Abstract from '../../Core/BaseAbstract'
import Layout from '../../../Layout';
import Identify from '../../../Helper/Identify';
import Login from './Login'
import './style.css';
import IconButton from '../../../BaseComponent/IconButton';
import NavigationRight from '../../../BaseComponent/Icon/ArrowRight';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
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
        } else if(content === 'forgot'){
            return <ForgotPassword parent={this}/>
        }
    }

    backToLogin = () => {
        this.setState({content: 'login'})
    }

    renderDialogHeader = () => {
        let title = '';
        let backButton = true;
        if (this.state.content === 'forgot')
            title = Identify.__('Forgot Password');
        else if (this.state.content === 'register')
            title = Identify.__('Create an Account');
        else {
            title = Identify.__('Login');
            backButton = false;
        }
        backButton = backButton
            ?
            <IconButton style={{height : 45, marginTop: -8, paddingTop: 8, paddingBottom: 8}}
                        onClick={this.backToLogin}>
                <NavigationRight style={{width : 30,height : 30}}/>
            </IconButton>
            :'';
        return (
            <div className="dialog-header">
                <div style={{display: 'flex',
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            alignItems:'center',
                            padding: '20px 10px'}}>
                    {backButton}
                    <div className="dialog-title" style={{paddingBottom: "8px"}}>{title.toUpperCase()}</div>
                </div>
            </div>
        );
    }

    render(){
        return(
            <Layout>
                {this.renderDialogHeader()}{this.renderDialogContent()}
            </Layout>
        )
    }
}
export default CustomerAccount