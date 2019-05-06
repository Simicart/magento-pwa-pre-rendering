import React from 'react';
import Abstract from '../../../Core/BaseAbstract'
import SideBar from "../../../../BaseComponent/SideBar";
import MenuContent from './MenuContent'
import Identify from '../../../../Helper/Identify';

const configColor = Identify.getColorConfig()

class LeftMenu extends Abstract{

    handleCloseMenu = ()=>{
        this.Menu.handleCloseSideBar()
    };

    handleOpenMenu = ()=>{
        this.Menu.handleOpenSideBar()
    }

    render(){
        let menuStyle = {
            background : configColor.menu_background,
        };

        let width_window = Identify.isClient() && window.innerWidth < 768 ? 256 : 400;

        return (
            <SideBar
                ref={(menu) => this.Menu = menu}
                SideBarClass="left-menu-base"
                contentStyle={menuStyle}
                renderView={<MenuContent parent={this}/>}
                showConfig='left'
                width={width_window}
            />
        )
    }
}
export default LeftMenu