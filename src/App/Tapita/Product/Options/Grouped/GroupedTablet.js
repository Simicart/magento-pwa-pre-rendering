import React from 'react';
import GroupAbstract from './GroupedAbstract';

class GroupTablet extends GroupAbstract {
    render(){
        return (
            <div>
                {this.renderOptions()}
                {this.renderProductAddToCart(true)}
                {this.state.isPhone ? this.renderProductAddToCart(true,'option-qty','sticky-btn') :null}
            </div>
        )
    }
}
export default GroupTablet;