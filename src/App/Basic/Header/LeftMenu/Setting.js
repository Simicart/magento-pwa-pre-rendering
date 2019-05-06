import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Identify from "../../../../Helper/Identify";
import ListItemNested from "../../../../BaseComponent/MuiListItem/Nested";
import Storeview from "./Storeview";
import Currency from "./Currency";
import SettingIcon from '@material-ui/icons/Settings'

const configColor = Identify.getColorConfig();

class Setting extends Abstract{
    constructor(props) {
        super(props);
        this.parent = this.props.parent
        this.style = this.props.style
    }

    render = () => {
        const merchantConfigs = Identify.getMerchantConfig()
        try {
            const currencies = merchantConfigs.storeview.base.currencies
            const storeList = merchantConfigs.storeview.stores.stores
            if (currencies.length > 1 || storeList.length > 1) {
                let primarytext = <div className="menu-content">
                                    <div className="icon-menu">
                                        <SettingIcon style={this.style.iconMenu}/>
                                    </div>
                                    <div className="menu-title" style={this.style.menu}>
                                        {Identify.__('Settings')}
                                    </div>
                                </div>
                return (
                    <div key={Identify.makeid()} style={{color: configColor.menu_text_color}}>
                        <ListItemNested
                            primarytext={primarytext}
                        >
                            <Storeview parent={this} key={Identify.makeid()} />
                            <Currency parent={this} key={Identify.makeid()} />
                        </ListItemNested>
                    </div>
                )
            }
        } catch(err) {

        }
        return ''
    };
}
export default Setting