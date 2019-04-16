import React from 'react';
import Abstract from '../BaseAbstract';
import Identify from '../../../Helper/Identify';
import InputField from '../Address/FormFields/InputField';
import CountryState from './FormFields/CountryState';

class AddressFormAbstract extends Abstract {
    constructor(props) {
        super(props);
        const configs = Identify.getMerchantConfig();
        this.address_option = configs.storeview.customer.address_option;
        this.account_option = configs.storeview.customer.account_option;
        this.allowed_countries = configs.storeview.allowed_countries;
        this.gender_value = configs.storeview.customer.address_option.gender_value;
        this.address = this.props.address ? this.props.address : {};
        this.country_code = this.address.country_id ? this.address.country_id : configs.storeview.base.country_code;
    }

    handleChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        this.address[name] = val;
    }

    onInputChange = (e) => {
        this.validateForm(null, true);
    }

    validateForm = (formSelector = null, showMessage = true) => {
        const selector = formSelector === null ? 'new-address' : formSelector;
        const readyToSubmit = false;
        $(selector).find('input[class="required"]').each(function() {
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
        })

        return readyToSubmit;
    }

    renderAddressFormFields() {
        const addressFields = [];
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text"
                name="prefix"
                value={this.address.prefix ? this.address.prefix : ""}
                label={Identify.__('Prefix')}
                show={this.address_option.prefix_show}
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        )
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text"
                name="firstname"
                value={this.address.firstname ? this.address.firstname : ""}
                label={Identify.__('First Name')}
                show="req"
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        )
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text"
                name="lastname"
                value={this.address.lastname ? this.address.lastname : ""}
                label={Identify.__('Last Name')}
                show="req"
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        )
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text"
                name="subfix"
                value={this.address.subfix ? this.address.subfix : ""}
                label={Identify.__('Subfix')}
                show={this.address_option.subfix_show}
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        )
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text"
                name="company"
                value={this.address.company ? this.address.company : ""}
                label={Identify.__('Prefix')}
                show={this.address_option.company_show}
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        )
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text"
                name="street"
                value={this.address.street ? this.address.street : ""}
                label={Identify.__('Street')}
                show={this.address_option.street_show}
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        )
        addressFields.push(
            <InputField 
                key={Identify.makeid()}
                type="text"
                name="city"
                value={this.address.city ? this.address.city: ""}
                label={Identify.__('City')}
                show={this.address_option.city_show}
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.onInputChange(e)}
            />
        )
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

        return addressFields;
    }

    render() {
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

export default AddressFormAbstract;