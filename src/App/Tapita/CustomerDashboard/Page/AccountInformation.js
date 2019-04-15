import React from 'react';
import PageAbstract from './PageAbstract'
import {InputField} from  '../../../../BaseComponent/Input'
import Identify from '../../../../Helper/Identify'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '../../../../BaseComponent/Button';
import CustomerModel from '../../../Core/Customer/CustomerModel'
const $ = window.$;
class Profile extends PageAbstract{

    constructor(props){
        super(props);
        this.CustomerModel = new CustomerModel({obj:this})
        this.state = {
            isChangePass : false,
        }

    }

    // componentDidMount(){
    //     let location = this.context.router.history.location;
    //     if(location.hasOwnProperty('state') && location.state && location.state.hasOwnProperty('change_password')){
    //         this.updateCheck()
    //     }
    // }

    updateCheck = ()=> {
        this.setState({isChangePass: !this.state.isChangePass})
    };

    renderInfo =()=>{
        return (
            <div>
                <InputField 
                    label="First Name" 
                    required="*" 
                    className="input-required" 
                    name="firstname" 
                    value={(this.customer && this.customer.firstname)?this.customer.firstname:''}
                />
                <InputField 
                    label="Last Name" 
                    required="*" 
                    className="input-required" 
                    name="lastname" 
                    value={(this.customer && this.customer.lastname)?this.customer.lastname:''}
                />
                <FormControlLabel
                    id="checkbox-account"
                    control={
                        <Checkbox
                            checked={this.state.isChangePass}
                            onChange={()=>this.updateCheck()}
                        />
                    }
                    label={Identify.__('Change password')}
                    classes={{
                        root: 'checkbox-control',
                        label: 'control-label'
                    }}
                />
            </div>
        )
    }

    handleNewPassword(e){
        let val = e.target.value;
        let str = this.checkPassStrength(val);
        $('#strength-value').html(Identify.__(str))
    }

    renderPasswordForm=()=>{
        return (
            <div className="password-form">
                <InputField
                    label="Current password"
                    required="*"
                    type="password"
                    className="input-required"
                    name="old_password"/>
                <InputField
                    label="New password"
                    required="*"
                    type="password"
                    className="input-required"
                    input={{minLength : 6 , onChange : (e)=>this.handleNewPassword(e)}}
                    name="new_password" />
                <div className="pass-strength flex" style={{marginBottom : 15,marginTop : -10}}>
                    <span>{Identify.__('Password Strength : ')} </span>
                    <span id="strength-value">{Identify.__('No password')}</span>
                </div>
                <InputField
                    label="Confirm new password"
                    required="*"
                    type="password"
                    className="input-required"
                    name="com_password"/>
            </div>
        )
    };

    handleEditAccount =()=>{
        if(this.validateForm()){
            let params = {
                email : this.customer.email
            }
            if(this.state.isChangePass){
                params['change_password'] = 1;
            }
            $('.input-field input').each(function () {
                let name = $(this).attr('name');
                let value = $(this).val();
                params[name] = value
            })
            if(params['new_password'] !== params['com_password']){
                Identify.showToastMessage(Identify.__('Please make sure your passwords match.'))
                // $('input#com_password').focus();
                return;
            }
            Identify.showLoading()
            let query = {
                email: this.customer.email,
                simi_hash: this.customer.simi_hash
            }
            this.CustomerModel.editCustomer(query,params);
        }
    };



    setData(data){
        Identify.hideLoading()
        if (data.errors) {
            let errors = data.errors;
            let text = "";
            for (let i in errors) {
                let error = errors[i];
                text += error.message + ' ';
            }
            Identify.showToastMessage(text);
        }else{
            if(this.state.isChangePass) this.updateCheck();
            this.customer = data.customer;
            Identify.showToastMessage(Identify.__(data.message))
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'customer_data',data.customer)
        }
    }

    validateForm = () => {
        let isValid = true;
        $('.input-field').find('input.input-required').each(function () {
            if ($(this).val() === '' || $(this).val().length === 0) {
                isValid = false;
                $(this).next('.error-message').show();
            } else {
                $(this).next('.error-message').hide();
                if($(this).attr('name') === 'new_password'){
                    if($(this).val().length < 6){
                        isValid = false;
                        $(this).next('.error-message').html(Identify.__('Please enter 6 or more characters without leading or trailing spaces.'));
                        $(this).next('.error-message').show();
                    }else{
                        $(this).next('.error-message').html(Identify.__('This field is required'))
                        $(this).next('.error-message').hide();
                    }
                }
            }
        });

        return isValid;
    };

    scorePassword =(pass)=> {
        let score = 0;
        if (!pass)
            return score;

        // award every unique letter until 5 repetitions
        let letters = {};
        for (let i=0; i<pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }

        // bonus points for mixing it up
        let variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass),
        }

        let variationCount = 0;
        for (let check in variations) {
            variationCount += (variations[check] === true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;

        return parseInt(score,10);
    }


    checkPassStrength =(pass)=> {
        let score = this.scorePassword(pass);
        if (score > 70)
            return "Strong";
        if (score > 50)
            return "Good";
        if (score >= 30)
            return "Weak";
        return "No password";
    }

    render(){
        return (
            <div className="my-account-page">
                {this.renderPageTitle('Edit Account Information')}
                <div className="page-content">
                    {this.renderSection({
                        class : 'account-info',
                        title : this.renderSectionHeader('Account Information'),
                        content : this.renderInfo()
                    })}
                    {this.state.isChangePass ?
                        this.renderSection({
                            class : 'section-password',
                            title : this.renderSectionHeader('Change Password'),
                            content : this.renderPasswordForm()
                        }) : null}
                    <Button
                        className="btn-save-account"
                        text={Identify.__('Save')}
                        style={{
                            height : 36,
                        }}
                        textStyle={{
                            textTransform : 'uppercase'
                        }}
                        onClick={()=>this.handleEditAccount()}
                    />
                </div>
            </div>
        )
    }
}
export default Profile