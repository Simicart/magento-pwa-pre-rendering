import React from 'react';
import Base from '../../Core/BaseAbstract';
import Identify from '../../../Helper/Identify';
import CustomerModel from '../../Core/Customer/CustomerModel'
import Loading from '../../../BaseComponent/Loading';

const configColor = Identify.getColorConfig()

class ForgotPassword extends Base {
    state = {
        email: null
    }

    onChange = (e) => {
        this.setState({email: e.target.value})
    }

    handleForgotPassword() {
        let reQ = true;
        const {email} = this.state
        let warning = document.getElementById('fgtpwd-input-email-warning');
        let warningMessage;

        if (email) {
            if (Identify.validateEmail(email)) {
                reQ = false;
            } else
                warningMessage = Identify.__("Check your email and try again");
        } else {
            warningMessage = Identify.__("This field is required");
        }

        if (!reQ) {
            this.showLoading();
            this.setState({ loaded: false });
            this.customerModel = new CustomerModel({ obj: this });
            this.customerModel.forgotPassword({ 'email': email })
        } else {
            warning.innerText = warningMessage;
            warning.style.display = 'block';
        }
    }

    showLoading = () => {
        document.getElementById('fgtpwd-dialog-loading').style.display = 'block';
    }

    hideLoading = () => {
        document.getElementById('fgtpwd-dialog-loading').style.display = 'none';
    }

    setData(data) {
        this.hideLoading();
        if (data.errors) {
            this.setState({ loaded: true });
            let errors = data.errors;
            let text = "";
            for (let i in errors) {
                let error = errors[i];
                text += error.message + ' ';
            }
            if (text !== "") {
                Identify.showToastMessage(text);
            }
            this.hideLoading();
        } else {
            if (data.message) {
                this.message = data.message;
                Identify.showToastMessage(this.message);
            } else {
                Identify.showToastMessage('SUCCESS')
            }
        }
    }

    render() {
        return (
            <div className="fgtpwd-dialog-content">
                <div className="fgtpwd-form">
                    <div className="form-field">
                        <div className="label">
                            {Identify.__('Enter Your Email')} <span style={{ color: 'red' }}>*</span>
                        </div>
                        <input type="email" name="email" onChange={this.onChange}/>
                        <div id="fgtpwd-input-email-warning"
                            className="error-message"></div>
                    </div>
                    <div className="fgtpwd-btn"
                        style={{ backgroundColor: configColor.button_background, color: configColor.button_text_color }}
                        onClick={(e) => this.handleForgotPassword(e)}>{Identify.__('Reset my password').toUpperCase()}</div>
                </div>
                <div id="fgtpwd-dialog-loading" style={{ display: 'none' }}>
                    <Loading />
                </div>
            </div>
        );
    }
}

export default ForgotPassword;