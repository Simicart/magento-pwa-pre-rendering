/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 4:22 PM
 */
import React from 'react'
import {Link} from 'simiLink'
import {CartQtyHoC} from "./HoC";
import MyAccount from './RightBar/MyAccount'
import Abstract from '../../Core/BaseAbstract'
import {BottomMenuHoC} from "./HoC";
import LeftMenu from './LeftMenu'
import './style.css'
import Identify from "../../../Helper/Identify";
import CustomerHelper from "../../../Helper/Customer";
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '../../../BaseComponent/Icon/Back'
import Menu from '../../../BaseComponent/Icon/Menu';
import Search from '../../../BaseComponent/Icon/Search'
import SearchBar from './Component/Search'
import WishListIcon from '../../../BaseComponent/Icon/Heart-shape-outline'
const configColor = Identify.getColorConfig()
class AppBar extends Abstract{
    renderLogo = ()=>{
        return (
            <div id="app-logo">
                <Link route={'home'}>
                    <a>
                        <img style={{display: 'inline-block'}}
                             alt={'App Logo'}
                             src={"https://theme.zdassets.com/theme_assets/835315/46b5860567f3d9e07649c775676d979ab45b5b85.png"}/>
                    </a>
                </Link>
            </div>
        )
    }

    renderAppBarPhone = ()=>{
        let app_style = {
            height: '55px',
            backgroundColor: configColor.key_color
        };
        return (
            <div id="app-bar" style={app_style} className="app-bar-phone">
                {this.renderLogo()}
                <div className="app-bar-item " id="left-bar"/>
                {this.renderRightBar()}
            </div>
        )
    }

    renderRightBar(){
        return (
            <div className="app-bar-item " id="right-bar">
                <span className="right-icon-item">
                    <MyAccount/>
                </span>
                <CartQtyHoC/>
            </div>
        )
    }

    renderBottomMenu(){
        if (this.state.isPhone) {
            return <BottomMenuHoC parent={this}/>
        }
    }

    handleShowMenu = () => {
        this.LeftMenu.Menu.handleOpenSideBar()
    }

    renderAppTablet(){
        let app_style = {
            height: '55px',
            backgroundColor: configColor.key_color
        };
        let rtl = '';
        let screen_w = window.innerWidth;
        if (screen_w >= 768 && screen_w < 1024) {
            app_style.paddingLeft = '30px';
            app_style.paddingRight = '40px';
        }
        let rightIconStyle = {};
        if (Identify.isRtl()) {
            rightIconStyle = {
                right: 'unset',
                left: 0
            };
            rtl = 'app-bar-rtl';
        }

        let pathname = window.location.pathname;
        let wishlistIcon = CustomerHelper.isLogin() ?
            <IconButton className="wishlist-icon-app-bar"
                        onClick={this.handleWishListIcon}
            >
                <WishListIcon
                    color={configColor.top_menu_icon_color}
                />
            </IconButton> : null;
        return (
            <div id="app-bar" className={rtl} style={app_style}>
                {this.renderLogo()}
                <div className="app-bar-item " id="left-bar">
                    <IconButton className="app-bar-back"
                                style={{padding: 0, display: 'none', color: configColor.top_menu_icon_color}}
                                onClick={() => window.history.back()}>
                        <BackIcon color={configColor.top_menu_icon_color}/>
                    </IconButton>
                    <IconButton className="app-bar-menu" onClick={() => this.handleShowMenu()}>
                        <Menu color={configColor.top_menu_icon_color}/>
                    </IconButton>
                </div>
                <div className="app-bar-item " id="right-bar">
                    {pathname.indexOf('checkout/onepage') < 0 && (
                        <div className="right-icon" id="basic-icon" style={rightIconStyle}>
                            <span className="right-icon-item">
                                {wishlistIcon}
                                </span>
                            <span className="right-icon-item">
                                <MyAccount parent={this}/>
                            </span>
                            <span className="right-icon-item">
                                <IconButton className="search-icon"
                                            onClick={() => {
                                                this.handleShowSearchbar()
                                            }}>
                                    <Search color={configColor.top_menu_icon_color}/>
                                </IconButton>
                            </span>
                            <CartQtyHoC/>
                        </div>
                    )}

                    {this.renderSignInLink()}
                </div>
            </div>
        )
    }

    handleShowSearchbar = () => {
        document.getElementById('search-bar').style.display = 'flex';
        document.getElementById('app-bar').style.display = 'none';
    }

    renderSignInLink = () => {
        let location = {
            pathname: '/customer/account/login',
            pushTo: '/checkout/onepage'
        }
        let pathname = window.location.pathname;
        if(pathname.indexOf('/checkout/onepage') > -1){
            return (
                <div className="right-icon" id="sign-link">
                    {!CustomerHelper.isLogin() && (
                        <Link className="sign-link-action" to={location} style={{
                            color: configColor.button_background,
                            fontSize: 20,
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}>{Identify.__('Sign In')}</Link>
                    )}
                </div>
            );
        }

    };

    render(){
        // console.log(SMCONFIGS)
        return (
            <div style={{borderBottom: '1px solid #eeeeee'}}>
                {this.state.isPhone ? this.renderAppBarPhone() : this.renderAppTablet()}
                {this.renderBottomMenu()}
                {!this.state.isPhone && <SearchBar parent={this}/>}
                <LeftMenu ref={node => this.LeftMenu = node}/>
            </div>
        )
    }
}
export default AppBar