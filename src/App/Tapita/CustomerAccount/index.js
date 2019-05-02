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
import './style.scss';
import IconButton from '../../../BaseComponent/IconButton';
import NavigationRight from '../../../BaseComponent/Icon/ArrowRight';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import CreatePassword from './CreatePassword';
class CustomerAccount extends Abstract{

    constructor(props){
        super(props);
        this.state.content = 'login';
        this.token = false;
    }

    componentDidMount(){
        if(Identify.isClient()){
            if(window.location.pathname ==='/customer/account/register'){
                this.setState({content: 'register'})
            }else if(window.location.pathname ==='/customer/account/forgot-password'){
                this.setState({content: 'forgot'})
            }else if(window.location.pathname ==='/customer/account/create-password'){
                this.setState({content: 'create-password'})
                
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams && urlParams.get('token')) {
                    this.token = urlParams.get('token');
                }
            }
            
        }
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
        } else if(content === 'create-password'){
            return <CreatePassword parent={this} token={this.token} />
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
        else if (this.state.content === 'create-password')
            title = Identify.__('SET A NEW PASSWORD');
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