import React from 'react';
import ConfigurableAbstract from './Abstract';
import CustomTablet from '../Custom/CustomTablet';
class ConfigurableTablet extends ConfigurableAbstract{
    getParamsCustomOption = () => {
        if(this.Custom.data.custom_options){
            let params = this.Custom.selected;
            this.params['options'] = params;
        }
    };

    getParams = ()=>{
        if(!this.checkOptionRequired() || !this.Custom.checkOptionRequired()){
            return false;
        }
        this.setParamOption('super_attribute');
        this.getParamsCustomOption();
        this.setParamQty();
        return this.params;
    };

    render(){
        return <div>
            {this.renderOptions()}
            <div style={{marginTop : '30px'}}>
                <CustomTablet app_options={this.data}
                              parent={this.parentObj}
                              product_id={this.props.product_id}
                              btnCart={false}
                              ref={(custom) => this.Custom = custom}
                />
            </div>
            {this.renderProductAddToCart(false,'option-qty')}
            {this.state.isPhone ? this.renderProductAddToCart(false,'option-qty','sticky-btn') : null}
        </div>
    }
}
export default ConfigurableTablet;