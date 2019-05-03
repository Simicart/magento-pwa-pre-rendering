/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/22/18
 * Time: 11:21 AM
 */
import React from 'react'
import AddressAbstract from '../../Address/AddressFormAbstract';
import Identify from '../../../../Helper/Identify'
import CustomerHelper from '../../../../Helper/Customer'
import loaddingImage from './loader-spin-min.gif';
import Checkbox from '@material-ui/core/Checkbox'
import ArrowDown from '../../../../BaseComponent/Icon/ArrowDown'
import Button from '@material-ui/core/Button'
const $ = window.$;
const configColor = Identify.getColorConfig()
class AddressForm extends AddressAbstract {

    constructor(props) {
        super(props);
        let json = Identify.getMerchantConfig();
        this.merchantConfig = json.storeview;
        this.allowCheckoutAsGuest = parseInt(this.merchantConfig.checkout.enable_guest_checkout,10) === 1;
        this.state = {isExistCustomer: false, createNewAccount: !this.allowCheckoutAsGuest}
        this.isCheckEmail = false;
        this.isLogin = false;
        this.currentEmail = null;
        this.address = this.props.address ? this.props.address : {};
        this.CheckoutParent = this.props.CheckoutParent;
        this.parent = this.props.parent;
    }

    setData(data){
        if (data.errors) {
            let errors = data.errors;
            let text = "";
            for (let i in errors) {
                let error = errors[i];
                text += error.message + ' ';
            }
            if (text === "") {
                text = Identify.__('Something went wrong')
            }
            Identify.showToastMessage(text);
            Identify.hideLoading()
        }else {
            if (this.isCheckEmail) {
                this.isCheckEmail = false;
                if (data.customer.entity_id !== undefined) {
                    this.setState({isExistCustomer: true});
                    this.currentEmail = data.customer.email;
                } else {
                    this.setState({isExistCustomer: false});
                }
                $('.loading-check-email').hide();
                Identify.hideLoading()

            }
            if (this.isLogin){
                this.isLogin = false;
                this.getCart =true;
                CustomerHelper.setLogin(data.customer.email,
                    this.password,
                    data.customer.simi_hash, 
                    data.customer.firstname);
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'customer_data',data.customer);
                let defaultShipping = data.customer.default_shipping ? data.customer.default_shipping : null;
                let defaultbilling = data.customer.default_shipping ? data.customer.default_shipping : null;
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'default_shipping_address', defaultShipping);
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'default_billing_address', defaultbilling);
                this.parent.Model.getAddressesCollection();
                this.parent.CheckoutParent.OrderModel.getCart()
                if(defaultShipping){
                    Identify.showLoading()
                    this.parent.handleSaveAddress({entity_id :defaultbilling})
                }
            }
        }
    }

    renderEmailField = () => {
        // this.address = this.props.data.selectedShippingAddress !== null ? this.props.data.selectedShippingAddress : {};
        let emailvalue = this.currentEmail !== null ? this.currentEmail : '';
        if (emailvalue === '') {
            emailvalue = this.address.email;
        }

        if(this.props.shipping){
            return (
                <div className="email-field">
                    {this.renderField('email', 'email', emailvalue, Identify.__('Email'), 'opt')}
                </div>
            )
        }

        return (
            <div className="email-field">
                {this.renderField('email', 'email', emailvalue, Identify.__('Email'), 'req')}
                <div className="loading-check-email" style={{display: 'none'}}><img src={loaddingImage}
                                                                                    width={24}
                                                                                    height={24}
                                                                                    alt={Identify.__('Loading')}/></div>
            </div>
        );
    };

    checkBoxCreateAccountChanged = (isChecked) => {
        this.setState({createNewAccount: isChecked});
    };

    renderCreatNewAccountCheckbox = () => {
        let {createNewAccount} = this.state;
        return (
            <div className="cbx-create-account">
                <div className="checkbox-field flex"
                     onClick={()=>this.checkBoxCreateAccountChanged(!createNewAccount)}>
                    <Checkbox disabled={!this.allowCheckoutAsGuest}
                              checked={createNewAccount}/>
                    <div className="checkbox-label" style={{fontSize: 14, fontWeight: 300, marginLeft: -10}}>
                        {Identify.__('Create an Account')}
                    </div>
                </div>
            </div>
        );
    };

    handleLoginCustomer = () => {
        let email = $('#email').val();
        let password = $('#customer_password').val();
        let jQuery = {};
        jQuery['email'] = email;
        jQuery['password'] = password;
        this.password= password;
        if (email === "" || password === '') {
            Identify.showToastMessage('Please enter your email and password');
            return false;
        }
        if (!Identify.validateEmail(email)) {
            Identify.showToastMessage('Your email is invalid');
            return false;
        }
        Identify.showLoading();
        this.isLogin = true;
        this.customerModel.loginCustomer(jQuery);
    };

    renderBtnLogin = ()=>{
        return (
            <div className="login-view">
                    <span className="existing-message"><ArrowDown/>{Identify.__('You already have an account with us. Sign in or continue as guest.')}</span>
                <div className="login-action">
                    <div className="btn-action btn-login" id="login-btn"
                         onClick={() => this.handleLoginCustomer()}
                         style={{
                             background: configColor.button_background,
                             color: configColor.button_text_color
                         }}>{Identify.__('Sign In')}</div>
                    <div className="forgot-password-label"
                         onClick={() => this.pushLink('/customer/account/forgot-password')}
                         style={{color: configColor.button_background}}>{Identify.__('Forgot your password?')}</div>
                </div>
            </div>
        );
    }

    renderPasswordField = () => {
        return (
            <div className="login-customer">
                {this.renderField('password', 'customer_password', '', Identify.__('Password'), 'opt')}
                {this.renderBtnLogin()}
            </div>
        );
    };

    renderPasswordForCreateAccount = () => {
        return (
            <div>
                {this.renderField('password', 'customer_password', this.address.customer_password ? this.address.customer_password : '', Identify.__('Password'), 'req')}
                {this.renderField('password', 'confirm_password', this.address.confirm_password ? this.address.confirm_password : '', Identify.__('Confirm Password'), 'req')}
            </div>
        );
    };

    checkExistEmail = () => {
        let email = $('#email').val();
        if (email !== "" && Identify.validateEmail(email)) {
            $('.loading-check-email').show();
            this.isCheckEmail = true;
            this.currentEmail = email;
            this.customerModel.checkExistingCustomer(email);
        }
    };

    onInputChange = (e) =>{
        let currentTarget = e.currentTarget;
        if(currentTarget.name==='email' && !this.props.shipping){
            this.checkExistEmail();
        }
    };

    handleSave = () => {
        let form = '#'+this.props.id;
        let formCheck = this.validateForm(form);
        if(formCheck){
            Identify.showLoading()
            return this.autoSubmitAddressFrom();
        }
    }


    autoSubmitAddressFrom = () => {
        let form = '#'+this.props.id;
        let formData = $(form).serializeArray();
        let jQuery = {};
        for (let index in formData) {
            let field = formData[index];
            if (field['value'] !== "" && field['value'].length > 0) {
                jQuery[field['name']] = field['value'];
            }
        }

        if (jQuery.customer_password !== undefined && jQuery.confirm_password !== undefined) {
            if (jQuery.customer_password !== jQuery.confirm_password) {
                Identify.showToastMessage('Password and Confirm Password not match');
                return;
            }
        }
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'email_address',jQuery['email']);
        this.parent.handleSaveAddress(jQuery);
    };

    render=()=>{
        return (
            <div className={`new-address-form ${this.props.className}`}>
                <form id={this.props.id}>
                    <ul className="address-fields">
                        {!CustomerHelper.isLogin() && (
                            this.renderEmailField()
                        )}
                        {!CustomerHelper.isLogin() && !this.state.isExistCustomer && !this.props.shipping && (
                            this.renderCreatNewAccountCheckbox()
                        )}
                        {!CustomerHelper.isLogin() && !this.state.isExistCustomer && this.state.createNewAccount && (
                            this.renderPasswordForCreateAccount()
                        )}

                        {!CustomerHelper.isLogin() && this.state.isExistCustomer && (
                            this.renderPasswordField()
                        )}

                        {this.renderAddressFormFields()}
                        <div className="save-checkout-address">
                            <Button variant="text" style={{backgroundColor:configColor.button_background,color:configColor.button_text_color}}  onClick={()=>this.handleSave()}>
                                {Identify.__('Save')}
                            </Button>
                        </div>
                    </ul>
                </form>
            </div>
        )
    }
}
export default AddressForm;