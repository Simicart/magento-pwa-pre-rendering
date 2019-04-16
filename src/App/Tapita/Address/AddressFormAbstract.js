import React from 'react';
import Base from "../../Core/BaseAbstract";
import Identify from "../../../Helper/Identify";
import PluginHelper from "../../../Helper/Plugin";
import PropTypes from 'prop-types';
import CustomerModel from "../../Core/Customer/CustomerModel";
import InputField from "./FormFields/InputField";
import Gender from "./FormFields/Gender";
import CountryState from "./FormFields/CountryState"
// import {layout} from '../../../Observer/layout'
import './style.css'


class AddressFormAbstract extends Base {

    constructor(props) {
        super(props);
        let json = Identify.getMerchantConfig();
        this.address_option = (json.storeview.customer.address_fields_config && 
            PluginHelper.isPluginEnabled(PluginHelper.getPluginSku().HIDDEN_ADDRESS))?
        json.storeview.customer.address_fields_config:
        json.storeview.customer.address_option;
        this.account_option = json.storeview.customer.account_option;
        this.allowed_countries = json.storeview.allowed_countries;
        this.gender_value = json.storeview.customer.address_option.gender_value;
        this.address = this.props.address ? this.props.address : {};
        this.customerModel = new CustomerModel({obj: this});
        this.country_code = this.address.country_id ? this.address.country_id : json.storeview.base.country_code;
    }

    handleLink = (e, link) => {
        let browserHistory = this.context.router.history;
        browserHistory.push(link);
    };


    renderAddressFormFields = () => {
        let addressFields = [];
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="prefix" 
                value={this.address.prefix ? this.address.prefix : ""}
                label={Identify.__('Prefix')}
                show={this.address_option.prefix_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="firstname" 
                value={this.address.firstname ? this.address.firstname : ""}
                label={Identify.__('First Name')}
                show="req"
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="lastname" 
                value={this.address.lastname ? this.address.lastname : ""}
                label={Identify.__('Last Name')}
                show="req"
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="suffix" 
                value={this.address.suffix ? this.address.suffix : ""}
                label={Identify.__('Suffix')}
                show={this.address_option.suffix_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );

        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="company" 
                value={this.address.company ? this.address.company : ""}
                label={Identify.__('Company')}
                show={this.address_option.company_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );
        
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="street" 
                value={this.address.street ? this.address.street : ""}
                label={Identify.__('Address')}
                show={this.address_option.street_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );
        
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="city" 
                value={this.address.city ? this.address.city : ""}
                label={Identify.__('City')}
                show={this.address_option.city_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );
        
        addressFields.push(
            <CountryState isCountryRequired={this.address_option.country_id_show}
                          key={Identify.makeid()}
                          defaultCountryCode={this.country_code}
                          defaultRegionId={this.address.region_id}
                          defaultRegionName={this.address.region || ''}
                          allCountries={this.allowed_countries}
                          isStateRequired={this.address_option.region_id_show}/>
        );

        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="postcode" 
                value={this.address.postcode ? this.address.postcode : ""}
                label={Identify.__('Post/Zip Code')}
                show={this.address_option.zipcode_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );

        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="tel" 
                name="telephone" 
                value={this.address.telephone ? this.address.telephone : ""}
                label={Identify.__('Phone')}
                show={this.address_option.telephone_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );

        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="fax" 
                value={this.address.fax ? this.address.fax : ""}
                label={Identify.__('Fax')}
                show={this.address_option.fax_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );

        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text" 
                name="tax" 
                value={this.address.tax ? this.address.tax : ""}
                label={Identify.__('Tax/VAT number')}
                show={this.address_option.taxvat_show}
                onChange={(e)=>this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        );
        
        // const dispactedFields = layout.render_address_form_fields.render_address_form_fields_after(this, addressFields);
        // return (dispactedFields.length[0]) ? dispactedFields : addressFields
        return addressFields
    };

    renderGender = (type = 'text', name, value, label, show = 'req', onChange = null) => {
        if (show !== "") {
            let dataBind = this.gender_value.map((item) => {
                return {label: Identify.__(item.label), value: item.value}
            });
            return (
                <Gender requried={this.address_option.gender_show} dataBind={dataBind} key={Identify.makeid()}/>
            );
        }
    }

    renderField = (type = 'text', name, value, label, show = 'req', onChange = null) => {
        if (show !== "") {
            let classRequried = '';
            let liName = "li-" + name;
            let requiredLabel = '';

            if (show === 'req') {
                classRequried = 'required';
                requiredLabel = " *"
            }
            if (name === 'gender') {
                let dataBind = this.gender_value.map((item) => {
                    return {label: Identify.__(item.label), value: item.value}
                });
                return (
                    <Gender requried={this.address_option.gender_show} dataBind={dataBind} key={Identify.makeid()}/>
                );

            }

            return (
                <li className="form-field-item" id={liName} key={Identify.makeid()}>
                    <label htmlFor={name}>{label}<span className='required-label'>{requiredLabel}</span></label>
                    <input type={type} name={name} id={name} className={classRequried}
                           defaultValue={value}
                           onChange={(e)=>this.handleChange(e)}
                           onBlur={(e) => this.onInputChange(e)}/>
                    <div className="error-message">
                        {Identify.__('This field is required')}
                    </div>
                </li>
            );
        }
    };

    handleChange = (e)=>{
        let name = e.target.name;
        let val = e.target.value;
        this.address[name] = val;
    }


    onInputChange = (e) => {
        this.validateForm(null, true);
    };

    validateForm = (formSelector = null, showMessage = true) => {
        const $ = window.$;
        let selector = formSelector === null ? "new-address" : formSelector;
        let readyToSubmit = false;
        $(selector).find('input[class="required"]').each(function () {
            if ($(this).val() !== '' && $(this).val().length > 0) {
                if (showMessage) {
                    $(this).next('.error-message').hide();
                }
                readyToSubmit = true;
            } else {
                if (showMessage) {
                    $(this).next('.error-message').show();
                    let msg = $(this).next('.error-message').text();
                    Identify.showToastMessage(msg)
                }
                return false;
            }
        });
        return readyToSubmit;
    }

    render = () => {
        return (
            <div className="new-address-form">
                <form id="new-address">
                    <ul className="address-fields">
                        {this.renderAddressFormFields()}
                    </ul>
                </form>
            </div>
        );
    }
}

AddressFormAbstract.contextTypes = {
    router: PropTypes.object
};
export default AddressFormAbstract;