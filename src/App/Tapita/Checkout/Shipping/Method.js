/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/20/18
 * Time: 4:04 PM
 */
import React from 'react';
import Identify from "../../../../Helper/Identify";
import Price from "../../../../BaseComponent/Price";
import Radio from '@material-ui/core/Radio'
class ShippingMethod extends React.Component {

    render = () => {
        let {data} = this.props;
        return (
            <div key={Identify.makeid()}
                onClick={this.props.onClick}
                id={data.s_method_code}
                className="shipping-method-item">
                <div key={Identify.makeid()} className="icon-selected-shipping">
                    <Radio checked={data.s_method_selected} color="primary"/>
                </div>
                <div className="method-item-content">
                    <div>
                        <div className="method-title">{data.s_method_title}</div>
                        <div className="method-name">{data.s_method_name}</div>
                    </div>
                    <div className="method-price"><Price prices={{price: data.s_method_fee}}/></div>
                </div>
            </div>

        );
    }

}

export default ShippingMethod;