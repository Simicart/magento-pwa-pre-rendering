import React from 'react';
import Abstract from '../../../../Core/BaseAbstract';
import Identify from "../../../../../Helper/Identify";
import IconDown from "../../../../../BaseComponent/Icon/Down";
import Price from "../../../../../BaseComponent/Price";

// const $ = window.$;

class ItemOrdered extends Abstract {
    constructor(props) {
        super(props);
        this.state.isPhone = window.innerWidth < 768;
        this.item = this.props.itemData;
        this.configs = Identify.getMerchantConfig() || {};
    }

    toggleOptionView = (item_id) => {
        const $ = window.$; 
        let currentItem = $('#btn-'+item_id);
        let iconElement = currentItem.find('svg');
        let option = currentItem.find('.tbl-option');
        option.toggleClass('hidden');
        if(currentItem.find('.tbl-option').css('display') === 'none'){
            iconElement.css('transform','rotate(0deg)')
        }else{
            iconElement.css('transform','rotate(180deg)')
        }
    }

    renderRowSubtotal(item) {
        let priceConfig = 1;
        if (this.configs.storeview !== undefined) {
            priceConfig = parseInt(this.configs.storeview.tax.tax_sales_display_subtotal, 10) || 0;
        }

        if(priceConfig === 1) {
            return (
                <div className="order-item-price">
                    <Price size={window.innerWidth < 768 ? 20 :28} prices={{price: item.row_total}}/>
                </div>
            )
        } else if (priceConfig === 2) {
            return (
                <div className="order-item-price">
                    <Price size={window.innerWidth < 768 ? 20 :28} prices={{price: item.row_total_incl_tax}}/>
                </div>
            )
        } else if(priceConfig === 3) {
            return (
                <div className="order-item-price">
                    <div className="price-with-label">
                        <span>{Identify.__('Excl. Tax') + ":"}</span>
                        &nbsp;
                        <Price size={window.innerWidth < 768 ? 20 :28} prices={{price: item.row_total}}/>
                    </div>
                    <div className="price-with-label">
                        <span>{Identify.__('Incl. Tax') + ":"}</span>
                        &nbsp;
                        <Price size={window.innerWidth < 768 ? 20 :28} prices={{price: item.row_total_incl_tax}}/>
                    </div>
                </div>
            )
        }
    }

    renderRowPrice(item) {
        let priceConfig = 1;
        if(this.configs.storeview !== undefined) {
            priceConfig = parseInt(this.configs.storeview.tax.tax_sales_display_price, 10) || 0;
        }

        if(priceConfig === 1) {
            return (
                <div className="order-item-price">
                    <Price prices={{price: item.price}}/>
                </div>
            )
        } else if(priceConfig === 2) {
            return (
                <div className="order-item-price">
                    <Price prices={{price: item.price_incl_tax}}/>
                </div>
            )
        } else if (priceConfig === 3) {
            return (
                <div className="order-item-price">
                    <div className="price-with-label">
                        <span>{Identify.__('Excl. Tax') + ":"}</span>
                        &nbsp;
                        <Price size={window.innerWidth < 768 ? 18 :28} prices={{price: item.price}}/>
                    </div>
                    <div className="price-with-label">
                        <span>{Identify.__('Incl. Tax') + ":"}</span>
                        &nbsp;
                        <Price size={window.innerWidth < 768 ? 18 :28} prices={{price: item.price_incl_tax}}/>
                    </div>
                </div>
            )
        }
    }
    
    renderItemOptions() {
        if(this.item.option.length > 0) {
            const optionsElement = this.item.option.map((option) => {
                return (
                    <tr key={Identify.makeid()}>
                        <th style={{padding: '0 5px'}}>{option.option_title}</th>
                        <td style={{padding: '0 5px'}}>{option.option_value}</td>
                    </tr>
                );
            });

            return (
                <div className="item-options" key={Identify.makeid()} id={`btn-${this.item.item_id}`}>
                    <div className="show-hide-option"
                         onClick={(e) => this.toggleOptionView(this.item.item_id)}
                         style={{
                             display: 'flex',
                             alignItems: 'center',
                             fontStyle: 'italic',
                             cursor: 'pointer'
                         }}><span>{Identify.__('View options')}</span>
                        <span style={{marginLeft: 5, marginTop: 7}}>
                            <IconDown style={{width: 16}}/>
                        </span>
                    </div>  
                    <table style={{fontSize: 12}}
                           className="tbl-option hidden">
                        <tbody>
                            {optionsElement}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    render() {
        let qtyOrdered = <p style={{margin: 0}}>{parseInt(this.item.qty_ordered, 10)}</p>;
        if (!this.state.isPhone) {
            qtyOrdered =
                <p style={{margin: 0}}>{Identify.__('Ordered:') + " " + parseInt(this.item.qty_ordered, 10)}</p>
        }
        return (
            <tr key={Identify.makeid()}>
                <td className="product-info">
                    <div className="name">{this.item.name}</div>
                    {this.renderItemOptions()}
                </td>

                {!this.state.isPhone && (
                    <td width={120}>{this.item.sku}</td>
                )}
                <td>{this.renderRowPrice(this.item)}</td>
                <td style={{minWidth: 80,paddingLeft:12}}>
                    {qtyOrdered}
                    {parseInt(this.item.qty_shipped, 10) !== 0 && !this.state.isPhone && (
                        <p style={{margin: 0}}>{Identify.__('Shipped:') + " " + parseInt(this.item.qty_shipped, 10)}</p>
                    )}

                </td>
                {!this.state.isPhone && (
                    <td>{this.renderRowSubtotal(this.item)}</td>
                )}
            </tr>
        );
    }
}

export default ItemOrdered;