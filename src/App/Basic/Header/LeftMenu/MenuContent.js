import React from 'react'
import Abstract from '../../../Core/BaseAbstract';
import MyAccount from './MyAccount'
import MenuItem from '../../../../BaseComponent/MuiMenuItem'
import Identify from '../../../../Helper/Identify'
import HomeIcon from '@material-ui/icons/Home'
import Favorite from '@material-ui/icons/Favorite'
import CateTree from './CateTree'
import CustomerHelper from '../../../../Helper/Customer';
import Setting from './Setting'
import OrderIcon from '@material-ui/icons/CardTravel'
import Divider from "@material-ui/core/Divider";
import LogoutIcon from '@material-ui/icons/ExitToApp'

const configColor = Identify.getColorConfig();

const styles = {
    iconMenu: {
        fill: configColor.menu_icon_color,
        width: 27,
        height: 27
    },
    menu: {
        color: configColor.menu_text_color
    },
    divider: {
        backgroundColor: configColor.menu_line_color
    }
}

class MenuContent extends Abstract {
    constructor(props) {
        super(props);
        this.parent = this.props.parent;
    }

    handleMenuItem = (link) => {
        if (link) {
            this.parent.handleCloseMenu()
            this.pushLink(link)
        }
    }

    renderOrderHistory = () => {
        if (Identify.isClient() && CustomerHelper.isLogin()) {
            return <MenuItem icon={<OrderIcon style={styles.iconMenu} />}
                title={Identify.__('Order History')}
                titleStyle={styles.menu}
                onClick={() => this.handleMenuItem('/sales/order/history')}
            />

        }
        return null;
    }

    renderCms() {
        let data = Identify.getMerchantConfig()
        if (data instanceof Object && data.storeview && data.storeview.hasOwnProperty('cms')) {
            data = data.storeview.cms
            let obj = this;
            let imgRegex = /\.(gif|jpg|jpeg|tiff|png|ico|svg)$/i;
            let cms = data.cmspages.map(function (item,key) {
                let img = imgRegex.test(item.cms_image) ? item.cms_image : 'https://image.flaticon.com/icons/svg/470/470615.svg';
                if (parseInt(item.cms_status,10) === 1) {
                    let location= {
                        pathname: '/'+Url.convertToSlug(item.cms_title),
                        state: {cms_id : item.cms_id}
                    }
                    img = <img style={{width: '27px', height: '27px'}}
                               src={img} alt={`cms`}/>
                    return (
                        <MenuItem icon={img}
                                  title={Identify.__(item.cms_title)}
                                  titleStyle={styles.menu}
                                  key={key}
                                  onClick={()=>obj.handleMenuItem(location)}
                        />
                    );
                }else {
                    return null;
                }
            });
            return (cms);
        } else {
            return <div></div>;
        }
    }

    renderItemDownloadApp =()=> {
        let jsonSimiCart = Identify.getAppDashboardConfigs();
        if (Identify.isClient() && jsonSimiCart) {
            let config = jsonSimiCart['app-configs'][0];
            if(Identify.detectPlatforms() === 1 && config.ios_link){
                return (
                    <a href={config.ios_link} rel='noopener noreferrer' title="download-app" target="_blank">
                        <MenuItem icon={<DownloadIcon style={styles.iconMenu}/>}
                                  titleStyle={styles.menu}
                                  title={Identify.__('Download app')}
                        />
                    </a>
                )
            }else if(Identify.detectPlatforms() === 2 && config.android_link){
                return (
                    <a href={config.android_link} rel='noopener noreferrer' title="download-app" target="_blank">
                        <MenuItem icon={<DownloadIcon style={styles.iconMenu}/>}
                                  titleStyle={styles.menu}
                                  title={Identify.__('Download app')}
                        />
                    </a>
                )
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    renderLogout = () => {
        if(Identify.isClient() && CustomerHelper.isLogin()){
            return <MenuItem title={Identify.__('Log out')}
                             onClick={()=>this.handleMenuItem('/customer/account/logout')}
                             icon={<LogoutIcon style={styles.iconMenu}/>}
                             titleStyle={styles.menu}/>
        }
    }

    render() {
        let max_height = Identify.isClient() ? window.innerHeight : 'auto';
        return (
            <div className="list-menu-header" style={{ maxHeight: max_height }}>
                <MyAccount parent={this} styles={styles} />
                <MenuItem icon={<HomeIcon style={styles.iconMenu} />}
                    title={Identify.__('Home')}
                    titleStyle={styles.menu}
                    onClick={() => this.handleMenuItem('/')}
                />
                <MenuItem icon={<Favorite style={styles.iconMenu} />}
                    title={Identify.__('My Wishlist')}
                    titleStyle={styles.menu}
                    onClick={() => this.handleMenuItem('/wishlist')}
                />
                <CateTree parent={this} />
                {this.renderOrderHistory()}
                {this.renderCms()}
                <Setting parent={this} style={styles}/>
                <Divider style={{backgroundColor:configColor.menu_line_color}}/>
                {this.renderItemDownloadApp()}
                {this.renderLogout()}

                {/*
                {layout.basic_header_left_menu_content.render_more_before(this)}
                <div className="item-more">
                    <span>{Identify.__('More').toUpperCase()}</span>
                </div>
                {layout.basic_header_left_menu_content.render_more_after(this)}
                {this.renderContactUs()}
                {this.renderSwitchLink()} */}
            </div>
        )
    }
}

export default MenuContent;