/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 4:25 PM
 */
import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify'
// import Analytics from '../../../../Helper/Analytics'
import CustomerHelper from '../../../../Helper/Customer';
import List from '@material-ui/core/List';
import ListItem from '../../../../BaseComponent/MuiListItem/Text';
import ListItemNested from '../../../../BaseComponent/MuiListItem/Nested';
import Storeview from './Storeview'
import Currency from './Currency'
import {withStyles} from '@material-ui/core/styles'
// import {layout} from "../../../../Observer/layout";
import Slide from "@material-ui/core/Slide";
const configColor = Identify.getColorConfig()
let styles = theme => ({
    listItemStyle: {
        lineHeight: 24,
        color : configColor.menu_text_color,
        fontSize : 20,
        fontFamily: 'Montserrat , sans-serif',
        padding: 16
    }
});

class LeftMenuTabContent extends Abstract {

    handleMenuItem = (url) => {
        this.props.parent.handleCloseMenu();
        this.pushLink(url)
        if (url) {
            // Analytics.analyticsTracking(
            //     {
            //         mixpanel : true,
            //         ga : false
            //     },
            //     {
            //         action: `clicked_menu_item`,
            //         menu_item_name: location.pathname,
            //     }
            // )
        }
    };

    renderSettings = () => {
        const merchantConfigs = Identify.getMerchantConfig()
        try {
            const currencies = merchantConfigs.storeview.base.currencies;
            const storeList = merchantConfigs.storeview.stores.stores[0].storeviews.storeviews;
            if (currencies.length > 1 || storeList.length > 1)
                return (
                    <div key="setting-row-item" style={{color: configColor.menu_text_color}}>
                        <ListItemNested
                            className={this.props.classes.listItemStyle}
                            primarytext={<span className="cms-menu-text root-menu">{Identify.__('Settings')}</span>}
                        >
                            <Storeview parent={this} key={Identify.makeid()} className={this.props.classes.listItemStyle}/>
                            <Currency parent={this} key={Identify.makeid()} className={this.props.classes.listItemStyle}/>
                        </ListItemNested>
                    </div>
                )
        } catch(err) {

        }
    };

    renderCmsItem = (data = this.props.data) => {
        if (data && data.length > 0) {
            let obj = this;
            let cms = data.map(function (item) {
                let urlPath =  `/cms/${item.cms_id}`
                return (
                    <div key={`cms-menu-item-${item.cms_id}`} onClick={(e) => obj.handleMenuItem(urlPath)}
                         style={{color: configColor.menu_text_color}}>
                        <ListItem
                            primarytext={<span className="cms-menu-text root-menu">{Identify.__(item.cms_title)}</span>}
                            className={this.props.classes.listItemStyle}
                        />
                    </div>
                )
            }, this);
            return cms;
        }
        return <div></div>;
    };

    renderContactUsLink = () => {
        let url = '/contacts'
        return (
            <div key="contact-us-menu-item" onClick={() => this.handleMenuItem(url)}>
                <ListItem primarytext={<span className="cms-menu-text root-menu">{Identify.__('Contact Us')}</span>}
                          className={this.props.classes.listItemStyle}/>
            </div>
        );
    };

    renderItem = (name, link) => {
        name = <span className="cms-menu-text">{Identify.__(name)}</span>
        return (
            <ListItem key={Identify.makeid()}
                      onClick={() => this.handleMenuItem(link)}
                      primarytext={Identify.__(name)}
                      className={this.props.classes.listItemStyle}
                      classes={{
                          root: 'left-menu-content-item'
                      }}
            />
        )
    }

    renderMyAccount = () => {
        if (!CustomerHelper.isLogin()) return null;
        let menu_config = {
            profile : {
                title : 'Profile',
                link : '/customer/account/edit',
                is_show : true
            },
            address:{
                title : 'Address Book',
                link : '/customer/address',
                is_show : true
            },
            my_order:{
                title : 'My Orders',
                link : '/sales/order/history',
                is_show : true
            }
        };
        menu_config = {
            ...menu_config,
            // ...layout.tapita_header_left_menu_content.render_my_account,
            ...{
                logout : {
                    title : 'Log out',
                    link : '/customer/account/logout',
                    is_show : true
                }
            }
        }
        return (
            <div key={Identify.makeid()} style={{color: configColor.menu_text_color}}>
                <ListItemNested
                    primarytext={<span className="cms-menu-text root-menu">{Identify.__('My Account')}</span>}
                    className={this.props.classes.listItemStyle}
                >
                    {
                        Object.keys(menu_config).map(id => {
                            let item = menu_config[id];
                            return item.is_show ? this.renderItem(item.title,item.link) : null
                        })
                    }
                </ListItemNested>
            </div>
        )
    };

    // addStorelocatorMenuItem = () => {
    //     let location = {
    //         pathname: '/storelocator'
    //     };
    //     if (Plugin.isPluginEnabled(simicartPlugins.STORELOCATOR)) {
    //         return (
    //             <div id={Identify.makeid()} onClick={() => this.handleMenuItem(location)}>
    //                 <ListItem
    //                     primarytext={<span className="cms-menu-text root-menu">{Identify.__('Store Locator')}</span>}
    //                     className={this.props.classes.listItemStyle}/>
    //             </div>
    //         );
    //     }
    // }

    render() {
        let isPhone = this.state.isPhone;
        return (
            <div style={{
                padding: 0,
                height: window.innerHeight - 120 + 'px'
            }}>
                <Slide direction='left' in={this.props.show} mountOnEnter unmountOnExit>
                    <List id="cms-menu">
                        {isPhone ? this.renderMyAccount() : null}
                        {this.renderContactUsLink()}
                        {this.renderCmsItem()}
                        {this.renderSettings()}
                    </List>
                </Slide>
            </div>
        )
    }
}

export default withStyles(styles)(LeftMenuTabContent);