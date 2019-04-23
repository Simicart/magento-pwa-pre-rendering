/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/8/19
 * Time: 10:05 AM
 */
import React from 'react'
import PageAbstract from './PageAbstract'
import MyOrder from './MyOrder';
import Address from './AddressBook';
import Identify from '../../../../Helper/Identify';
import EditIcon from '../../../../BaseComponent/Icon/Edit';
import Button from '../../../../BaseComponent/Button';

class AccountDashboard extends PageAbstract{
    constructor(props) {
        super(props);
        this.parent = this.props.parent;
    }

    handleChangePassword = () => {
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'password_change', true)
        this.pushLink('/customer/account/edit');
    }

    renderAccountInfo() {
        const title = this.renderSectionHeader('Account Information');
        const content = (
            <div className="section-account-content">
                <div className="contact-info box" style={Identify.isRtl() ? {marginLeft: 10} : {marginRight:10}}>
                    <div className="edit-title box-title">
                        <div className="font-normal">{Identify.__('Contact Infomation')}</div>
                        <div onClick={() => this.pushLink('/customer/account/edit')}>
                            <EditIcon style={{width: 17, height: 17}}/>
                        </div>
                    </div> 
                    <div className="box-content">
                        <p>{this.customer.firstname} {this.customer.lastname}</p>
                        <p>{this.customer.email}</p>
                        <Button 
                            className="change-password"
                            text={Identify.__('Change password')}
                            textStyle={{fontSize: 16, fontWeight: 400}}
                            style={{
                                width: 200,
                                height: 36,
                                borderRadius: 20,
                                marginTop: 20
                            }}
                            onClick={() => this.handleChangePassword()}
                        />
                    </div>
                </div>
                <div className="newsletter-info box">
                    <div className="edit-title box-title">
                        <div className="font-name">{Identify.__('Newsletter')}</div>
                        <div onClick={() => this.pushLink('/newsletter/manager')}>
                            <EditIcon style={{width: 17, height: 17}}/>
                        </div>
                    </div>
                    <div className="box-content">
                        <div>
                            {this.customer.news_letter === '1' 
                            ? Identify.__("You are currently subscribed to 'General Subscription'.") 
                            : Identify.__("You don't subscribe to our newsletter.")}
                        </div>
                    </div>
                </div>
            </div>
        );

        return this.renderSection({
            class: 'section-account',
            title,
            content
        });
    }
    
    render() {
        return (
            <div className="account-dashboard">
                {this.renderPageTitle('My Dashboard')}
                <div className="page-content">
                    <MyOrder page="dashboard"/>
                    {this.renderAccountInfo()}
                    <Address page="dashboard"/>
                </div>
            </div>
        );
    }
}
export default AccountDashboard