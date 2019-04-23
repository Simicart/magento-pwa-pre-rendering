import React from 'react';
import BundleAbstract from './BundleAbstract';
import Button from '../../../../../BaseComponent/Button';
import Identify from "../../../../../Helper/Identify";
const configColor = Identify.getColorConfig()
const $ = window.$;
class BundleTablet extends BundleAbstract {


    handleChangeBtn = ()=>{

        $('.bundle-show-options').slideToggle('fast',function () {
            Identify.smoothScrollToView($('.customize-price-bundle'))
        });
        $('.product-add-cart').toggleClass('hidden');

    };

    renderBtnCustomize =()=>{
        return(
            <div className="" onClick={(e)=>this.handleChangeBtn()}>
                <Button
                    className="product-add-cart"
                    ref={(btn) => {
                        this.addCartBtn = btn
                    }}
                    style={{
                        height: "36px",
                        width: "auto",
                        float: "left",
                        padding : '0 20px',
                        marginBottom : Identify.isRtl() ? 0:'30px'

                    }}
                    textStyle={{
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: "600"
                    }}
                    text={Identify.__('Customize & Add to Cart')}
                />
            </div>
        )
    }

    render(){
        let price_style = {
            fontSize : 28,
            fontWeight : 800,
            color : configColor.price_color,
            marginTop : 15,
            marginRight : 10,
            display : 'inline-block'
        }
        return (
            <div>
                <div className="bundle-show-options" style={{display : 'none'}}>
                    <div className="product-name">{Identify.__('Customize')} {Identify.__(this.parentObj.product.name)}</div>
                    <div className="hide-options" style={{
                        color : configColor.button_background,
                        fontWeight: 100,
                        margin : '15px 0',
                        cursor : 'pointer'
                    }} onClick={()=>this.handleChangeBtn()}>{Identify.__('Back to product details')}</div>
                    {this.renderOptions()}
                    <div className="customize-price-bundle" style={{marginTop : 15}}>
                        <div className="product-name">{Identify.__('Your Customization')}</div>
                        <div className="configured_price_ex" style={{display: 'none'}}>
                            <span className="price" style={price_style}/>
                            <span className="label-price small"/>
                        </div>
                        <div className="configured_price_in" style={{display: 'none'}}>
                            <span className="price" style={price_style}/>
                            <span className="label-price small"/>
                        </div>
                        <div className="configured_label" style={{display: 'none'}}>
                            <span className="price" style={price_style}/>
                        </div>
                    </div>
                </div>
                <div className="btn-bundle">
                    {this.renderBtnCustomize()}
                    {this.renderProductAddToCart(false,'bundle-qty')}
                </div>
            </div>
        )
    }
}
export default BundleTablet;