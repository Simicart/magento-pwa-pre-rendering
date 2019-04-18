import React from 'react';
import PropTypes from 'prop-types';
import Abstract from '../../../../Core/BaseAbstract';
import AddressModel from '../../../../Core/Address/Model';
import { confirmAlert } from 'react-confirm-alert';
import Identify from '../../../../../Helper/Identify';
import EditIcon from '../../../../../BaseComponent/Icon/Edit';
import TrashIcon from '../../../../../BaseComponent/Icon/Trash';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class AddressItem extends Abstract{
    constructor(props) {
        super(props);
        this.parent = this.props.parent;
        this.isDelete = this.props.isDelete || false;
        this.addressData = this.props.addressData || {};
        this.title = this.props.title || null;
        this.canEdit = this.props.canEdit || true;
        this.updateCollection = false;
        this.AddressModel = new AddressModel({obj: this});
        if (
            this.addressData.is_default_shipping !== undefined 
            && this.addressData.is_default_shipping === true
        ) {
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'default_shipping_address',this.addressData.entity_id);
        }

        if (
            this.addressData.is_default_billing !== undefined 
            && this.addressData.is_default_billing === true
        ) {
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'default_billing_address',this.addressData.entity_id);
        }
    }

    handleEditAddress = () => {
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'address_item', this.addressData);
        this.pushLink('/customer/address/edit-address')
    }

    handleDeleteAddress = (addressId) => {
        confirmAlert({
            title: '',
            message: Identify.__('Are you sure you want to delete this address'),
            buttons: [
                {
                  label: Identify.__('Yes'),
                  onClick: () => {
                      this.AddressModel.deleteAdress(addressId)
                      Identify.showLoading();
                    }
                },
                {
                  label: Identify.__('No')
                }
              ],
            
        })
    }

    processData(data) {
        if(this.updateCollection) {
            Identify.ApiDataStorage('list_address', 'update', data);
            this.updateCollection = false;
            this.parent.updateAddressList();
            Identify.showToastMessage(Identify.__('This address has been removed'));
        } else {
            Identify.showLoading();
            this.AddressModel.getAddressesCollection()
            this.updateCollection = true;
        }
    }
    
    render() {
        this.canEdit = this.props.canEdit
        return (
            <div className="address-item box" key={Identify.makeid()}>
                <div className="box-content">
                    {this.title !== null && (
                        <div className="box-title">
                            <div>{Identify.__(this.title)}</div>
                        </div>
                    )}
                    {this.addressData && this.addressData.firstname !== undefined && (
                        <div>
                            <p className="customer-name">{this.addressData.firstname + " " + this.addressData.lastname}</p>
                            <p className="street">{this.addressData.street}</p>
                            <p className="city">{this.addressData.city + ", " + this.addressData.region}</p>
                            <p className="zipcode">{this.addressData.postcode}</p>
                            <p className="country">{this.addressData.country_name}</p>
                            <p className="telephone">{"T: " + this.addressData.telephone}</p>
                        </div>
                    )}

                </div>
                <div className="box-action text-center" style={{cursor: 'pointer'}}>
                    {this.canEdit &&(
                        <div onClick={() => this.handleEditAddress()}><EditIcon style={{width:17 , height : 17}}/></div>
                    )}
                    {this.isDelete && (
                        <div onClick={() => this.handleDeleteAddress(this.addressData.entity_id)}
                             style={{marginTop: 12, cursor: 'pointer'}}>
                             <TrashIcon style={{width:17 , height : 17}}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

AddressItem.defaultProps = {
    canEdit : true
}
AddressItem.contextTypes = {
    router: PropTypes.object
}

export default AddressItem;