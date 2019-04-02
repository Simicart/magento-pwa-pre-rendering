import React from 'react';
import OptionAbstract from '../Abstract';
import Identify from '../../../../../Helper/Identify';
import Select from '../Type/Select';
import Checkbox from '../Type/Checkbox';
import Radio from '../Type/Radio';
const $ = window.$;
class BundleAbstract extends OptionAbstract {

    renderOptions = () => {
        let attributes = this.data.bundle_options.options;
        let objOptions = [];
        this.selected = this.data.bundle_options.selected;
        let selected = this.props.selected ? this.props.selected : null;;
        for (let i in attributes) {
            let obj = attributes[i];
            let labelRequried = '';
            if (obj.isRequired === "1") {
                labelRequried = "*";
                this.required.push(i);
            }
            if (selected) {
                let values = selected[i];
                if (values && values.length) {
                    obj.values = values;
                }
            }
            let type = 'single';
            if (obj.isMulti) {
                type = 'multi';
            }
            if(Identify.connectorVersion()){
                type = obj.type ? obj.type : type;
            }
            let element = this.renderAttribute(type,obj,i,labelRequried);
            objOptions.push(element);
        }
        return (<div>
            <form id="options">{objOptions}</form>
        </div>);
    };

    componentDidMount(){
        this.updatePrices();
        this.handleChangeQty();
    }

    updatePrices =(selected = this.selected) =>{
        let prices = this.parentObj.Price.state.prices;
        let attributes = this.data.bundle_options.options;
        let showIncludeTax = this.data.bundle_options.showIncludeTax;
        let showBoth = false;
        if (prices.configure.show_ex_in_price && prices.configure.show_ex_in_price === 1) {
            showBoth = true;
            if (prices.configure.price_excluding_tax) {
                prices.configure.price_excluding_tax.price = 0;
            }
            if (prices.configure.price_including_tax) {
                prices.configure.price_including_tax.price = 0;
            }

        } else {
            prices.configure.price = 0;
        }
        for (let i in selected) {
            let values = selected[i];
            let option = attributes[i];
            let selections = option.selections;

            if (values) {
                for (let j in values) {
                    let element = selections[values];
                    let check = true;
                    let input = $('input.option-qty-'+i+'');
                    let qty = input.val();
                    let input_value = input.attr('data-value');
                    let check_qty = input_value === values;
                    qty = parseInt(qty,10);
                    if(values instanceof Array){
                        check = false;
                        element = selections[values[j]];
                        check_qty = input_value === values[0];
                    }

                    if (element) {

                        qty = check_qty ? qty : element.qty;
                        if(element.tierPrice.length > 0){
                            for (let t in element.tierPrice) {
                                let item = element.tierPrice[t];
                                if(qty === parseInt(item.price_qty,10)){
                                    element = item;
                                    break;
                                }
                            }
                        }
                        if (showBoth) {
                            if (prices.configure.price_excluding_tax && prices.configure.price_including_tax) {
                                if (Identify.magentoPlatform() === 2) {
                                    prices.configure.price_excluding_tax.price += parseFloat(element.prices.finalPrice.amount*qty);
                                    prices.configure.price_including_tax.price += parseFloat(element.prices.finalPrice.amount*qty);
                                } else {
                                    prices.configure.price_excluding_tax.price += element.priceExclTax*qty;
                                    prices.configure.price_including_tax.price += element.priceInclTax *qty;
                                }
                            }

                        } else {
                            if (Identify.magentoPlatform() === 2) {
                                prices.configure.price += parseFloat(element.prices.finalPrice.amount *qty);
                            } else {
                                if(showIncludeTax){
                                    prices.configure.price += element.priceInclTax *qty;
                                }else{
                                    prices.configure.price += element.priceExclTax *qty;
                                }

                            }
                        }
                    }
                    if(check) break;
                }
            }
        }
        this.parentObj.Price.updatePrices(prices);
    };

    renderAttribute = (type,obj,id,labelRequried) => {
        let hidden = type === 'multi' || type === 'checkbox' ? 'hidden' : '';
        return (
            <div key={Identify.makeid()} className="option-select">
                <div className="option-title" style={{fontSize : '18px',height : 30}}>
                    <span>{obj.title} <span style={{marginLeft:'5px',color :'red'}}>{labelRequried}</span></span>
                </div>
                <div className="option-content" id="bundle-options">
                    <div className="option-list" style={{marginBottom : '0'}}>
                        {this.renderContentAttribute(obj, type, id)}
                    </div>
                    <div className={`bundle-option-qty ${hidden} ${type}`} data-name={id} style={{
                        marginLeft : '25px',
                        fontWeight : 600
                    }}>
                        <span>{Identify.__('Quantity')}</span>
                        {this.renderOptionInputQty(id)}
                    </div>
                </div>
            </div>
        )
    }

    renderMultiCheckbox =(ObjOptions, type = 'checkbox', id = '0')=>{
        let options = ObjOptions.selections;
        let values = ObjOptions.values;
        let objs = [];
        for (let i in options) {
            let item = options[i];
            let selected = false;
            if (values && values.indexOf(i.toString()) >= 0) {
                selected = true;
            }
            let price = 0;
            if (item.price) {
                price = item.price;
            }
            if (item.priceInclTax) {
                price = item.priceInclTax;
            }

            if (Identify.magentoPlatform() === 2) {
                price = item.prices.finalPrice.amount;
            }
            let label  = this.renderLabelOption(item.name,price);
            let element = (
                <li key={Identify.makeid()} className="option-row">
                    <Checkbox id={id} label={label} selected={selected} value={i} parent={this}/>
                </li>);

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
    };

    getParams = ()=>{
        if (!this.checkOptionRequired()){
            return false;
        }
        this.setParamOption('bundle_option');
        this.setParamQty('bundle_option_qty');
        let qty = $('input.bundle-qty').val();
        this.params['qty'] = qty;
        return this.params;
    };

}
export default BundleAbstract;