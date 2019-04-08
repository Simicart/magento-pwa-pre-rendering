/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 11:46 AM
 */
import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import CustomerHelper from '../../../../Helper/Customer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IdentityIcon from '../../../../BaseComponent/Icon/User';
import IconButton from '../../../../BaseComponent/IconButton';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    menu: {
        fontSize: 16
    }
};
const configColor = Identify.getColorConfig()
class MyAccount extends Abstract {

    constructor(props) {
        super(props);

        this.state.open = false
        this.state.openAccountDialog = false
    }

    handleOpenMenu = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        if (!CustomerHelper.isLogin()) {
            //this.props.parent.handleMenuItem(layout,'/customer/account/login');
            // this.setState({openAccountDialog: true});
            this.pushLink('/customer/account/login')
            return;
        }
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClickMenu = (e, link) => {
        this.pushLink(link)
        this.setState({
            open: false,
        });
    }

    getMenuConfig = ()=>{
        let menuConfig = {
            dashboard : {
                title : 'My Account',
                page : 'dashboard',
                url : '/customer',
                enable : true,
            },
            order_detail : {
                title : 'My Orders',
                page : 'order-detail',
                url : '/sales/order/history',
                enable : true,
            },
            edit_address : {
                title : 'Address Book',
                page : 'edit-address',
                url : '/customer/address',
                enable : true,
            },
            account : {
                title : 'Account Information',
                page : 'my-account',
                url : '/customer/account/edit',
                enable : true,
            },


        }

        menuConfig = {
            ...menuConfig,
            ...{
                logout : {
                    title : 'Log out',
                    url : '/customer/account/logout',
                    enable : true,
                }
            }
        }
        return menuConfig;
    }

    render() {
        let obj = this
        let menu = this.getMenuConfig();
        return (
            <div style={{display: 'inline-block'}}>
                <IconButton className="user-icon"
                            onClick={(e) => this.handleOpenMenu(e)}>
                    <IdentityIcon
                        color={this.state.open ? configColor.button_background : configColor.top_menu_icon_color}/>
                </IconButton>
                <Menu
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleRequestClose}
                >
                    {Object.keys(menu).map(key => {
                        let item = menu[key];
                        return item.enable ?
                            <MenuItem classes={{root:obj.props.classes.menu}}
                                      key={key}
                                      onClick={(e) => obj.handleClickMenu(e, item.url)}>{Identify.__(item.title)}
                            </MenuItem> : null
                    })}
                </Menu>
            </div>

        )
    }
}

export default withStyles(styles) (MyAccount);