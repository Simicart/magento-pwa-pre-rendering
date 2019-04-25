import React from 'react' 
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NavigationMoreHoriz from '../../../../BaseComponent/Icon/Ellipsis';
import UserIcon from '../../../../BaseComponent/Icon/User';
import CustomerHelper from '../../../../Helper/Customer';
import Identify from '../../../../Helper/Identify';
import WishListIcon from '../../../../BaseComponent/Icon/Heart-shape-outline';
import Search from '../../../../BaseComponent/Icon/Search';
import CartIcon from '../../../../BaseComponent/Icon/Cart';
import Abstract from '../../../Core/BaseAbstract'
const configColor = Identify.getColorConfig()
class BottomMenu extends Abstract{
    constructor(props) {
        super(props)
        this.parent = props.parent
    }

    componentDidMount(){
        this.setLoaded(true)
    }

    render() {
        if(!this.state.loaded) return null
        let iconStyle = {
            width: 20, height: 17
        }
        let itemStyle = {
            color: configColor.top_menu_icon_color,
            maxWidth: 'unset',
            minWidth: 'unset'
        }
        let bottomNavi =  {
            width: '100%',
            marginRight: 0,
            backgroundColor: configColor.key_color,
            height: 55,
            position: 'fixed',
            display: 'inline-flex',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            /*
            WebkitBoxShadow: '0px -3px 6px 0px rgba(0,0,0,0.2)',
            boxShadow: '0px -3px 6px 0px rgba(0,0,0,0.2)',
            */
            transition: 'height 0.4s ease',
            borderTop: 'solid #eaeaea 1px',
        }
        const {cart_data} = this.props;
        let cartQty = cart_data && cart_data.hasOwnProperty('cart_total') ? cart_data.cart_total : 0
        let wishlistIcon = CustomerHelper.isLogin() ?
            <BottomNavigationAction
                className={`wishlist-icon-app-bar menu-item`}
                label={Identify.__('Wishlist')}
                style={itemStyle}
                onClick={() => {
                    this.pushLink("/wishlist")
                }}
                icon={<WishListIcon style={iconStyle}
                                    color={configColor.top_menu_icon_color}/>}/>
            : null;
        return (
            <BottomNavigation
                id="tapita-bottom-nav"
                className={`bottom-nav-action menu-bottom-item`}
                showLabels
                style={bottomNavi}
            >
                <BottomNavigationAction
                    className={`app-bar-menu menu-item`}
                    label={Identify.__('More')}
                    style={itemStyle}
                    onClick={() => this.parent.handleShowMenu()}
                    icon={<NavigationMoreHoriz style={iconStyle}
                                                color={configColor.top_menu_icon_color}/>}/>
                {wishlistIcon}
                <BottomNavigationAction
                    className={`menu-item`}
                    style={itemStyle}
                    onClick={CustomerHelper.isLogin() ? () => this.pushLink('/customer') : () => this.pushLink('/customer/account/login')}
                    label={CustomerHelper.isLogin() ? Identify.__('My Account') : Identify.__('Sign in')}
                    icon={<UserIcon style={iconStyle}
                                    color={configColor.top_menu_icon_color}/>}/>
                <BottomNavigationAction
                    className={`cart-icon-bottom-app-bar menu-item`}
                    style={itemStyle}
                    label={Identify.__('Cart')}
                    onClick={() => {
                        this.pushLink('/checkout/cart');
                    }}
                    icon={
                        <div style={{position: 'relative', marginBottom: '-4px'}}>
                            <CartIcon style={iconStyle}
                                        color={configColor.top_menu_icon_color}/>
                            <div style={{
                                position: 'absolute',
                                background: configColor.top_menu_icon_color,
                                color: configColor.key_color,
                                right: -6,
                                textAlign: 'center',
                                top: -6,
                                display: cartQty === 0 ? 'none' : 'unset',
                                padding: '0 3px',
                                borderRadius: '50%',
                                minWidth: 15,
                            }}
                                    className="cart-number">{cartQty}</div>
                        </div>}>
                </BottomNavigationAction>
                <BottomNavigationAction
                    className={`search-icon menu-item`}
                    style={itemStyle}
                    label={Identify.__('Search')}
                    onClick={() => {
                        this.pushLink('/search')
                    }}
                    icon={<Search style={iconStyle} color={configColor.top_menu_icon_color}/>}/>
            </BottomNavigation>
        );
    }
}

export default BottomMenu