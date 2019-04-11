/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 3:22 PM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import SideBar from '../../../../BaseComponent/SideBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Identify from '../../../../Helper/Identify';
import SwipeableViews from 'react-swipeable-views';
import MenuContent from './MenuContent'
import {CateTreeHoC} from "../HoC";

const configColor = Identify.getColorConfig()
const colorTranparent = Identify.getColorTranparent()
class LeftMenu extends Abstract{
    constructor(props) {
        super(props);
        this.state.tabIndex = 0
        let json = Identify.getMerchantConfig();
        this.cms = null;
        if (json && json.storeview) {
            this.cms = json.storeview.hasOwnProperty('cms') ? json.storeview.cms.cmspages:null;
            this.contacts = json.storeview.instant_contact || null;
        }
    }

    handleChangeTab = (e,value) => {
        this.setState({
            tabIndex: value,
        });
    };

    handleChangeIndex = index => {
        this.setState({ tabIndex: index });
    };

    renderTabMenu = ()=>{
        let rtl = Identify.isRtl() ? {axis : 'x-reverse'} : {};
        let tabRootStyle = {
            fontSize : '26px',
            height : '80px',
            width: '50%',
            opacity: 'unset'
        }
        let tabsStyle = {
            borderBottom : '1px solid '+configColor.menu_line_color,
        }
        return (
            <div>
                <Tabs
                    value={this.state.tabIndex}
                    style={tabsStyle}
                    onChange={this.handleChangeTab}
                    textColor="primary"
                    TabIndicatorProps={{style: {backgroundColor: configColor.menu_text_color}}}
                    variant="fullWidth"
                >
                    <Tab
                        key={`tab-cate-${Identify.isRtl()}`}
                        label={<span className="tab-label" style={{color : this.state.tabIndex === 0 ? configColor.menu_text_color : configColor.menu_text_color+colorTranparent.a80}}>{Identify.__("Category")}</span>}
                        id="tab-cate"
                        style={tabRootStyle}/>
                    <Tab
                        key={`tab-menu-${Identify.isRtl()}`}
                        label={<span className="tab-label" style={{color : this.state.tabIndex === 1 ? configColor.menu_text_color : configColor.menu_text_color+colorTranparent.a80}}>{Identify.__("Menu")}</span>}
                        id="tab-menu"
                        style={tabRootStyle}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.tabIndex}
                    onChangeIndex={this.handleChangeIndex}
                    {...rtl}
                >
                    <div>
                        <CateTreeHoC parent={this} show={this.state.tabIndex === 0}/>
                    </div>
                    <div >
                        <MenuContent parent={this}
                                     show={this.state.tabIndex === 1}
                                     data={this.cms}/>
                    </div>

                </SwipeableViews>
            </div>

        );
    };

    handleCloseMenu(){
        this.Menu.handleCloseSideBar()
    }

    render(){
        let menuStyle = {
            background : this.configColor.menu_background,
        };
        return(
            <SideBar
                ref={(menu) => this.Menu = menu}
                SideBarClass="left-menu-tapita"
                contentStyle={menuStyle}
                renderView={this.renderTabMenu()}
                showConfig='left'
                width={this.state.isPhone ? 300 : 400}
            />
        )
    }
}
export default LeftMenu