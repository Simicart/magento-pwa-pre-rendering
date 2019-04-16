import React from 'react';
import OptionAbstract from '../Abstract';
import Identify from '../../../../../Helper/Identify';
import LabelAttribute from '../Type/Label';

const configColor = Identify.getColorConfig()
const $ = window.$;
class ConfigurableAbstract extends OptionAbstract {

    constructor(props){
        super(props);
        this.exclT = 0;
        this.inclT = 0;
    }

    renderOptions =()=>{
        let attributes = this.data.configurable_options.attributes;
        let objOptions = [];
        let labelRequired = this.renderLabelRequired();
        let taxConfig = this.data.configurable_options.taxConfig;
        for (let i in attributes) {
            let attribute = attributes[i];
            this.required.push(attribute.id);
            let element = (
                <div key={Identify.makeid()} className="option-select" style={{marginTop : '30px'}}>
                    <div className="option-title" style={{marginBottom : '10px'}}>
                        <span className="flex">
                            {attribute.label}{labelRequired}
                        </span>
                    </div>
                    <div>
                        <span style={{color: '#2d2d2d',fontWeight : 400,textTransform : 'none'}}
                                  id={`additions-${attribute.id}-label`}/>
                        <span style={{margin: "0 10px", color: configColor.price_color,fontWeight : 600,textTransform : 'none'}}
                              id={`additions-${attribute.id}-price`}/>
                    </div>
                    <div className="option-content">
                        <div className="option-list" id={`attribute-${attribute.id}`} style={{display : 'flex',alignItems : 'center',flexWrap:'wrap'}}>
                            {this.renderAttribute(attribute,attribute.id,taxConfig)}
                        </div>
                    </div>
                </div>
            );
            objOptions.push(element);
        }
        return (<div>
            <form id="configurableOption">{objOptions}</form>
            {/*{this.renderSelectedOption()}*/}
        </div>);
    }

    renderAttribute =(attribute,key,taxConfig)=>{
        let options = attribute.options;
        let objs = [];
        for (let i in options) {
            let item = options[i];
            item['type'] = attribute.code;
            let element = <LabelAttribute key={Identify.makeid()} taxConfig={taxConfig} data={item} id={key} value={item.id} parent={this}/>;
            objs.push(element);
        }
        return objs;
    }

    updatePrices =()=>{
      if (Identify.magentoPlatform() === 1){
          this.updatePricesM1();
      } else{
          this.updatePricesM2();
      }
    };

    updatePricesM1=(selected = this.selected)=>{
        let prices = this.parentObj.Price.state.prices;
        let attributes = this.data.configurable_options.attributes;
        let taxConfig = this.data.configurable_options.taxConfig;
        if (taxConfig.showIncludeTax === true) {
            //set price when choosing
            prices.regural_price -= this.inclT;
            prices.price -= this.inclT;

        } else if (taxConfig.showBothPrices === true) {
            // prices.regural_price += inclT;
            prices.price_excluding_tax.price -= this.exclT;
            prices.price_including_tax.price -= this.inclT;
        } else {
            if (prices.regural_price) {
                prices.regural_price -= this.exclT;
            }
            prices.price -= this.exclT;
        }
        this.exclT = 0;
        this.inclT = 0;

        for (let i in selected) {
            let value = selected[i];
            let option = attributes[i];
            let selections = option.options;
            if (value) {
                for (let j in selections) {
                    let selection = selections[j];
                    if (selection.id === value) {
                        if (taxConfig.includeTax) {
                            if (selection.price !== 0) {
                                let tax = parseFloat(selection.price / (100 + taxConfig.defaultTax) * taxConfig.defaultTax);
                                let excl = parseFloat(selection.price - tax);
                                let incl = parseFloat(excl * (1 + (taxConfig.currentTax / 100)));
                                this.exclT += excl;
                                this.inclT += incl;
                            }
                        } else {
                            if (selection.price !== 0) {
                                let tax = parseFloat(selection.price * (taxConfig.currentTax / 100));
                                let excl = parseFloat(selection.price);
                                let incl = parseFloat(excl + tax);
                                this.exclT += excl;
                                this.inclT += incl;
                            }
                        }
                    }
                }
            }
        }

        if (taxConfig.showIncludeTax === true) {
            //set price when choosing
            prices.regural_price += this.inclT;
            prices.price += this.inclT;

        } else if (taxConfig.showBothPrices === true) {
            // prices.regural_price += inclT;
            prices.price_excluding_tax.price += this.exclT;
            prices.price_including_tax.price += this.inclT;
        } else {
            prices.regural_price += this.exclT;
            prices.price += this.exclT;
        }

        this.parentObj.Price.updatePrices(prices);
    };

    updatePricesM2=(selected = this.selected)=>{
        let prices = this.parentObj.Price.state.prices;
        let simpleSelected = 0;
        let indexMap = this.data.configurable_options.index;
        let optionPrices = this.data.configurable_options.optionPrices;

        for (let i in indexMap) {
            let index = JSON.stringify(indexMap[i]);
            if (index === JSON.stringify(selected)) {
                simpleSelected = i;
            }
        }
        let optionPrice = {};
        for (let j in optionPrices) {
            if (simpleSelected === j) {
                optionPrice = optionPrices[j];
            }
        }

        if (optionPrice.oldPrice)
            prices.regural_price = optionPrice.oldPrice.amount;
        if (optionPrice.finalPrice)
            prices.price = optionPrice.finalPrice.amount + this.inclT;

        this.parentObj.Price.updatePrices(prices);
    };

    setParamQty = ()=>{
        let qty = $('input.option-qty').val();
        this.params['qty'] = qty;
    };


    getParams = ()=>{
        this.setParamOption('super_attribute');
        this.setParamQty();
        return this.params;
    }

}
export default ConfigurableAbstract;