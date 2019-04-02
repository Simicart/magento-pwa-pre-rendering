/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/1/19
 * Time: 3:44 PM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import ReactHTMLParse from 'react-html-parser'
import Identify from "../../../../Helper/Identify";
class TechSpec extends Abstract{
    render() {
        this.product = this.props.product
        if (this.product.additional && this.product.additional.length !== 0) {
            let techSpecContent = []
            for (var id in this.product.additional) {
                var item = this.product.additional[id];
                techSpecContent.push(<div key={Identify.makeid()} className="techspec-item">
                    <div className="techspec-item-label">{item.label}</div>
                    <div className="techspec-item-value">{ReactHTMLParse(item.value)}</div>
                </div>);
            }

            return (
                <div className="col-sm-6 col-md-6 col-sm-offset-3 col-sm-5-offset-3">
                    {techSpecContent}
                </div>
            )
        }
        return null
    }
}
export default TechSpec