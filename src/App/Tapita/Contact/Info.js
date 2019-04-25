import React from 'react';
import Base from "../../Core/BaseAbstract";
import Identify from "../../../Helper/Identify";
// import Analytics from '../../../Helper/Analytics'
import IconEmail from '../../../BaseComponent/Icon/Email'
import IconChat from '../../../BaseComponent/Icon/Chat'
import IconPhone from '../../../BaseComponent/Icon/Phone-call'
import IconHome from '../../../BaseComponent/Icon/Homepage'
import "./contact.scss"

class Info extends Base {

    constructor(props) {
        super(props);
        this.data = this.props.contactData;
    }

    // analyticsTracking(content) {
    //     Analytics.analyticsTracking(
    //         {
    //             mixpanel : true,
    //             ga : false
    //         }, 
    //         {
    //             action: `selected_contact_by_${content}`
    //         }
    //     )
    // }
    
    renderMessageView = () => {
        let messages = this.data.message !== undefined ? this.data.message : [];
        if (messages.length > 0) {
            let subItems = messages.map((item) => {
                return (
                    <li className="sub-item" key={Identify.makeid()}>
                        <a href={`sms:${item}`}>{item}</a>
                    </li>
                );
            });
            return (
                <div className='contact-item'>
                    <div className="contact-item-icon">
                        <IconChat style={{width: 30, marginTop: 12}} 
                                  color={'#' + this.data.activecolor}/>
                    </div>
                    <div className="item-content">
                        <div className="contact-title">{Identify.__('Sms')}</div>
                        <ul className="list-sub-items" >
                            {subItems}
                        </ul>
                    </div>

                </div>
            );
        }
    };

    renderEmailView = () => {
        let emails = this.data.email !== undefined ? this.data.email : [];
        if (emails.length > 0) {
            let subItems = emails.map((item) => {
                return (
                    <li className="sub-item" key={Identify.makeid()}>
                        <a href={`mailto:${item}`}>{item}</a>
                    </li>
                );
            });
            return (
                <div className='contact-item'>
                    <div className="contact-item-icon">
                        <IconEmail style={{width: 30, marginTop: 12}}
                                  color={'#' + this.data.activecolor}/>
                    </div>
                    <div className="item-content">
                        <div className="contact-title">{Identify.__('Email')}</div>
                        <ul className="list-sub-items" >
                            {subItems}
                        </ul>
                    </div>

                </div>
            );
        }
    };

    renderPhoneView = () => {
        let phones = this.data.phone !== undefined ? this.data.phone : [];
        if (phones.length > 0) {
            let subItems = phones.map((item) => {
                return (
                    <li className="sub-item" key={Identify.makeid()}>
                        <a href={`tel:${item}`}>{item}</a>
                    </li>
                );
            });
            return (
                <div className='contact-item'>
                    <div className="contact-item-icon">
                        <IconPhone style={{width: 30, marginTop: 12}}
                                   color={'#' + this.data.activecolor}/>
                    </div>
                    <div className="item-content">
                        <div className="contact-title">{Identify.__('Hotline')}</div>
                        <ul className="list-sub-items">
                            {subItems}
                        </ul>
                    </div>

                </div>
            );
        }
    };

    renderWebsiteView = () => {
        let website = this.data.website !== undefined ? this.data.website : '';
        if (website.length > 0) {
            return (
                <div className='contact-item'>
                    <div className="contact-item-icon">
                        <IconHome style={{width: 30, marginTop: 12}}
                                   color={'#' + this.data.activecolor}/>
                    </div>
                    <div className="item-content">
                        <div className="contact-title">{Identify.__('Website')}</div>
                        <ul className="list-sub-items">
                            <li className="sub-item" key={Identify.makeid()}>
                                <a href={`${website}`} style={{textDecoration: 'underline'}}>{website}</a>
                            </li>
                        </ul>
                    </div>

                </div>
            );
        }
    };

    renderListView = () => {
        let Items = [];
        let phones = this.data.phone !== undefined ? this.data.phone : [];
        let emails = this.data.email !== undefined ? this.data.email : [];
        let message = this.data.message !== undefined ? this.data.message : [];
        let website = this.data.website !== undefined ? this.data.website : [];

        if (emails && emails.length > 0) {
            Items.push(
                <div className="list-view" key={Identify.makeid()}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1">
                                {this.renderEmailView()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (phones && phones.length > 0) {
            Items.push(
                <div className="list-view" key={Identify.makeid()}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1">
                                {this.renderPhoneView()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (message && message.length > 0) {
            Items.push(
                <div className="list-view" key={Identify.makeid()}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1">
                                {this.renderMessageView()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (website && website.length > 0) {
            Items.push(
                <div className="list-view" key={Identify.makeid()}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1">
                                {this.renderWebsiteView()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return Items;
    };

    renderGridView = () => {
        let Items = [];
        let phones = this.data.phone !== undefined ? this.data.phone : [];
        let emails = this.data.email !== undefined ? this.data.email : [];
        let message = this.data.message !== undefined ? this.data.message : [];
        let website = this.data.website !== undefined ? this.data.website : [];

        if (emails && emails.length > 0) {
            Items.push(
                <div className="item-row" key={Identify.makeid()}>
                    {this.renderEmailView()}
                </div>
            );
        }

        if (phones && phones.length > 0) {
            Items.push(
                <div className="item-row" key={Identify.makeid()}>
                    {this.renderPhoneView()}
                </div>
            );
        }

        if (message && message.length > 0) {
            Items.push(
                <div className="item-row" key={Identify.makeid()}>
                    {this.renderMessageView()}
                </div>
            );
        }

        if (website && website.length > 0) {
            Items.push(
                <div className="item-row" key={Identify.makeid()}>
                    {this.renderWebsiteView()}
                </div>
            );
        }

        return (
            <div className="contacts-grid-view">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1">
                            <div className="contacts-grid">
                                {Items}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render = () => {
        return (
            <div className="instant-contact">
                {parseInt(this.data.style, 10) === 0 && (
                    this.renderListView()
                )}

                {parseInt(this.data.style, 10) === 1 && (
                    this.renderGridView()
                )}

            </div>
        );
    }
}

export default Info;