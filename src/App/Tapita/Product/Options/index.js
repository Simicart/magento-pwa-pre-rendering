import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from "../../../../Helper/Identify";
import ProductPrice from '../Component/ProductPrice'
import {CustomOptions,ConfigurableOptions,DownloadOptions,BundleOptions,GroupedOptions} from "../HoC";
import './option.css';

class Options extends Abstract {

    constructor(props) {
        super(props);
        this.product = this.props.data.product;
        this.app_options = this.product.app_options;
        this.product_type = this.product.type_id;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    renderModelOptionsTablet = () => {
        let option = <div className="no-options"/>
        switch (this.product_type) {
            case 'bundle':
                option = <BundleOptions key={Identify.makeid()}
                                       app_options={this.app_options}
                                       parent={this}
                                       product_id={this.product.entity_id}/>
                break;
            case 'configurable':
                option = <ConfigurableOptions key={Identify.makeid()}
                                             app_options={this.app_options}
                                             parent={this}
                                             product_id={this.product.entity_id}/>
                break;
            case 'grouped':
                option = <GroupedOptions key={Identify.makeid()}
                                        app_options={this.app_options}
                                        parent={this}
                                        product_id={this.product.entity_id}/>
                break;
            case 'downloadable':
                option = <DownloadOptions key={Identify.makeid()}
                                             app_options={this.app_options}
                                             parent={this}
                                             product_id={this.product.entity_id}/>
                break;
            default:
                option = <CustomOptions key={Identify.makeid()}
                                              app_options={this.app_options}
                                              parent={this}
                                              product_id={this.product.entity_id}/>
                break;
        }

        return (
            <div>
                {option}
            </div>
        );
    };

    render = () => {
        return (
            <div>
                <ProductPrice ref={(price) => this.Price = price} data={this.props.data}/>
                <div className="product-options-tablet" id="product-options">
                    {this.app_options && this.renderModelOptionsTablet()}
                </div>
            </div>
        );
    }
}
export default Options;