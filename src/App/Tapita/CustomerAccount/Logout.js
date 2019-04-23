import React, { Component } from 'react';
import Base from '../../Core/BaseAbstract';
import Loading from '../../../BaseComponent/Loading';
import CustomerModel from '../../Core/Customer/CustomerModel';
import CustomerHelper from '../../../Helper/Customer';
import Identify from '../../../Helper/Identify';

class Logout extends Base {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
        this.CustomerModel = new CustomerModel({ obj: this});
    }

    componentDidMount() {
        this.CustomerModel.logoutCustomer();
        if(Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'social_login')) {
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'social_login', false);
        }
    }

    processData(data) {
        const $ = window.$;
        const msg = Identify.__('You have logged out. Thank you')
        CustomerHelper.logout();
        $('.cart-number').hide();
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'msg_logout', msg);
        this.pushLink('/');
    }
    
    
    render() {
        return <Loading style={{margin: '200px auto'}} item_size="30px"/>
    }
}

export default Logout;