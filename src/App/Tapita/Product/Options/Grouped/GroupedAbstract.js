import React from 'react';
import OptionAbstract from '../Abstract';
import Identify from '../../../../../Helper/Identify';
import Price from '../../../../../BaseComponent/Price';
class GroupAbstract extends OptionAbstract {

    renderOptions =()=>{
        let attributes = this.data.grouped_options;
        let objOptions = [];
        let labelRequired = '';

        for (let i in attributes) {
            let attribute = attributes[i];
            let values = attribute.id;
            let element = this.renderContentAttribute(attribute, values, labelRequired);
            objOptions.push(element);
        }
        let header = (
            <div className="row product-options-group-header">
                <div className={`col-sm-8 col-xs-8 ${Identify.isRtl()? 'pull-right' : ''}`} style={{textAlign: Identify.isRtl() ? 'right' : 'left',textTransform : 'uppercase',fontWeight : 600}}>
                    {Identify.__('Product')}
                </div>
                <div className={`col-sm-4 col-xs-4 ${Identify.isRtl()? 'pull-right' : ''}`} style={{textAlign: "center",textTransform : 'uppercase',fontWeight : 600,paddingLeft : 30}}>
                    {Identify.__('Qty')}
                </div>
            </div>
        );
        return (
            <div key={Identify.makeid()}>
                <form id="groupOption">
                    {(objOptions && objOptions.length > 0)?header:''}
                    {objOptions}
                </form>
            </div>);
    };

    updateOptions =(key,val)=>{
        this.selected[key] = val;
    };

    renderContentAttribute =(attribute, values, labelRequired) => {
        let key = attribute.id;
        this.updateOptions(key,key);
        let qty = attribute.qty;
        let outStock = parseInt(attribute.is_salable, 10) === 0;
        return (
            <div id={`attribute-${attribute.id}`} key={Identify.makeid()} className="row product-options-group-item">
                <div className={`col-sm-8 col-xs-8 ${Identify.isRtl()? 'pull-right' : ''}`}>
                    <div className="option-title" style={{fontWeight : 500}}>{attribute.name}{labelRequired}</div>
                    <Price config={1} type={'simple'} prices={attribute}/>
                </div>
                <div className={`col-sm-4 col-xs-4 text-center ${Identify.isRtl()? 'pull-right' : ''}`}>
                    {outStock ? <div style={{fontSize : 14}}>{Identify.__('Out of stock')}</div>
                        : this.renderOptionInputQty(key,qty)}
                </div>
            </div>);
    }

    getParams = () => {
        this.setParamQty('super_group');
        return this.params;
    }
}
export default GroupAbstract;