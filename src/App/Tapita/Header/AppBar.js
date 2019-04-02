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
            backgroundColor: '#fff'
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

    render(){
        // console.log(SMCONFIGS)
        return (
            <div style={{borderBottom: '1px solid #eeeeee'}}>
                {this.renderAppBarPhone()}
                {this.renderBottomMenu()}
                <LeftMenu ref={node => this.LeftMenu = node}/>
            </div>
        )
    }
}
export default AppBar