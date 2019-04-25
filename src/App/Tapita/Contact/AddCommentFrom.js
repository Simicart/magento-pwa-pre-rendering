import React from 'react';
import Base from '../../Core/BaseAbstract';
import Identify from "../../../Helper/Identify";
import Model from '../../../Model';
import "./contact.scss"

const $ = window.$;

class AddCommentFrom extends Base {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
        this.contactModal = new Model({obj:this});

    }

    sendContact = (jQuery) => {
        this.contactModal.advancedConnect('POST', 'contacts', {}, jQuery)
    }

    handleSubmitFrom = () => {
        let isValidForm = this.validateForm();
        let formValue = $('#contact-form').serializeArray();
        let jQuery = {};
        if (isValidForm) {
            for (let index  in formValue) {
                let field = formValue[index];
                jQuery[field.name] = field.value;
            }
            Identify.showLoading();
            this.sendContact(jQuery);
        }
    };

    setData = (data) => {
        Identify.hideLoading();
        if (data.errors) {
            this.setState({loaded: true});
            let errors = data.errors;
            let text = "";
            for (let i in errors) {
                let error = errors[i];
                text += error.message + ' ';
            }
            if (text !== "") {
                Identify.showToastMessage(text)
            }
        } else {
            let message = Identify.__('Success');
            if (parseInt(data.success, 10) === 1) {
                message = data.message;
                Identify.showToastMessage(message)
            }
        }
    };

    validateEmail = (email) => {
        return Identify.validateEmail(email);
    };

    validateForm = () => {       
        let mainClass = this;
        let formCheck = true;
        $('#contact-form').find('.required').each(function () {
            if ($(this).val() === '' || $(this).val().length === 0) {
                formCheck = false;
                $(this).next('.error-message').show();
            } else {
                $(this).next('.error-message').hide();
                if ($(this).attr('name') === 'email') {
                    if (!mainClass.validateEmail($(this).val())) {
                        formCheck = false;
                        $('#email-validate').show();
                    }
                }
            }
        })

        return formCheck;
    };

    renderForm = () => {
        return (
            <form id="contact-form">
                <ul className="contact-fields">
                    <li className="form-field-item" id="li-name" key={Identify.makeid()}>
                        <label htmlFor="name">{Identify.__('Name')}<span className='required-label'>*</span></label>
                        <input type="text" name="name" id="name" className="required"/>
                        <div className="error-message">
                            {Identify.__('This field is required')}
                        </div>
                    </li>
                    <li className="form-field-item" id="li-email" key={Identify.makeid()}>
                        <label htmlFor="email">{Identify.__('Email')}<span className='required-label'>*</span></label>
                        <input type="text" name="email" id="email" className="required"/>
                        <div className="error-message">
                            {Identify.__('This field is required')}
                        </div>
                        <div className="error-message email-validate" id="email-validate">
                            {Identify.__('Invalid email address')}
                        </div>
                    </li>
                    <li className="form-field-item" id="li-phone" key={Identify.makeid()}>
                        <label htmlFor="phone">{Identify.__('Phone number')}</label>
                        <input type="text" name="phone" id="phone"/>
                        <div className="error-message">
                            {Identify.__('This field is required')}
                        </div>
                    </li>
                    <li className="form-field-item" id="li-message" key={Identify.makeid()}>
                        <label htmlFor="message">{Identify.__('Your message')}<span
                            className='required-label'>*</span></label>
                        <textarea name="message" id="message" className="required"/>
                        <div className="error-message">
                            {Identify.__('This field is required')}
                        </div>
                    </li>
                </ul>
            </form>
        );
    };

    render = () => {
        
        return (
            <div className="row">
                <div className="col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1">
                    <div className='entry-header'>
                        <p>{Identify.__('Send your comment')}</p>
                    </div>
                    <div className="form-note">
                        <p>{Identify.__('Write us a note and we’ll get back to you as quickly as possible.')}</p>
                    </div>
                    <div className="form-content">
                        {this.renderForm()}
                    </div>
                    <div className="action-submit-contact">
                        <div className="btn-contact" id="btn-contact" onClick={() => this.handleSubmitFrom()}
                            style={{
                                color: this.configColor.button_text_color,
                                background: this.configColor.button_background
                            }}>{Identify.__('Submit')}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCommentFrom;