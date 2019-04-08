/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/8/19
 * Time: 9:55 AM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import CustomerHelper from "../../../../Helper/Customer";
import Identify from "../../../../Helper/Identify";

class PageAbstract extends Abstract{
    constructor(props) {
        super(props);
        this.customer = CustomerHelper.getCustomerData() || {}
    }

    componentWillMount(){
        if(!this.customer.hasOwnProperty('firstname') || !this.customer.hasOwnProperty('email')){
            CustomerHelper.logout();
            this.replaceLink('/customer/account/login')
        }
    }

    renderPageTitle = (title) => {
        return <div className="page-title">{Identify.__(title).toUpperCase()}</div>
    }

    renderSectionHeader = (title = 'Section Title', link = null) => {
        return (
            <div className="section-header">
                <div className="section-title">{Identify.__(title)}</div>
                {link}
            </div>
        )
    };

    renderSection = (props = {class: '', title: '', content: ''}) => {
        return (
            <div className={`section ${props.class}`}>
                {props.title}
                <div className="section-content">
                    {props.content}
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(!CustomerHelper.isLogin()){
            this.replaceLink('/customer/account/login')
        }
    }

}
export default PageAbstract