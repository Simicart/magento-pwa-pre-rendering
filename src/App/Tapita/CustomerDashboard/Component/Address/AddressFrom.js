import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddressFormAbstract from '../../../../Core/Address/AddressFormAbstract';
import AddressModel from '../../../../Core/Address/Model';
import Identify from '../../../../../Helper/Identify';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '../../../../../BaseComponent/CheckBox';

class AddressFrom extends AddressFormAbstract {
    constructor(props) {
        super(props);
        this.parent = this.props.parent;
        this.address = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'address_item');
        this.AddressModel = new AddressModel({ obj: this });
        this.updateAddress = false;
    }

    componentWillUnmount() {
        sessionStorage.removeItem('address_item');
    }

    processData(data) {
        if(this.updateAddress) {
            this.updateAddress = false;
            Identify.ApiDataStorage('list_address', 'update', data);
            this.backToAddressPage();
        } else {
            Identify.showLoading();
            this.AddressModel.getAddressesCollection();
            this.updateAddress = true;
            Identify.showToastMessage(Identify.__('The address has been saved'));
            // let eventName = 'added_new_address';
            // if(this.address.entity_id !== undefined) {
            //     eventName = 'edited_address'
            // }   
        }
    }

    validateForm = () => {
        const $ = window.$;
        let isValid = true;
        $('#edit-address-form').find('input[class="required"]').each(function () {
            if ($(this).val() === '' || $(this).val().length === 0) {
                isValid = false;
                $(this).next('.error-message').show();
            } else {
                $(this).next('.error-message').hide();
            }
        });

        return isValid;
    }

    backToAddressPage = () => {
        this.parent.pushLink('/customer/address');
    }

    handleSaveAddress = () => {
        const $ = window.$; 
        const checkForm = this.validateForm();
        if(checkForm) {
            let jQuery = {};
            let formData = $('#edit-address-form').serializeArray();
            for (let index in formData) {
                let field = formData[index];
                if (field.value !== "" && field.value.length !== 0) {
                    jQuery[field.name] = field.value;
                }
            }
            Identify.showLoading();
            if (this.address.entity_id !== undefined) {
                this.AddressModel.updateAddress(this.address.entity_id, jQuery);
            } else {
                this.AddressModel.addNewAddress(jQuery);
            }
        }
    }
    
    getDefaultBillingId = () => {
        return Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'default_billing_address') || 0;
    }

    getDefaultShippingId = () => {
        return Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'default_shipping_address') || 0;
    }
    
    renderShippingAndBillingDefault() {
        const defaultShippingId = this.getDefaultShippingId();
        const defaultBillingId = this.getDefaultBillingId();
        let isDefaultBilling = this.address.entity_id !== undefined && parseInt(this.address.entity_id, 10) === parseInt(defaultBillingId, 10);
        let isDefaultShipping = this.address.entity_id !== undefined && parseInt(this.address.entity_id, 10) === parseInt(defaultShippingId, 10);
        if (this.address.is_default_billing !== undefined) {
            isDefaultBilling = this.address.is_default_billing;
        }

        if (this.address.is_default_shipping !== undefined) {
            isDefaultShipping = this.address.is_default_shipping;
        }

        return (
            <div className="cbx-default">
                {isDefaultBilling && (
                    <div className="default-address-message" key={Identify.makeid()}>
                        {Identify.__("It's a default billing address.")}
                    </div>
                )}

                {isDefaultShipping && (
                    <div className="default-address-message" key={Identify.makeid()}>
                        {Identify.__("It's a default shipping address.")}
                    </div>
                )}

                {!isDefaultBilling && (
                    <div className="default-billing">
                        <FormControlLabel
                            control={
                                <Checkbox name="is_default_billing"
                                          value="1"
                                />
                            }
                            label={Identify.__('Use as my default billing address')}
                            classes={{
                                root: 'checkbox-control',
                                label: 'control-label-address'
                            }}

                        />
                    </div>
                )}

                {!isDefaultShipping && (
                    <div className="default-shipping">
                        <FormControlLabel
                            control={
                                <Checkbox name="is_default_shipping"
                                          value="1"
                                />
                            }
                            label={Identify.__('Use as my default shipping address')}
                            classes={{
                                root: 'checkbox-control',
                                label: 'control-label-address'
                            }}
                        />
                    </div>
                )}
            </div>
        )
    }
    
    renderButtonAction() {
        return (
            <div className="btn-form-action">
                <div className="address-form-btn btn-cancel"
                     onClick={() => this.backToAddressPage()}
                     style={{
                         color:this.configColor.button_background,
                         background: this.configColor.button_text_color
                     }}>{Identify.__('Cancel')}</div>
                <div className="address-form-btn btn-save-address"
                     onClick={() => this.handleSaveAddress()}
                     id="cancel-form"
                     style={{
                         color: this.configColor.button_text_color,
                         background: this.configColor.button_background,
                         textAlign: 'center',
                         cursor: 'pointer'
                     }}>{Identify.__('Save')}</div>
            </div>
        );
    }

    render() {
        if(!this.address || (!this.address.country_id && !this.address.country_code && !this.address.country_name))
            this.address = this.parent.getDefaultAddress();
        let pageTitle = Identify.__("Add new address");
        if(this.address.entity_id !== undefined) {
            this.country_code = this.address.country_id;
            pageTitle = Identify.__('Edit address');
        }
        return (
            <div className="edit-address">
                {this.parent.renderPageTitle(pageTitle)}
                <form id="edit-address-form">
                    <ul className="address-fields">
                        {this.renderAddressFormFields()}
                    </ul>
                    {this.renderShippingAndBillingDefault()}
                </form>
                {/* {layout.tapita_address.after_edit_form(this)} */}
                {this.renderButtonAction()}
            </div>
        );
    }
}

export default AddressFrom;