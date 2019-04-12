/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/21/18
 * Time: 8:29 AM
 */
import React from 'react'
import MethodAbstract from '../../../../Core/Payment/MethodAbstract'
import Identify from "../../../../../Helper/Identify";
import CardHelper from '../../../../../Helper/Card';
import CreditCard from '@material-ui/icons/CreditCard';
import SimiDialog from '../../../../../BaseComponent/Dialog'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'
import UnCheckIcon from '@material-ui/icons/RadioButtonUnchecked'
const configColor = Identify.getColorConfig()
const ListMonth = {
    "01": Identify.__("January"),
    '02': Identify.__("February"),
    '03': Identify.__("March"),
    "04": Identify.__("April"),
    "05": Identify.__("May"),
    "06": Identify.__("June"),
    "07": Identify.__("July"),
    "08": Identify.__("August"),
    "09": Identify.__("September"),
    "10": Identify.__("October"),
    "11": Identify.__("November"),
    "12": Identify.__("December")
}
class CcType extends MethodAbstract{
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showCCForm: false}}
    }

    editCCInfo = (e) => {
        e.stopPropagation();
        this.showCCForm();
    };

    hideCCForm = () => {
        this.setState({showCCForm: false});
    };

    showCCForm = () => {
        this.setState({showCCForm: true});
    };

    savePaymentMethod = (data, isBtnSave = false)=>{
        let dataFromStoreAge = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, data.payment_method.toUpperCase());
        // let checkValidData = dataFromStoreAge.filter((item) => {
        //     return item === '' || item === undefined || item === null;
        // });
        // console.log(dataFromStoreAge)
        if (!isBtnSave) {
            this.showCCForm();
        }else{
            let dataSave = {};
            if (isBtnSave === true) {
                let dataForm = $(`#${data.payment_method}`).serializeArray();
                let checkEmpty = dataForm.filter((item) => {
                    return item.value === '';
                });

                dataSave['method'] = data.payment_method;

                if (checkEmpty.length > 0) {
                    Identify.showToastMessage(Identify.__('Please fill in all the required fields'));
                    return;
                }

                for (let key in dataForm) {
                    let field = dataForm[key];
                    if (field.value !== '' && field.value.length > -0) {
                        dataSave[field.name] = field.value.replace(/\s-\s/g, '');
                    }
                }
                this.hideCCForm()
            } else {
                dataSave = dataFromStoreAge;
            }
            let params = {
                p_method : dataSave
            }
            Identify.showLoading()
            this.CheckoutParent.requestUpdateOrder(params);
        }
    }

    renderTitle = (data) => {
        return (
            <div className={`flex`} style={{justifyContent:'space-between'}}>
                <div className="payment-title">{data.title}</div>
                <div className='cc-edit' onClick={(e) => this.editCCInfo(e)}>
                    <CreditCard style={{fill:configColor.button_background}}/>
                </div>
            </div>
        )
    }

    renderDialogFooter = () => {
        return (
            <div className="cc-modal-footer">
                <Button
                    style={{width: '100%', height: 46,background:configColor.button_background}}
                    onClick={() => this.savePaymentMethod(this.props.payment_item, true)}
                >
                    <div style={{color: configColor.button_text_color, fontSize: 18, fontWeight: 500}}>
                        {Identify.__('Save')}
                    </div>
                </Button>
            </div>
        );
    };

    renderCCType = () => {
        let data = this.props.payment_item;
        if (data.cc_types.length > 0) {
            return data.cc_types.map((item) => {
                return (
                    <li key={Identify.makeid()} className='cc-item' id={item.cc_code}
                        onClick={(e) => this.changeCardType(e)}>
                        <div className="payment-select">
                            <CheckIcon className={`check`}
                                       style={{display: 'none', fontSize: 16, fill: configColor.button_background}}/>
                            <UnCheckIcon className={`uncheck`}
                                         style={{fontSize: 16, fill: '#2d2d2d'}}/>
                        </div>
                        <img src={require(`./images/${item.cc_code.toUpperCase()}.png`)}
                             style={{width: 92, height: 92, marginTop: 18}}
                             alt={item.cc_name}/>
                        <div className='cc-title'>
                            {Identify.__(item.cc_name)}
                        </div>

                    </li>
                );
            });
        }
    };

    renderFormFields = () => {
        let data = this.props.payment_item;
        let dataFromStoreAge = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, data.payment_method.toUpperCase()) || [];
        let nameOncard = dataFromStoreAge.cc_owner !== undefined ? dataFromStoreAge.cc_owner : '';
        let CCNumber = dataFromStoreAge.cc_number !== undefined ? dataFromStoreAge.cc_number.match(new RegExp('.{1,4}', 'g')).join(" - ") : '';
        let CVV = dataFromStoreAge.cc_cid !== undefined ? dataFromStoreAge.cc_cid : '';

        return (
            <div className="cc-form-fields">
                {parseInt(data.is_show_name,10) === 1 && (
                    <div className="cc-field">
                        <label htmlFor="cc_owner">
                            {Identify.__('Name On Card')}
                            <span className="label-required">*</span>
                        </label>
                        <input name="cc_owner" defaultValue={nameOncard} className="required" id="cc_owner"
                               type="text"/>
                    </div>
                )}

                <div className="cc-field">
                    <label htmlFor="cc_number">
                        {Identify.__('Credit Card Number')}
                        <span className="label-required">*</span>
                    </label>
                    <input name="cc_number" id="cc_number" className='required' type="text" defaultValue={CCNumber}
                           onInput={(e) => this.onCCNUmberInput(e)}
                           placeholder="xxxx - xxxx - xxxx - xxxx"/>
                </div>
                <div className="double-in-line">
                    <div className="cc-field">
                        <label htmlFor="cc_exp_month">
                            {Identify.__('Month')}
                            <span className="label-required">*</span>
                        </label>
                        {this.renderMonth()}
                    </div>
                    <div className="cc-field month">
                        <label htmlFor="cc_exp_year">
                            {Identify.__('Year')}
                            <span className="label-required">*</span>
                        </label>
                        {this.renderYear()}
                    </div>
                </div>

                {parseInt(data.useccv,10) === 1 && (
                    <div className="cc-field">
                        <label htmlFor="cc_cid">
                            {Identify.__('CVV')}
                            <span className="label-required">*</span>
                        </label>
                        <input name="cc_cid" defaultValue={CVV} type="number" id="cc_cid" className="required"
                               maxLength="3"
                               placeholder="***"/>
                    </div>
                )}
            </div>
        );
    };

    renderDialogContent = (data) => {

        let dataFromStoreAge = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, data.payment_method.toUpperCase()) || [];
        let defaultCCTypeValue = dataFromStoreAge.cc_type !== undefined ? dataFromStoreAge.cc_type : '';
        return (
            <form id={data.payment_method}>
                <ul className='lists-cc'>
                    {this.renderCCType()}
                    <input type="hidden" id="cc_type" defaultValue={defaultCCTypeValue} name="cc_type"/>
                </ul>
                {this.renderFormFields()}
            </form>
        );
    };

    renderMonth = () => {
        let data = this.props.payment_item;
        let dataFromStoreAge = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, data.payment_method.toUpperCase()) || {};
        let defaultValue = dataFromStoreAge.cc_exp_month !== undefined ? dataFromStoreAge.cc_exp_month : '01';
        let months = [];
        for (var key in ListMonth) {
            months.push(
                <option key={Identify.makeid()} value={key}>{ListMonth[key] + " - " + key}</option>
            );
        }
        return (
            <select defaultValue={defaultValue} className="select-year select" id="cc_exp_month" name="cc_exp_month">
                {months}
            </select>
        );
    };

    renderYear = () => {
        let data = this.props.payment_item;
        let dataFromStoreAge = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, data.payment_method.toUpperCase()) || [];
        let currentYear = (new Date()).getFullYear();
        let year = dataFromStoreAge.cc_exp_year !== undefined ? dataFromStoreAge.cc_exp_year : currentYear;
        let count = 0;
        let listYear = [];
        while (count < 50) {
            let year = currentYear + count;
            listYear.push(
                <option key={Identify.makeid()} value={year}>{year}</option>
            );
            count++
        }

        return (
            <select defaultValue={year} className="select-year select" id="cc_exp_year" name="cc_exp_year">
                {listYear}
            </select>
        );
    };

    onCCNUmberInput = e => {
        $(e.currentTarget).val(this.formatCC(e.currentTarget.value));
    };

    changeCardType = e => {
        const $ = window.$;
        let paymentMethod = this.props.payment_item.payment_method;
        let currentTarget = $("#" + e.currentTarget.id);
        $('#' + paymentMethod).find('li.cc-item').each(function () {
            $(this).find('.check').hide();
            $(this).find('.uncheck').show();
        });

        currentTarget.find('.check').show();
        currentTarget.find('.uncheck').hide();
        currentTarget.parents('.lists-cc').find('input[name="cc_type"]').val(e.currentTarget.id);
        //add Validate for CC Number input
        let cardFormat = CardHelper.getCardFormatByType(e.currentTarget.id);
        if (cardFormat !== false) {
            let cardLength = 16;
            cardLength = Math.max.apply(null, cardFormat.lengthCard);
            let placeHolder = "x".repeat(cardLength);
            let parts = [];

            for (let i = 0, len = placeHolder.length; i < len; i += 4) {
                parts.push(placeHolder.substring(i, i + 4))
            }
            $('#cc_number').attr('placeholder', parts.join(' - '));
            $('#cc_cid').attr('maxlength', cardFormat.cvcLength[0]).attr('placeholder', "*".repeat(cardFormat.cvcLength[0]));
        }
    };

    formatCC = (value) => {
        const $ = window.$;
        let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let cardByNUmber = CardHelper.detectCardType(v);

        let pattern = /\d{4,16}/g;
        let cardType = 'OT';
        if (cardByNUmber !== null) {
            pattern = cardByNUmber.cartdFormatPattern;
            cardType = cardByNUmber.type;
            // auto pick Card Type By Number
            let paymentMethod = this.props.payment_item.payment_method;
            $('#' + paymentMethod).find('li.cc-item').each(function () {
                $(this).find('.check').hide();
                $(this).find('.uncheck').show();
            });
            let currentTarget = $('#' + cardByNUmber.type);
            currentTarget.find('.check').show();
            currentTarget.find('.uncheck').hide();
            currentTarget.parents('.lists-cc').find('input[name="cc_type"]').val(cardType);
            $('#cc_cid').attr('maxlength', cardByNUmber.cvcLength[0]).attr('placeholder', "*".repeat(cardByNUmber.cvcLength[0]));
        }
        let regex = new RegExp(pattern, 'gi');
        let matches = v.match(regex);
        let match = (matches && matches[0])? matches[0] : '';
        let parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(' - ')
        } else {
            return value
        }
    };

    renderJs = () => {
        const $ = window.$;
        let paymentMethod = this.props.payment_item.payment_method;
        $(document).ready(function () {
            $('#' + paymentMethod).find('li.cc-item').each(function () {
                if ($(this).attr('id') === $('#cc_type').val()) {
                    $(this).find('.check').show();
                    $(this).find('.uncheck').hide();
                }
            });
        });
    };

    render(){
        let data = this.props.payment_item;
        return (
            <div>
                {this.renderPayment()}
                <SimiDialog onRequestClose={() => this.hideCCForm()} className="cc-modal"
                            open={this.state.showCCForm}
                            title={data.title}
                            dialogActions={this.renderDialogFooter()}
                            dialogContent={this.renderDialogContent(data)}
                            fullScreen={window.innerWidth<768}
                            />
                {this.renderJs()}
            </div>
        )
    }
}
export default CcType