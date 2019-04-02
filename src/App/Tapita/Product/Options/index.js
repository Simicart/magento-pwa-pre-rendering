import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from "../../../../Helper/Identify";
import dynamic from 'next/dynamic'
import './option.css';

const CustomOptionsTapita = dynamic({
    loader : ()=>import(/* webpackChunkName: "CustomOptionsTapita"*/'./Custom/CustomTablet')
})
class Options extends Abstract {

    constructor(props) {
        super(props);
        this.app_options = this.props.app_options;
        this.product_type = this.props.product_type;
        this.product = this.props.product;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    renderModelOptionsTablet = () => {
        let option = <div className="no-options"></div>
        option = <CustomOptionsTapita key={Identify.makeid()}
                                      app_options={this.app_options}
                                      parent={this}
                                      product_id={this.props.product.entity_id}/>

        return (
            <div>
                {option}
            </div>
        );
    };

    render = () => {
        return (
            <div>
                <div className="product-options-tablet" id="product-options">
                    {this.app_options && this.renderModelOptionsTablet()}
                </div>
            </div>
        );
    }
}
export default Options;