import React from 'react';
import Cart from '../../Core/Cart/CartAbstract';
import Loading from '../../../BaseComponent/Loading';
import './cart.css';
import Identify from '../../../Helper/Identify';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import SidebarItem from './CartComponent/SidebarItem';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Layout from '../../../Layout/Tapita'
import Total from '../../../BaseComponent/Total'
import { SubscribeOne } from 'unstated-x';
import { AppState } from '../../../Observer/AppState';

class CartTapita extends Cart {
    state = {
        coupon_code: ''
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cart_data !== prevState.simiData) {
            return { simiData: nextProps.cart_data }
        }
        return null;
    }

    onChange = (e) => {
        let coupon_value = e.target.value;
        this.setState({coupon_code: coupon_value})
    }

    renderCouponView() {
        let value = "";

        let couponForm = (
            <div className="coupon-code" id="cart-coupon-form"
                style={{ display: "none" }}>
                <div className="coupon-code-title">{Identify.__('Enter a coupon code')}</div>
                <div style={{ display: 'flex' }}>
                    <div className="coupon-code-area-tablet">
                        <input type="text"
                            placeholder={Identify.__('Enter a coupon code')}
                            defaultValue={value} 
                            onChange={this.onChange}
                        />
                    </div>
                    <div id="submit-coupon-tablet" onClick={() => this.handleCoupon(this.state.coupon_code)} style={{
                        backgroundColor: this.configColor.button_background,
                        color: this.configColor.button_text_color
                    }}>{Identify.__('Apply')}</div>
                </div>
            </div>);
        let icon = <div style={{ marginLeft: "auto" }}>
            <ArrowDown id="tablet-coupon-down" className="item-icon" style={{ fill: 'black' }} />
        </div>;
        return (
            <div>
                <div id="coupon-display-handler-tablet"
                    style={{ color: this.configColor.button_background }}
                    onClick={() => this.handleDisplayCoupon()}>
                    {Identify.__('Apply discount code')}
                    {icon}
                </div>
                {couponForm}
            </div>
        );
    }

    handleDisplayCoupon() {
        const $ = window.$
        $('#cart-coupon-form').slideToggle(345, function () {
            if ($(this).is(':visible')) {
                $('#tablet-coupon-down').css('transform', 'rotate(180deg)');
            } else {
                $('#tablet-coupon-down').css('transform', 'rotate(360deg)');
            }
        });
    }

    renderItems() {
        if (!this.state.simiData || !this.state.simiData.quoteitems)
            return
        let quoteItems = this.state.simiData.quoteitems;
        //3 both, 1 ex, 2 in
        let obj = [];
        obj.push(
            <li key={Identify.makeid()} className="cart-item-header">
                <div style={{ width: '80%', textAlign: 'start' }}>{Identify.__('Items').toUpperCase()}</div>
                <div style={{ width: '20%', textAlign: 'end' }}>{Identify.__('Subtotal').toUpperCase()}</div>
            </li>
        );
        for (let i in quoteItems) {
            let item = quoteItems[i];
            let element = <SidebarItem key={Identify.makeid()}
                item={item}
                handleEditCart={this.handleEditCart} />
            //  moveToWishlist={this.moveToWishlist}/>;
            obj.push(element);
        }
        return <ul className="cart-list">{obj}</ul>;
    }

    renderTotalView = () => {
        return <Total data={this.state.simiData.total} />
    }

    renderCheckoutButton() {
        return (
            <div id="go-checkout-tablet" onClick={(e) => this.handleGoCheckout()} style={{
                backgroundColor: this.configColor.button_background,
                color: this.configColor.button_text_color
            }}>{Identify.__('Proceed to Checkout').toUpperCase()}</div>
        );
    }

    render() {
        const loading = this.state.loaded ? '' :
            <div
                className="tapita-cart-page-loading"
                style={{ borderBottom: `solid 1px ${this.configColor.line_color}` }}
            >
                {console.log(this.state.loaded)}
                <Loading
                    loadingStyle={{ width: 25, height: 25 }}
                    divStyle={{ marginTop: 0 }}
                />
            </div>
        if (!this.state.simiData || !this.state.simiData.cart_total || this.state.simiData.all_ids.length <= 0) {
            // const $ = window.$
            // $('.cart-number').text(0);
            return (
                <Layout>
                    <div className="cart-page-static cart-page-tapita">
                        {loading}
                        <div className="empty-cart">
                            {Identify.__('You have no items in your shopping cart')}
                        </div>
                    </div>
                </Layout>);
        } else {
            // const $ = window.$  
            // $('.cart-number').text(this.state.simiData.cart_total);
            return (
                <Layout>
                    <div className="cart-page-static cart-page-tapita" style={{ maxWidth: '740px', margin: '15px auto', padding: '0 5px' }}>
                        {loading}
                        <div className="cart-title"><b>{Identify.__('SHOPPING CART')}</b></div>
                        {this.renderItems()}
                        {this.renderCouponView()}
                        {/* {layout.tapita_cart_abstract.after_render_couponcode_view(this)} */}
                        {this.renderTotalView(this.state.data)}
                        {this.renderCheckoutButton()}
                    </div>
                </Layout>
            );
        }
    }
}

const CartPage = props => (
    <SubscribeOne to={AppState} bind={['cart_data']}>
        {app => <CartTapita cart_data={app.state.cart_data}
            updateCart={(data) => app.updateCart(data)}
            {...props} />}
    </SubscribeOne>
)
export default CartPage;
