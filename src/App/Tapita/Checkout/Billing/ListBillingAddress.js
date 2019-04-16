/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/23/18
 * Time: 10:10 PM
 */
import React from 'react'
import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Identify from "../../../../Helper/Identify";
import { withStyles } from '@material-ui/core/styles';
const styles = {
    select : {
        paddingLeft:10
    }
}
class ListBillingAddress extends React.Component{

    constructor(props) {
        super(props);
        let selectedAddressId = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE,'billing_selected')
        selectedAddressId = selectedAddressId ? selectedAddressId : '0';
        this.state = {
            selectedAddressId
        };
        this.parent = this.props.parent;
    }

    componentDidMount(){
        let {selectedAddressId} = this.state;
        // if(selectedAddressId === 'new-address'){
        //     this.parent.setState({newAddress:true});
        // }
        console.log(selectedAddressId)
    }

    handleChangeSelect = event => {
        let id = event.target.value
        this.setState({ selectedAddressId: id });
        if(id === 'new-address'){
            this.parent.setState({newAddress:true});
            return;
        }
        this.parent.billingId = id;
    };

    renderListAdress = () => {
        let listAddress = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE,'list_address')
        listAddress = listAddress ? listAddress : null;
        let items = null
        if(listAddress && listAddress instanceof Object
            && listAddress.hasOwnProperty('addresses')
            && listAddress.addresses.length > 0
        ){
             items = listAddress.addresses.map((item,key) => {
                let label = item.street + ", " + item.region + ", " + item.country_name;
                return <MenuItem key={key}
                                 style={{
                                     fontSize:16
                                 }}
                                 value={item.entity_id}>{label}</MenuItem>;
            });
        }
        let {classes} = this.props;
        return (
            <div className="list-billing-address">
                <SelectField className={`select-field-billing`}
                             value={this.state.selectedAddressId}
                             onChange={this.handleChangeSelect}
                             fullWidth
                             classes={{
                                 select : classes.select
                             }}
                             MenuProps={{
                                 className : 'select-menu-item'
                             }}>
                    <MenuItem  value={`0`}
                               style={{
                                   fontSize:14
                               }}>{`---${Identify.__('Please select a billing address')}---`}</MenuItem>;
                    {items}
                    <MenuItem  value={`new-address`}
                               style={{
                                   fontSize:14
                               }}>{Identify.__('New Address')}</MenuItem>;
                </SelectField>
            </div>
        )
    }

    render(){
        return this.renderListAdress();
    }
}
export default withStyles(styles)(ListBillingAddress)