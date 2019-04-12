/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/21/18
 * Time: 9:51 AM
 */
import React from 'react';
import CheckoutSection from "../../../Core/Checkout/CheckoutSection";
import Identify from "../../../../Helper/Identify";
import Panel from '../../../../BaseComponent/Panel'
import Button from '@material-ui/core/Button'
const configColor = Identify.getColorConfig()
class CouponCode extends CheckoutSection {

    expandView = () => {
        const $ = window.$;
        $('.coupon-content').slideToggle(345, function () {
            if ($(this).is(':visible')) {
                $('#expand-view .icon-arrow').css('transform', 'rotate(360deg)');
            } else {
                $('#expand-view .icon-arrow').css('transform', 'rotate(180deg)');
            }
        });
    };

    handleApplyCoupon = (type='apply') => {
        const $ = window.$;
        let couponValue = $('#coupon_code').val();
        if (couponValue === '' || !couponValue) {
            Identify.showToastMessage('Please enter coupon code !');
            return;
        }

        if(type === 'remove'){
            couponValue = '';
            this.remove = true;
        }

        let params = {coupon_code : couponValue};
        Identify.showLoading();
        this.CheckoutParent.requestUpdateOrder(params)
        // Analytics.analyticsTracking(
        //     {
        //         mixpanel : true,
        //         ga : false
        //     },
        //     {
        //         action: 'apply_coupon_code_checkout',
        //         value: couponValue,
        //     }
        // )
    };

    componentDidUpdate(){
        const $ = window.$;
        if(this.remove){
            $('input#coupon_code').val('');
            this.remove = false
        }
    }

    renderContent = () => {
        const {order_total} = this.props;
        let defaultCouponValue = order_total.coupon_code !== undefined && order_total.coupon_code !== '' && order_total !== null ? order_total.coupon_code
            : '';
        return (
            <div className="coupon-content">
                <div className="form-field-item coupon">
                    <input type='text'  name="coupon" defaultValue={defaultCouponValue}
                           className="coupon-input"
                           placeholder={Identify.__('Enter a coupon code')}
                           id="coupon_code"/>
                </div>
                <div className="coupon-btn" style={{marginTop:10}}>
                    {defaultCouponValue && (
                        <Button variant="text"
                                id="remove-coupon-btn"
                                onClick={() => this.handleApplyCoupon('remove')}
                                style={{backgroundColor:'#fff'}}>
                            <div style={{color:configColor.button_background}}>{Identify.__('Cancel')}</div>
                        </Button>
                    )}
                    <Button id="apply-coupon-btn"
                            color="primary"
                            variant="text"
                            style={{color:configColor.button_text_color,backgroundColor:configColor.button_background}}
                            onClick={() => this.handleApplyCoupon()}>
                        {Identify.__('Apply')}
                    </Button>
                </div>

            </div>
        )
    }

    render () {
        return (
            <div className="checkout-section" id="coupon-code-section">
                <Panel expanded={true}
                       title={this.renderSectionTitle('Coupon Code')}
                       renderContent={this.renderContent()}
                />
            </div>
        );
    }
}
export default CouponCode;
