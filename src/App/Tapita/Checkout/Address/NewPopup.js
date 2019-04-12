import React from 'react';
import Identify from "../../../../Helper/Identify";
import Checkbox from '@material-ui/core/Checkbox';
import RaisedButton from '@material-ui/core/Button'
import AddressFormAbstract from "../../Address/AddressFormAbstract";
import SimiDialog from "../../../../BaseComponent/Dialog";
import AddIcon from '@material-ui/icons/AddCircleOutline';
// import EditIcon from '../../../../BaseComponent/Icon/Edit';
import ModelAddress from '../../../Core/Address/Model'
const configColor = Identify.getColorConfig()
class NewPopup extends AddressFormAbstract {
    constructor(props) {
        super(props);
        const isPhone = this.state.isPhone;
        this.state = {showForm: false, isPhone,checked:true};
        this.CheckoutParent = this.props.CheckoutParent;
        this.parent = this.props.parent;
        this.addressModelCollection = new ModelAddress({obj: this});
    }
    
    showAddNewForm = () => {
        this.setState({showForm: true});
    };


    hideAddNewForm = () => {
        if (this.props.hideAddNewPopup){
            this.props.hideAddNewPopup()
        }
        this.setState({showForm: false});
    };


    handleSaveAddress = () => {
        const $ = window.$;
        let flag = true;
        $('#new-shipping-address').find('input[class="required"]').each(function () {
            if ($(this).val() === '' || $(this).val().length === 0) {
                flag = false;
                $(this).next('.error-message').show();
            }
        });
        if (flag) {
            const formData = $('#new-shipping-address').serializeArray();
            let jQuery = {};
            for (const index in formData) {
                if (formData[index]['value'].length > 0) {
                    jQuery[formData[index]['name']] = formData[index]['value'];
                }
            }
            if(this.state.checked){
                jQuery['save_in_address_book'] = 1
            }
            this.parent.handleSaveAddress(jQuery);
            this.hideAddNewForm();
        }
    };

    renderSaveInAdressCheckbox = () => {
        return (
            <li className="form-field-item flex"
                id="save-in-address-book"
                onClick={()=>this.setState({checked:!this.state.checked})}>
                <Checkbox checked={this.state.checked}/>
                <div>{Identify.__('Save in address book')}</div>
            </li>
        );
    };
    renderDialogContent = () => {
        return (
            <form id="new-shipping-address">
                <ul className="address-fields">
                    {this.renderAddressFormFields()}
                    {this.renderSaveInAdressCheckbox()}
                </ul>
            </form>
        );
    };

    renderFooter = () => {
        const width = this.state.isPhone ?'100%':'auto';
        return (
            <React.Fragment>
                {!this.state.isPhone && (
                    <RaisedButton className={`address-popup-action`}
                                  style={{fontSize:14,marginRight: 16,color:configColor.button_background,background:configColor.button_text_color}}
                                  onClick={() => this.hideAddNewForm()}>
                        <div style={{color:configColor.button_background}}>{Identify.__('Cancel')}</div>
                    </RaisedButton>
                )}

                <RaisedButton className={`address-popup-action`} style={{fontSize:14,width:width,color:configColor.button_text_color,background:configColor.button_background}}
                              onClick={() => this.handleSaveAddress()}>
                    {Identify.__('Save Address')}
                </RaisedButton>
            </React.Fragment>
        );
    };

    render = () => {
        let savedAddress = sessionStorage.getItem('new_checkout_address');
        if (savedAddress) {
            try {
                savedAddress = JSON.parse(savedAddress);
                this.address = savedAddress;
            } catch(err) {
                savedAddress = false;
                sessionStorage.removeItem('new_checkout_address');
            }
        }
        
        const newAddressDialog = <SimiDialog
            fullScreen={this.state.isPhone}
            open={this.state.showForm}
            dialogContent={this.renderDialogContent()}
            dialogActions={this.renderFooter()}
            onRequestClose={() => this.hideAddNewForm()}
            title={Identify.__('Add a New Address')}/>;
        
        // if (savedAddress) {
        //     const checked = sessionStorage.getItem('using_new_address') === '1'
        //
        //     if (checked && this.props.parent) {
        //         this.props.parent.setState({selectedAddress: null});
        //     }
        //
        //     return (
        //         <li key={Identify.makeid()}
        //             className="item"
        //             id="new-checkout-address">
        //             <div className="address-select">
        //                 <Checkbox  checked={checked}
        //                            onClick={() => this.showAddNewForm()}/>
        //                 <div
        //                     style={{marginTop: 15, marginLeft: 3, marginRight: 3}}>
        //                     {/*<EditIcon
        //                         style={{width: 20}}
        //                         color={configColor.icon_color}/>*/}
        //                 </div>
        //             </div>
        //             <div className="address-info">
        //                 <AddressItem data={savedAddress}/>
        //             </div>
        //             {newAddressDialog}
        //         </li>
        //     );
        // }
        
        return (
            <div className="add-new-address" style={{marginBottom: 20}}>
                <div className="link-action" onClick={() => this.showAddNewForm()}>
                    <AddIcon style={{fill:configColor.button_background}}/>
                    <span style={{marginLeft:10,color:configColor.button_background}}>{Identify.__('Add a New Address')}</span>
                </div>
                {newAddressDialog}
            </div>
        );
    };
}

export default NewPopup;