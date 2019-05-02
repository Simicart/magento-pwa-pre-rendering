/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 11:59 AM
 */
import React from 'react'
import Abstract from '../../Core/BaseAbstract'
import Identify from "../../../Helper/Identify";
import Button from '@material-ui/core/Button'
import CustomerModel from '../../Core/Customer/CustomerModel'
import CustomerHelper from "../../../Helper/Customer";
import { SubscribeOne } from 'unstated-x';
import { AppState } from '../../../Observer/AppState';
import CartModel from '../../Core/Cart/CartModel';
const configColor = Identify.getColorConfig()
class Login extends Abstract {

    constructor(props) {
        super(props);
        this.Model = new CustomerModel({ obj: this });
        this.cartModel = new CartModel({ obj: this })
        this.cart = false;
    }


    handleSubmitLogin = e => {
        e.preventDefault()
        if (!this.loginInputs)
            return;
        let reQ = false;
        let json = {};
        this.loginInputs.map((input) => {
            if (!input)
                return null
            let warning = document.getElementById(input.id + '-warning');
            if (!warning)
                return null
            let valid = false;
            if (input.value !== '' && input.value !== null) {
                if (input.name === 'email') {
                    if (!Identify.validateEmail(input.value)) {
                        warning.innerText = Identify.__('Check your email and try again');
                    } else
                        valid = true;
                } else
                    valid = true;
            }
            if (valid) {
                if (input.name === 'email')
                    this.email = input.value;
                else if (input.name === 'password')
                    this.password = input.value;
                json[input.name] = input.value;
                warning.style.display = 'none';
            } else {
                reQ = true;
                warning.style.display = 'block';
            }
            return null
        }, this
        );
        if (!reQ) {
            Identify.showLoading()
            this.Model.loginCustomer(json)
        };
    }

    requestGetCart = () => {
        this.cartModel.getCart()
        this.cart = true;
    }

    processData(data) {
        Identify.showLoading();
        if (this.cart) {
            this.props.updateCart(data);
            this.cart = false;
            this.pushLink('/')
            Identify.hideLoading();
        } else {
            if (data.message) {
                this.message = data.message;
            } else {
                this.message = Identify.__("Welcome %s, Start shopping now").replace('%s', data.customer.firstname);
            }
            data.customer.password = this.password
            CustomerHelper.setLogin(data.customer);
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'msg_login', this.message)
            this.requestGetCart();
        }
    };

    processError(data) {
        for(let i in this.loginInputs) {
            const input = this.loginInputs[i];
            if (input !== null && input.id === 'login-input-email') {
                input.focus();
            }
        }
    }

    render() {
        this.loginInputs = []
        return (
            <form className="login-dialog-content" action="POST" onSubmit={this.handleSubmitLogin}>
                <div className="form-field">
                    <div className="label">{Identify.__('Email')} <span style={{ color: 'red' }}>*</span></div>
                    <input type="email" name="email" id="login-input-email"
                        ref={(thisField) => { this.loginInputs.push(thisField) }} required/>
                    <div id="login-input-email-warning"
                        className="error-message">{Identify.__("This field is required")}</div>
                </div>
                <div className="form-field">
                    <div className="label">{Identify.__('Password')} <span style={{ color: 'red' }}>*</span></div>
                    <input type="password" name="password" id="login-input-password"
                        ref={(thisField) => { this.loginInputs.push(thisField) }} required/>
                    <div id="login-input-password-warning"
                        className="error-message">{Identify.__("This field is required")}</div>
                </div>
                <div className="customer-forgot"
                    style={{ color: configColor.button_background }}
                    onClick={(e) => { this.parent.showContent('forgot') }}>{Identify.__('Forgot Password')}</div>
                <Button className="login-btn"
                    type="submit"
                    style={{ backgroundColor: configColor.button_background, color: configColor.button_text_color }}>
                    {Identify.__('Sign In').toUpperCase()}
                </Button>
                <div className="create-account-btn"
                    style={{ color: configColor.button_background }}
                    onClick={(e) => { this.parent.showContent('register') }}>{Identify.__('Create an Account')}
                </div>
            </form>
        );
    }
}

const LoginState = props => (
    <SubscribeOne to={AppState} bind={['cart_data', 'wishlist_data']}>
        {app => <Login updateCart={(data) => app.updateCart(data)} {...props}/>}
    </SubscribeOne>
)
export default LoginState;