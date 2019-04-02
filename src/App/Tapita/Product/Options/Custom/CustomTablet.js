import React from 'react';
import CustomAbstract from './CustomAbstract';

class CustomTablet extends CustomAbstract{

    render(){
        let btn = this.props.btnCart ?
            <div>
                {this.renderProductAddToCart(false,'option-qty','btn-cart')}
                {this.state.isPhone ? this.renderProductAddToCart(false,'option-qty','sticky-btn') :null}
            </div>: null;
        return (
            <div>
                {this.renderOptions()}
                {btn}
            </div>
        )
    }
}
CustomTablet.defaultProps = {
    btnCart : true
};
export default CustomTablet;