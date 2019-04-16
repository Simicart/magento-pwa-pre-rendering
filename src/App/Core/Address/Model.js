/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/11/19
 * Time: 2:35 PM
 */
import Model from '../../../Model'
class AddressModel extends Model{
    deleteAdress = (addressId) => {
        let api = 'addresses/' + addressId;
        return this.advancedConnect('DELETE', api, {}, {});
    };

    addNewAddress = (data) => {
        return this.advancedConnect('POST', 'addresses', {}, data);
    }

    updateAddress = (addressId, data) => {
        data['entity_id'] = addressId;
        return this.advancedConnect('PUT', 'addresses', {}, data);
    }

    getAddressesCollection = (limit = 100, offset = 0) => {
        let api = 'addresses';
        let data = {
            limit: limit,
            offset: offset
        };
        return this.connect(api,data);
    }
}
export default AddressModel