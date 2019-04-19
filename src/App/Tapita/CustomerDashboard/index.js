/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/8/19
 * Time: 8:54 AM
 */
import React from 'react'
import Abstract from '../../Core/BaseAbstract'
import Layout from '../../../Layout/Tapita'
import Identify from "../../../Helper/Identify";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import './style.css'
import DownloadIcon from '../../../BaseComponent/Icon/Download'
import EmailIcon from '../../../BaseComponent/Icon/Email'
import DashboardIcon from '@material-ui/icons/Dashboard'
import UserIcon from '@material-ui/icons/Person'
import AddressIcon from '../../../BaseComponent/Icon/AddressBook'
import OrderIcon from '@material-ui/icons/CardTravel'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import { 
    Dashboard,
    MyOrder,
    Profile,
    OrderDetail,
    Address,
    MyDownloadable,
    Newsletter
} from "./HoC";

const styles = {
    icon: {
        width: 30,
        height: 30,
        fill: '#717171'
    }
}

const configColor = Identify.getColorConfig()
class CustomerDashboard extends Abstract {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            changePassword: false,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.page || nextProps.page === prevState.page) {
            return null
        }
        return { page: nextProps.page }
    }
    
    getMenuConfig = () => {
        let menuConfig = {
            dashboard: {
                title: 'Account Dashboard',
                page: 'dashboard',
                url: '/customer/dashboard',
                enable: true,
                icon: <DashboardIcon style={styles.icon} />
            },
            account: {
                title: 'Account Information',
                page: 'my-account',
                url: '/customer/account/edit',
                enable: true,
                icon: <UserIcon style={styles.icon} />
            },
            address: {
                title: 'Address Book',
                page: 'address edit-address',
                url: '/customer/address',
                enable: true,
                icon: <AddressIcon style={styles.icon} />
            },
            order_detail: {
                title: 'My Orders',
                page: 'my-order order-detail',
                url: '/sales/order/history',
                enable: true,
                icon: <OrderIcon style={styles.icon} />
            },
            my_downloadable: {
                title: 'My Downloadable Products',
                page: 'my-downloadable',
                url: '/downloadable/customer/products',
                enable: Identify.connectorVersion(),
                icon: <DownloadIcon style={styles.icon} />
            },
            newsletter: {
                title: 'Newsletter Subscriptions',
                page: 'newsletter',
                url: '/newsletter/manager',
                enable: true,
                icon: <EmailIcon style={styles.icon} />
            },
            logout: {
                title: 'Log out',
                url: '/customer/account/logout',
                enable: true,
                icon: <LogoutIcon style={styles.icon} />
            }
        }
        return menuConfig
    }

    handleClickMenu = (page, isUrl = true) => {
        if (isUrl) {
            this.pushLink(page)
            return
        }
        this.setState({ page })
    };

    renderMenu = () => {
        let menuStyle = {
            fontFamily: 'Montserrat, sans-serif',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            paddingLeft: 16,
            paddingRight: 0,
        };
        const menuConfig = this.getMenuConfig()
        const page = this.state.page;
        let menu = Object.keys(menuConfig).map((id, key) => {
            let item = menuConfig[id];
            let pageMenu = new String(item.page)
            return item.enable ?
                <ListItem
                    button
                    key={key}
                    className="menu-dashboard-item"
                    onClick={() => pageMenu.indexOf(page) > -1 ? null : this.handleClickMenu(item.url, true)}
                    style={menuStyle}
                >
                    <span className={`menu-title-item ${item.page}`}
                        style={{ fontSize: '16px', color: pageMenu.indexOf(page) > -1 ? configColor.button_background : '#333' }}>
                        {Identify.__(item.title)}
                    </span>
                </ListItem> : null
        }, this)
        return (
            <div className="menu-dashboard">
                <List>
                    {menu}
                </List>
            </div>
        )
    };

    renderContent() {
        const { page } = this.state;
        let content = <div />
        switch (page) {
            case 'dashboard':
                content = <Dashboard parent={this}/>;
                break;
            case 'my-account':
                content = <Profile parent={this} />;
                break;
            case 'my-order':
                content = <MyOrder parent={this} />
                break;
            case 'order-detail':
                content = <OrderDetail parent={this} />
                break;
            case 'address':
                content = <Address parent={this}/>
                break;
            case 'edit-address':
                content = <Address parent={this} page="edit-address"/>
                break;
            case 'downloadable':
                content = <MyDownloadable parent={this} />
                break;
            case 'newsletter':
                content = <Newsletter parent={this} />
                break;
            default :
                content = <Dashboard/>
        }
        return (
            <div className="content-dashboard">
                {content}
            </div>
        )
    }

    render() {
        return (
            <div className="container my-dashboard" style={{ marginBottom: 30 }}>
                <div className="row">
                    <div className="col-sm-3 hidden-xs">
                        {this.renderMenu()}
                    </div>
                    <div className="col-sm-9 col-xs-12">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}
export default CustomerDashboard