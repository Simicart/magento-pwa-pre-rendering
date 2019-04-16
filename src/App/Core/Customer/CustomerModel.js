/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 2:15 PM
 */
import Model from '../../../Model'

class CustomerModel extends Model{
    logoutCustomer = ()=>{
        return this.connect('customers/logout', {});
    }

    checkExistingCustomer = (email) => {
        let parrams = {};
        parrams['customer_email'] = email;
        return this.connect('customers/checkexisting', parrams);
    }

    registerCustomer =  (query) => {
        return this.advancedConnect('POST','customers',{},query);
    }

    loginCustomer = (query) => {
        return this.connect('customers/login', query);
    }

    forgotPassword = (query) => {
        return this.connect('customers/forgetpassword', query);
    }

    createPassword = (query) => {
        return this.connect('customers/createpassword', query);
    }

    getDownloadableProducts = (jQuery = {}) => {
        return this.connect('downloadableproducts', jQuery);
    }

    editCustomer =(query,params)=>{
        return this.advancedConnect('PUT','customers',query,params);
    }

    getProfile =()=>{
        this.gettingCustomer = true
        return this.connect('customers/profile');
    }
}
export default CustomerModel