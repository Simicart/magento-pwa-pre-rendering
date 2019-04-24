import React, { Component } from 'react';
import Base from '../../Core/BaseAbstract';
import Loading from '../../../BaseComponent/Loading';
import CustomerModel from '../../Core/Customer/CustomerModel';
import CustomerHelper from '../../../Helper/Customer';
import Identify from '../../../Helper/Identify';
import { SubscribeOne } from 'unstated-x';
import { AppState } from '../../../Observer/AppState';

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
        this.props.updateCart(null);
        $('.cart-number').hide();
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'msg_logout', msg);
        this.pushLink('/');
    }
    
    
    render() {
        return <Loading style={{margin: '200px auto'}} item_size="30px"/>
    }
}

const LogoutState = props => (
    <SubscribeOne to={AppState} bind={['cart_data']}>
        {app => <Logout updateCart={(data)=>app.updateCart(data)} {...props}/>}
    </SubscribeOne>
)

export default LogoutState;