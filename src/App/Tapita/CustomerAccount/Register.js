import React from 'react'
import Abstract from '../../Core/BaseAbstract'
import Identify from "../../../Helper/Identify";
import Button from '@material-ui/core/Button'
import CustomerModel from '../../Core/Customer/CustomerModel'
import CustomerHelper from "../../../Helper/Customer";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';
import { Loading } from '../../../BaseComponent/Loading';

const configColor = Identify.getColorConfig()
class Register extends Abstract {
  constructor(props) {
    super(props);
    this.Model = new CustomerModel({ obj: this })
  }

  handleRegister() {
    let reQ = false;
    let json = {};
    this.registerInputs.map((input) => {
      if (!input) return null;

      let warning = document.getElementById(input.id + '-warning');

      if (!warning) return null;

      let valid = false;

      if (input.value !== '' && input.value !== null) {
        if (input.name === 'email') {
          if (!Identify.validateEmail(input.value)) {
            warning.innerText = Identify.__('Check your email and try again');
          } else
            valid = true;
        } else if (input.name === 'confirm-password') {
          if (input.value !== this.password) {
            warning.innerText = Identify.__('New password and confirm password do not match');
          } else
            valid = true;
        } else
          valid = true;
      }
      if (valid) {
        const name = input.name
        json[name] = input.value;

        if (input.name === 'email') {
          this.email = input.value;
        } else if (input.name === 'password') {
          this.password = input.value;
          warning.style.display = 'none';
        }
      } else {
        reQ = true;
        warning.style.display = 'block';
      }
      return null;
    }, this
    );

    if (this.newsletterCheckbox && this.newsletterCheckbox.state && this.newsletterCheckbox.state.switched) {
      json['news_letter'] = '1';
    }

    if (!reQ) {
      this.showLoading();
      this.setState({ loaded: false });
      this.Model.registerCustomer(json);
    }
  }

  showLoading = () => {
    document.getElementById('register-dialog-loading').style.display = 'block';
  }

  hideLoading = () => {
    document.getElementById('register-dialog-loading').style.display = 'none';
  }

  handleLogin() {
    this.login = true;
    this.setState({ loaded: false });
    let json = { 'email': this.email, 'password': this.password };
    this.Model.loginCustomer(json);
  }

  setData(data) {
    this.setState({ loaded: true });
    if (data.errors) {
      this.hideLoading();
      if (this.login) {
        this.login = false;
        this.parent.closeDialog();
      } else {
        let errors = data.errors;
        let text = "";
        for (let i in errors) {
          let error = errors[i];
          text += error.message + ' ';
        }
        if (text !== "") {
          Identify.showToastMessage(text);
        }
      }
    } else {
      if (this.login) {
        this.login = false;
        if (data.message)
          Identify.showToastMessage(data.message);
        this.hideLoading();
        
        CustomerHelper.setLogin(data.customer);
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'customer_data', data.customer);
        //update Header
        if (window.location.pathname.indexOf('account/login') > -1) {
            this.pushLink("/")
        }
      } else if (this.email && this.password) {
        if (data.message){
          this.message = data.message;
        }
        else
          this.message = Identify.__("SUCCESS");
          Identify.showToastMessage(this.message);
          this.handleLogin();
      }
    }
  }

  render() {
    this.registerInputs = []
    return (
      <div className="register-dialog-content">
        <div className="register-form">

          <div className="form-field">
            <div className="label">
              {Identify.__('First Name')} <span style={{ color: 'red' }}>*</span>
            </div>
            <input type="firstname" name="firstname" id="register-input-firstname"
              ref={(thisField) => { this.registerInputs.push(thisField) }} />
            <div id="register-input-firstname-warning"
              className="error-message">{Identify.__("This field is required")}</div>
          </div>

          <div className="form-field">
            <div className="label">
              {Identify.__('Last Name')} <span style={{ color: 'red' }}>*</span>
            </div>
            <input type="lastname" name="lastname" id="register-input-lastname"
              ref={(thisField) => { this.registerInputs.push(thisField) }} />
            <div id="register-input-lastname-warning"
              className="error-message">{Identify.__("This field is required")}</div>
          </div>


          <div className="form-field">
            <div className="label">
              {Identify.__('Email')} <span style={{ color: 'red' }}>*</span>
            </div>
            <input type="email" name="email" id="register-input-email"
              ref={(thisField) => { this.registerInputs.push(thisField) }} />
            <div id="register-input-email-warning"
              className="error-message"></div>
          </div>

          <div className="form-field">
            <div className="label">{Identify.__('Password')} <span style={{ color: 'red' }}>*</span></div>
            <input type="password" name="password" id="register-input-password"
              ref={(thisField) => { this.registerInputs.push(thisField) }} />
            <div id="register-input-password-warning"
              className="error-message">{Identify.__("This field is required")}</div>
          </div>

          <div className="form-field">
            <div className="label">{Identify.__('Confirm Password')} <span style={{ color: 'red' }}>*</span></div>
            <input type="password" name="confirm-password" id="register-input-confirm-password"
              ref={(thisField) => { this.registerInputs.push(thisField) }} />
            <div id="register-input-confirm-password-warning"
              className="error-message">{Identify.__("Confirm password is required")}</div>
          </div>
          <div className="register-dialog-newsletter">
            <FormControlLabel
              id="checkbox-register"
              control={
                <Checkbox
                  ref={(thisField) => { this.newsletterCheckbox = thisField }}
                  id="register-dialog-checkbox-newsetter"
                  selected={true}
                  parent={this}
                  style={{
                    marginBottom: 10,
                    marginTop: 10,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                />
              }
              label={Identify.__('Sign up for newsletter')}
              classes={{
                root: 'checkbox-control',
                label: 'control-label'
              }}
            />
          </div>
          <div className="register-dialog-btn"
            style={{ backgroundColor: configColor.button_background, color: configColor.button_text_color }}
            onClick={(e) => this.handleRegister(e)}>{Identify.__('Create an Account').toUpperCase()}</div>
        </div>
        <div id="register-dialog-loading" style={{ display: 'none' }}>
          <Loading />
        </div>
      </div>
    );
  }
}

export default Register;