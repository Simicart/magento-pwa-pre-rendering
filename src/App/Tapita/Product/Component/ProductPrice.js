import React from 'react';
import View from '../../../../BaseComponent/ViewComponent';
import Price from '../../../../BaseComponent/Price';
import Identify from "../../../../Helper/Identify";

class ProductPrice extends View {

    constructor(props){
        super(props);
        this.data = this.props.data.product;
        let prices = this.data.app_prices;
        this.state = {prices};
    }

    updatePrices(prices) {
        this.setState({prices: prices});
    }

    renderSkuStock(){
        let stockLabel = Identify.__('In stock');
        if (parseInt(this.data.is_salable, 10) !== 1) {
            stockLabel = Identify.__('Out of stock');
        }
        return (
            <div className="product-stock-status">
                <div className="stock-status">
                    {stockLabel}
                </div>
                {
                    this.data.sku &&
                    <div className="product-sku flex" id="product-sku">
                        <span className="sku-label">{Identify.__('Sku') + ": "}</span>
                        {this.data.sku}
                    </div>
                }
            </div>
        )
    }

    render(){
        let priceLabel = (this.data.type_id === "grouped")?'':(
            <div className="prices-layout">
                <Price config={1} prices={this.state.prices} type={this.data.type_id}/>
            </div>
        );
        return (
            <div className="prices-container" id={this.data.type_id}>
                {priceLabel}
                {this.renderSkuStock()}
            </div>

        );
    }
}
export default ProductPrice;