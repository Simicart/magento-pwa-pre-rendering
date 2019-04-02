/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 5/5/18
 * Time: 11:07 PM
 */
import React from 'react';
import OptionAbstract from '../Abstract';
import Identify from '../../../../../Helper/Identify';
import Select from '../Type/Select';
import Checkbox from '../Type/Checkbox';
import Radio from '../Type/Radio';
const $ = window.$;
class Abstract extends OptionAbstract {

    constructor(props){
        super(props);
        this.exclT = 0;
        this.inclT = 0;
    }

    renderOptions =()=>{
        let objOptions = [];
        if (this.data.download_options) {
            let attributes = this.data.download_options;
            let labelRequired = "";
            let type = 'multi';
            for (let i in attributes) {
                let attribute = attributes[i];
                if (attribute.isRequired === 1) {
                    labelRequired = this.renderLabelRequired(1);
                    this.required.push(0)
                }

                if (attribute.type === "multiple"
                    || attribute.type === "checkbox") {
                    type = 'multi';
                } else {
                    type = attribute.type;

                }

                let element = this.renderAttribute(type,attribute,i,labelRequired);
                objOptions.push(element);
            }
        }
        return (
            <div>
                <form id="downloadableOption" className="product-options-tablet">
                    {objOptions}
                </form>
            </div>
        );
    };

    renderAttribute = (type,attribute,id,labelRequried)=>{
        return (
            <div key={Identify.makeid()} className="option-select">
                <div className="option-title">
                    <span>{attribute.title} {labelRequried}</span>
                </div>
                <div className="option-content">
                    <div className="options-list">
                        {this.renderContentAttribute(attribute,type,id)}
                    </div>
                </div>
            </div>
        )
    };

    renderMultiCheckbox =(ObjOptions, type = 'multi', id = '0')=>{
        let options = ObjOptions.value;
        let objs = [];
        for (let i in options) {
            let item = options[i];
            let price = item.price  ? item.price
                : item.price_including_tax ? item.price_including_tax.price : 0;
            let label  = this.renderLabelOption(item.title,price);
            let element = (
                <div key={Identify.makeid()} className="option-row">
                    <Checkbox id={id} label={label} value={item.id} parent={this}/>
                </div>);

            objs.push(element);
        }
        return objs;
    };

    renderContentAttribute = (ObjOptions, type = 'single', id = '0') => {
        let key = id;
        if(type === 'select'){
            return <Select data={ObjOptions} id={key} parent={this}/>
        }
        if(type === 'single' || type ==='radio'){
            return <Radio data={ObjOptions} id={key} parent={this} />
        }
        if(type === 'multi' || type === 'checkbox'){
            return this.renderMultiCheckbox(ObjOptions, type, id)
        }
    }

    updatePrices = (selected = this.selected)=>{
        let prices = this.getStatePrice();
        if (this.showBothTax === true) {
            //set price when choosing
            prices.price_excluding_tax.price -= this.exclT;
            prices.price_including_tax.price -= this.inclT;
        } else {
            prices.regural_price -= this.exclT;
            prices.price -= this.exclT;
        }
        this.exclT = 0;
        this.inclT = 0;
        let downloadableOptions = this.data.download_options;
        selected = selected[0];
        for (let d in downloadableOptions) {
            let option = downloadableOptions[d];
            let values = option.value;
            for (let v in values) {
                let value = values[v];
                if (Array.isArray(selected)) {
                    if (selected.indexOf(value.id) !== -1) {
                        if (value.price_excluding_tax) {
                            this.exclT += parseFloat(value.price_excluding_tax.price);
                            this.inclT += parseFloat(value.price_including_tax.price);
                            this.showBothTax = true;
                        } else {
                            this.exclT += value.price;
                        }
                    }
                } else {
                    if (value.id === selected) {
                        //add price
                        if (value.price_excluding_tax) {
                            this.exclT += parseFloat(value.price_excluding_tax.price);
                            this.inclT += parseFloat(value.price_including_tax.price);
                            this.showBothTax = true;
                        } else {
                            this.exclT += parseFloat(value.price);
                        }
                    }
                }

            }
        }

        if (this.showBothTax === true) {
            //set price when choosing
            prices.price_excluding_tax.price += this.exclT;
            prices.price_including_tax.price += this.inclT;
        } else {
            prices.regural_price += this.exclT;
            prices.price += this.exclT;
        }

        this.updateStatePrice(prices);
    }

    setParamQty = ()=>{
        let qty = $('input.option-qty').val();
        this.params['qty'] = qty;
    };

    getParamsCustomOption = () => {
        if(this.Custom && this.Custom.data.custom_options){
            let params = this.Custom.selected;
            this.params['options'] = params;
        }
    };

    getParams = ()=>{
        if(!this.checkOptionRequired()) return false;
        this.selected = this.selected[0];
        this.setParamOption('links');
        this.getParamsCustomOption();
        this.setParamQty();
        return this.params;
    };

}
export default Abstract;