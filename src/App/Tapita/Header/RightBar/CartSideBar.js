import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import SideBar from '../../../../BaseComponent/SideBar';
import NavigationClose from '../../../../BaseComponent/Icon/Close';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CustomerHelper from '../../../../Helper/Customer'
import {Dynamic} from "../../../../BaseComponent/Async";

const CartHoC = props => <Dynamic component={() => import('../../Cart/index')}{...props}/>

class CartSideBar extends Abstract {
    constructor(props) {
        super(props);
        let isPhone = this.state.isPhone;
        this.state = {
            data: null,
            loaded: false,
            isPhone
        }
        // this.supportNavigatorShare = window.navigator.share !== undefined || false;
        this.addCart = false;
        this.removeItem = false;
    }

    render() {
        return (
            <SideBar
                ref={(cart) => this.cartSideBar = cart}
                SideBarClass="cart-sidebar"
                contentStyle={{ background: '#fff', opacity: 1 }}
                renderView={<CartHoC parent={this} sideBar={true} handleCloseCart={this.props.handleCloseCart}/>}
                showConfig='right'
                width={0.6 * window.innerWidth}
                classToggleSideBar='.cart-icon-app-bar'
            />
        )

    }

}

export default CartSideBar;