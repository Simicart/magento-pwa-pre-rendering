/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 11/16/18
 * Time: 2:56 PM
 */
import MethodAbstract from './MethodAbstract'
import React from "react";
import Identify from "../../../Helper/Identify";

class Paypal extends MethodAbstract {

    renderTitle = (data) => {
        return (
            <div className="payment-title flex">
                <div>
                    <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png"
                         alt="Paypal"/>
                </div>

                <div style={{margin:'0 10px'}}>
                    <a href="https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside"
                        rel="noopener noreferrer" target="_blank">{Identify.__('What is Paypal ?')}</a>
                </div>
            </div>
        )
    }

    render() {
        return this.renderPayment();
    }
}

export default Paypal