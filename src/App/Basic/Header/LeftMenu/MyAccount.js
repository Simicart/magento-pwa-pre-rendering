import React from 'react'
import Abstract from '../../../Core/BaseAbstract';
import UserIcon from '@material-ui/icons/Person';
import CustomerHelper from "../../../../Helper/Customer";
import Identify from "../../../../Helper/Identify";
import MenuItem from '../../../../BaseComponent/MuiMenuItem'
class MyAccount extends Abstract{
    constructor(props) {
        super(props);
        this.parent=this.props.parent
        this.styles = this.props.styles
    }

    render(){
        if(Identify.isClient() && !CustomerHelper.isLogin()){
            return <MenuItem icon={<UserIcon style={this.styles.iconMenu}/>}
                             title={Identify.__('Login')}
                             titleStyle={this.styles.menu}
                             onClick={()=>this.parent.handleMenuItem('/customer/account/login')}
            />
        }else{
            return <MenuItem icon={<UserIcon style={this.styles.iconMenu}/>}
                             title={Identify.__('My Account')}
                             titleStyle={this.styles.menu}
                             onClick={()=>this.parent.handleMenuItem('/customer')}
            />
        }
    }
}
export default MyAccount