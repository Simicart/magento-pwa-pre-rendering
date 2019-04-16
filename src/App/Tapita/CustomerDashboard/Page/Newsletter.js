import React from 'react';
import PageAbstract from '../Page/PageAbstract';
import Identify from '../../../../Helper/Identify';
import CustomerModel from '../../../Core/Customer/CustomerModel';
import Checkbox from '../../../../BaseComponent/CheckBox';
import Button from '../../../../BaseComponent/Button';

class Newsletter extends PageAbstract {
    constructor(props) {
        super(props);
        this.CustomerModel = new CustomerModel({ obj: this});
        this.state = {
            checked: this.customer.news_letter === '1',
        }
    }

    processData(data) {
        this.customer = data.customer;
        Identify.showToastMessage(Identify.__(data.message));
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'customer_data', data.customer);
    }

    updateCheck = () => {
        this.setState({ checked: !this.state.checked });
    }
    

    handleSave = () => {
        const params = {
            email: this.customer.email,
            news_letter: this.state.checked ? 1 : 0
        }
        Identify.showLoading();
        this.CustomerModel.editCustomer({}, params);
    }

    renderNewsletter() {
        return (
            <div id="checkbox-newsletter">
                <div className="flex" onClick={()=>this.updateCheck()}>
                    <Checkbox
                        checked={this.state.checked}
                    />
                    <div>{Identify.__('General Subscription')}</div>
                </div>

                <Button
                    className="btn-save-account"
                    text={Identify.__('Save')}
                    style={{
                        height : 36
                    }}
                    textStyle={{
                        textTransform : 'uppercase'
                    }}
                    onClick={()=>this.handleSave()}
                    ref={(btn)=>this.btnEdit = btn}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="newsletter-page">
                {this.renderPageTitle('Newsletter Subscription')}
                <div className="page-content">
                    {this.renderSection({
                        class : 'newsletter-section',
                        title : this.renderSectionHeader('Subscription option'),
                        content : this.renderNewsletter()
                    })}
                </div>
            </div>
        );
    }
}

export default Newsletter;