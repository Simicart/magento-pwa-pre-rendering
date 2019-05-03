import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Identify from "../../../../Helper/Identify";
import CustomerModel from '../../../Core/Customer/CustomerModel'
import './createpassword.scss'
const configColor = Identify.getColorConfig()

class CreatePassword extends Abstract {
    constructor(props) {
        super(props)
        this.token = this.props.token;
        this.customerModel = new CustomerModel({obj: this})
    }

    handleCreatePw() {
        let password = false
        let passwordConfirm = false
        let passwordWarning = document.getElementById('createpassword-input-password-warning')
        let passwordConfirmWarning = document.getElementById('createpassword-input-password-confirm-warning')
        if (!this.passwordField.value){
            passwordWarning.style.display = 'block'
        } else {
            password = this.passwordField.value
            passwordWarning.style.display = 'none'
        }

        if (!this.passwordFieldConfirm.value){
            passwordConfirmWarning.innerHTML = Identify.__('This field is required')
            passwordConfirmWarning.style.display = 'block'
        } else {
            passwordConfirm = this.passwordFieldConfirm.value
            if (passwordConfirm !== password) {
                passwordConfirmWarning.innerHTML = Identify.__('Please enter the same value again.')
                passwordConfirmWarning.style.display = 'block'
            } else 
                passwordConfirmWarning.style.display = 'none'
        }
        if (!password || !passwordConfirm || password!==passwordConfirm)
            return
        
        if (!this.token) {
            Identify.showToastMessage(Identify.__('No token on url!'))
            this.pushLink('/')
            return
        }
        this.customerModel.createPassword({'rptoken': this.token, 'password': password})
        Identify.showLoading()
    }


    setData(data) {
        Identify.hideLoading()
        if (data.errors) {
            this.setState({loaded: true});
            let errors = data.errors;
            let text = "";
            for (let i in errors) {
                let error = errors[i];
                text += error.message + ' ';
            }
            if (text !== "") {
                Identify.showToastMessage(text);
            }
        } else {
            if (data.message)
                this.message = data.message;
            else
                this.message = Identify.__("SUCCESS");
            Identify.showToastMessage(this.message);
            this.pushLink('/customer/account/login')
        }
    }

    render() {
        if (!this.token) {
            Identify.showToastMessage(Identify.__('No token on url!'))
            this.pushLink('/')
        }
        return (
            <div className="createpassword-container">
                <div className="form-field">
                    <div className="label">{Identify.__('New Password')} <span style={{color: 'red'}}>*</span></div>
                    <input type="password" name="password" id="createpassword-input-password"
                           ref={(thisField) => {this.passwordField = thisField}}/>
                    <div id="createpassword-input-password-warning"
                         className="error-message">{Identify.__("This field is required")}</div>
                </div>
                <div className="form-field">
                    <div className="label">{Identify.__('Confirm New Password')} <span style={{color: 'red'}}>*</span></div>
                    <input type="password" name="password-confirm" id="createpassword-input-password-confirm"
                           ref={(thisField) => {this.passwordFieldConfirm = thisField}}/>
                    <div id="createpassword-input-password-confirm-warning"
                        className="error-message">{Identify.__("This field is required")}</div>
                </div>
                <div className="set-new-pw-btn"
                     style={{backgroundColor: configColor.button_background, color: configColor.button_text_color}}
                     onClick={(e) => this.handleCreatePw(e)}>{Identify.__('Set a New Password').toUpperCase()}</div>
            </div>
        )
    }
}
export default CreatePassword