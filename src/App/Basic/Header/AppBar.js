import React from 'react'
import {Link} from 'simiLink'
import Abstract from '../../Core/BaseAbstract'
import Identify from "../../../Helper/Identify"
import Search from '../../../BaseComponent/Icon/Search'
import {CartQtyHoC} from "../../Tapita/Header/HoC"
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '../../../BaseComponent/Icon/Back'
import Menu from '../../../BaseComponent/Icon/Menu'
import LeftMenu from './LeftMenu/index'
import './style.scss'

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

    handleShowMenu = () => {
        this.LeftMenu.Menu.handleOpenSideBar()
    }

    renderBtnBack = ()=>{
        let html = null;

        if(Identify.isClient()){
            let pathname = window.location.pathname
            if(pathname.indexOf('checkout/onepage') > -1){
                html = <IconButton className="app-bar-back"
                                    onClick={() => window.history.back()}>
                            <BackIcon color={configColor.top_menu_icon_color}/>
                        </IconButton>
            }
        }
        return html;
    }

    renderLeftBar = ()=>{
        return (
            <div className="app-bar-item " id="left-bar">
                <IconButton className="app-bar-menu btn-show-menu" onClick={() => this.handleShowMenu()}>
                    <Menu color={configColor.top_menu_icon_color}/>
                </IconButton>
                {this.renderBtnBack()}
            </div>

        )
    }

    renderRightBar(){
        return (
            <div className="app-bar-item " id="right-bar">
                <span className="right-icon-item">
                    <IconButton className="search-icon"
                                onClick={() => {this.pushLink('/search')}}>
                        <Search color={configColor.top_menu_icon_color}/>
                    </IconButton>
                </span>
                <CartQtyHoC/>
            </div>
        )
    }

    renderAppBar = () => {
        let app_style = {
            height: '55px',
            backgroundColor: configColor.key_color
        };
        let rtl = '';
        if (Identify.isRtl()) {
            rtl = 'app-bar-rtl';
        }
        return (
            <div id="app-bar" className={rtl} style={app_style}>
                {this.renderLogo()}
                {this.renderLeftBar()}
                {this.renderRightBar()}
            </div>
        )
    }


    render(){
        return (
            <div style={{borderBottom: '1px solid #eeeeee'}}>
                {this.renderAppBar()}
                <LeftMenu ref={node => this.LeftMenu = node}/>
            </div>
        )
    }
}

export default AppBar;