import React from 'react'
import BaseAbstract from '../../../Core/BaseAbstract'
import '../cart.css'
import Identify from '../../../../Helper/Identify'
import CustomerHelper from '../../../../Helper/Customer'
import Divider from '@material-ui/core/Divider'
import MenuItemUI from '@material-ui/core/MenuItem'
import Deleteicon from '../../../../BaseComponent/Icon/Trash'
import ReactHTMLParse from 'react-html-parser'
import './SidebarItem.css';

class SidebarItem extends BaseAbstract {
    constructor(props) {
        super(props);
        let json = Identify.getMerchantConfig();
        this.tax_cart_display_price = json.storeview.tax.tax_cart_display_price;
        this.QtyFieldStyle = {
            border: '1px solid ' + this.configColor.button_background
        };
    }

    render() {
        let item = this.props.item;
        let price = Identify.formatPrice(item.price);
        let subtotal = price;
        if (parseInt(this.tax_cart_display_price) === 3) {
            subtotal = <div>
                <div>{Identify.formatPrice(item.row_total_incl_tax)}</div>
                <div>{Identify.formatPrice(item.row_total)}</div>
            </div>;
        } else if (parseInt(this.tax_cart_display_price) === 2) {
            subtotal = <div>{Identify.formatPrice(item.row_total_incl_tax)}</div>;
        } else {
            subtotal = <div>{Identify.formatPrice(item.row_total)}</div>;
        }
        let optionText = [];
        if (item.option) {
            let options = item.option;
            for (let i in options) {
                let option = options[i];
                optionText.push(
                <div key={Identify.makeid()}>
                    <b>{option.option_title}</b> : {ReactHTMLParse(option.option_value)}
                </div>
                );
            }
        }
        let itemOptions = [];
        for (let i = 1; i < 99; i++) {
            let itemop = <MenuItemUI className="item-number" key={Identify.makeid()} value={i} primaryText={i}/>;
            itemOptions.push(itemop);
        }
        let location = item.product_type === "simigiftvoucher" ? {
            pathname : `/product/giftcard/${item.product_id}`,
            state : {
                product_id: item.product_id,
                giftcard : true
            }
        } : `/product/${item.product_id}`;


        let merchantConfigs = Identify.getMerchantConfig();
        if(merchantConfigs.storeview.base.hasOwnProperty('connector_version') && merchantConfigs.storeview.base.connector_version >= '0.1.2'){
            this.new_version = true;
        }
        let moveToWishlist = (CustomerHelper.isLogin() && this.props.moveToWishlist && this.new_version)?
            <div className="item-move-to-wishlist">
                <div onClick={(e) => this.props.moveToWishlist(item.item_id)} style={{maxWidth: "400px", cursor: 'pointer'}}>
                    {Identify.__('Move to Wishlist')}
                </div>
            </div>:'';
            
        return (
            <div key={Identify.makeid()} style={{paddingLeft: '5px', marginRight:'15px'}}>
                <div className="cart-sidebar-item">
                    <div className="img-cart"
                          onClick={(e) => {
                              this.handleLink(location)
                              if (this.props.closeSideBar)
                                this.props.closeSideBar()
                          }}>
                        <div className="img-cart-container" style={{borderColor: this.configColor.image_border_color}}>
                            <img src={item.image} alt={item.name} />
                        </div>
                    </div>
                    <div className="cart-item-info">
                        <div className="des-cart">
                            <div style={{color: this.configColor.content_color}}
                                 onClick={(e)=>{
                                     this.handleLink(location)
                                     if (this.props.closeSideBar)
                                        this.props.closeSideBar()
                                 }}>
                                <div className="item-name">{item.name}</div>
                            </div>
                            <div className="item-options">{optionText}</div>
                        </div>
                        
                    </div>
                    <div className="cart-sidebar-item-price">
                        <div className="item-subtotal" style={{color: this.configColor.price_color}}>
                            {subtotal}
                        </div>
                        <div className="item-qty">
                            <input
                                min={1}
                                type="number"
                                pattern="[1-9]*"
                                defaultValue={item.qty}
                                onBlur={(event) =>
                                    {
                                        if(parseInt(event.target.value, 10) !== parseInt(item.qty, 10))
                                            this.props.handleEditCart(event, item.item_id, 0)
                                    }
                                }
                                style={this.QtyFieldStyle}
                            />
                        </div>
                    </div>
                </div>
                <div className="cart-sidebar-item-action">
                    {moveToWishlist}
                    <div className="item-delete" onClick={(e) => this.props.handleEditCart(e, item.item_id, 1)}>
                        <Deleteicon
                            style={{width: '22px', height: '22px'}} />
                    </div>
                </div>
                <Divider />
            </div>
        );
    }
}
export default SidebarItem;