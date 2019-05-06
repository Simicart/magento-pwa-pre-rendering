/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 10:51 AM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import CartIcon from '../../../../BaseComponent/Icon/Cart'
import IconButton from '../../../../BaseComponent/IconButton';
import Identify from "../../../../Helper/Identify";
const configColor = Identify.getColorConfig()
class CartQty extends Abstract{
    render(){
        const {cart_data} = this.props;
        let cartQty = cart_data && cart_data.hasOwnProperty('cart_total') ? cart_data.cart_total : 0
        return (
            <span className="right-icon-item checkout-cart"
                  onClick={() => {
                      this.props.handleShowCart()
                  }}
                  style={{position: 'relative', margin: 0}}>
                <IconButton className="cart-icon-app-bar" >
                    <CartIcon color={configColor.top_menu_icon_color}/>
                </IconButton>
                <div style={{
                    background: configColor.top_menu_icon_color,
                    color: configColor.key_color,
                    textAlign: 'center',
                    display: cartQty === 0 ? 'none' : 'unset',
                    position: 'absolute',
                    top: -2,
                    padding: '2px 7px',
                    right: -4,
                    fontSize:10,
                    borderRadius: '50%',
                    minWidth: 15,
                }}
                     className="cart-number">{cartQty}</div>
            </span>
        )
    }
}
export default CartQty