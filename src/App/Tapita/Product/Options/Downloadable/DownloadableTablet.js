/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 5/5/18
 * Time: 11:24 PM
 */
import React from 'react';
import Abstract from './Abstract';
import CustomTablet from '../Custom/CustomTablet';
class DownloadableTablet extends Abstract {
    getParamsCustomOption = () => {
        if(this.Custom && this.Custom.data.custom_options){
            let params = this.Custom.selected;
            this.params['options'] = params;
        }
    };

    getParams = ()=>{
        if(!this.checkOptionRequired() || !this.Custom.checkOptionRequired()) return false;
        this.selected = this.selected[0];
        this.setParamOption('links');
        this.getParamsCustomOption();
        this.setParamQty();
        return this.params;
    };
    render(){
        return (
            <div>
                {this.renderOptions()}
                <div style={{marginTop : -15}}>
                    <CustomTablet app_options={this.data}
                                  parent={this.parentObj}
                                  product_id={this.props.product_id}
                                  btnCart={false}
                                  ref={(custom) => this.Custom = custom}
                    />
                </div>
                {this.renderProductAddToCart(false,'option-qty')}
                {this.state.isPhone ? this.renderProductAddToCart(false,'option-qty','sticky-btn') :null}
            </div>
        )
    }
}
export default DownloadableTablet;