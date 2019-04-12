import Model from '../../../Model';

class AddressModel extends Model {
    deleteAddress = (addressId) => {
        return this.advancedConnect('DELETE', `addresses/${addressId}`, {}, {});
    }

    getAddressCollection = (limit = 100, offset = 0) => {
        return this.connect('addresses', {limit, offset});
    }
}

export default AddressModel;