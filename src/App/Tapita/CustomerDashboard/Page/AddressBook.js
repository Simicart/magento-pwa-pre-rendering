import React, { Component } from 'react';
import AddressModel from '../../../Core/Address/Model';
import Identify from '../../../../Helper/Identify';
import PageAbstract from './PageAbstract';
import Loading from '../../../../BaseComponent/Loading';
import AddressItem from '../Component/Address/AddressItem';
import AddressFrom from '../Component/Address/AddressFrom';

class AddressBook extends PageAbstract {
    constructor(props) {
        super(props);
        this.AddressModel = new AddressModel({ obj: this });
        this.state = {
            loaded: false,
            data: null,
        };
        this.parent = this.props.parent;
    }

    
    componentWillMount() {
        const data = Identify.ApiDataStorage('list_address');
        if (!data && data instanceof Object && this.props.page !== 'edit-address') {
            sessionStorage.removeItem('address_item');
            this.setState({ 
                data, 
                loaded: false
            });
        }
    }

    componentDidMount() {
        if(!this.state.data && this.props.page !== 'edit-address') {
            sessionStorage.removeItem('address_item');
            this.AddressModel.getAddressesCollection();
        }
    }

    processData(data) {
        this.setState({data});
        Identify.ApiDataStorage('list_address', 'update', data);
    }

    getDefaultAddress = () => {
        const customerData = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'customer_data' || 'customer_data') || {};
        const defaultAddress = {
            firstname: customerData.firstname !== undefined ? customerData.firstname : '',
            lastname: customerData.lastname !== undefined ? customerData.lastname : ''
        };
        return defaultAddress;
    }

    handleNewAddress = () => {
        sessionStorage.removeItem('address_item');
        this.pushLink('/customer/address/edit-address');
    }

    renderListAddress (data = this.state.data) {
        let content = <div></div>;
        if(!this.state.loaded || !data) {
            content = <Loading />
        } else {
            if (!data || !data.hasOwnProperty('addresses') || data.addresses.length === 0) {
                return <div className="text-center">{Identify.__('You have no item in your address book')}</div>
            } else {
                content = data.addresses.map(item => {
                    return (
                        <AddressItem addressData={item} isDelete={true} parent={this}
                                     key={Identify.makeid()}/>
                    );
                })
            }
        }

        return <div className="section-address-item">{content}</div>
    }

    renderDefaultAddress(data = this.state.data) {
        let content = <div></div>;
        if(!this.state.loaded || !data) {
            content = <Loading />
        } else {
            if(!data || !data.hasOwnProperty('addresses') || data.addresses.length === 0) {
                return <div className="text-center">{Identify.__('You have no item in your address book')}</div>
            } else {
                let defaultShipping = data.addresses.filter(item => {
                    if (item.is_default_shipping !== undefined)
                        return item.is_default_shipping;
                    else
                        return parseInt(item.entity_id, 10) === parseInt(Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'default_shipping_address'), 10);
                })
                let defaultBilling = data.addresses.filter(item => {
                    if (item.is_default_billing !== undefined)
                        return item.is_default_billing;
                    else
                        return parseInt(item.entity_id, 10) === parseInt(Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'default_billing_address'), 10);
                })
                defaultShipping = defaultShipping[0];
                defaultBilling = defaultBilling[0];
                content = <div className="section-address-item">
                    <AddressItem addressData={defaultBilling} title='Default Billing' parent={this}
                                 key={Identify.makeid()}/>
                    <AddressItem addressData={defaultShipping} title='Default Shipping' parent={this}
                                 key={Identify.makeid()}/>
                </div>
            }
        }

        return content;
    }
    
    render () {
        const { data } = this.state;
        if(!data && this.props.hasOwnProperty('page') && this.props.page === 'edit-address') {
            return <AddressFrom parent={this}/>
        }
        return (
            <div className="address-book-page">
                <div>
                    {this.renderPageTitle('Address Book')}
                    <div className="page-content">
                        {this.renderSection({
                            class: 'section-default-address',
                            title: this.renderSectionHeader('Default Address'),
                            content: this.renderDefaultAddress()
                        })}
                        {this.renderSection({
                            class: 'section-list-address',
                            title: this.renderSectionHeader('Additional Address Entries'),
                            content: this.renderListAddress()
                        })}
                        <div className="add-new-address-action">
                            <div className="address-form-btn btn-addnew"
                                 onClick={() => this.handleNewAddress()}
                                 style={{
                                     color: this.configColor.button_text_color,
                                     background: this.configColor.button_background,
                                     textAlign: 'center',
                                     cursor: 'pointer'
                                 }}>{Identify.__('Add new adress')}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddressBook;