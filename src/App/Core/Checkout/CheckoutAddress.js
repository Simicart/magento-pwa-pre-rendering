import CheckoutSection from "./CheckoutSection";
import Identify from "../../../Helper/Identify";
import React from 'react'
import NewAddressPopup from "../../Tapita/Checkout/Address/NewPopup";
import CustomerHelper from '../../../Helper/Customer'
import {AddressItem} from "../Address/Item";
import AddressModel from '../Address/Model'
/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 10/29/18
 * Time: 1:41 PM
 */
class CheckoutAddress extends CheckoutSection{
    constructor(props){
        super(props);
        this.state = {data:null,loaded:false,address_selected : false}
        this.idFormAddress = 'checkout-address'
        this.defaulVal = ''
        this.Model = new AddressModel({obj:this})
    }



    componentDidMount(){
        let data = Identify.ApiDataStorage('list_address') || {}
        if(data.hasOwnProperty('addresses')){
            this.setState({data,loaded:true})
        }else{
            if(CustomerHelper.isLogin()){
                this.Model.getAddressesCollection()
            }
        }
    }

    processData(data){
        if(data instanceof Object && data.hasOwnProperty('addresses')){
            Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'list_address',data)
            this.setState({data})
        }
    }

    handleSaveAddress = params => {}

    renderNewAddressPopup = ()=>{
        return <NewAddressPopup 
                parent={this} 
                ref={node => this.NewAddressPopup=node} 
                CheckoutParent={this.CheckoutParent}
                hideAddNewPopup={()=>this.hideAddNewPopup()}
            />
    }

    hideAddNewPopup = () => {
        if (this.listAddressSelect) {
            this.listAddressSelect.value = this.defaulVal
        }
    }

    renderAddressItem = item => {
        return <AddressItem data={item}/>
    }

    checkAddressSelected = id =>{
        return false
    }

    handleChangeSelect = (val)=>{
        if(val){
            if(val === 'new-address'){
                this.NewAddressPopup.showAddNewForm();
            }else{
                this.handleSaveAddress({entity_id : val})
            }
        }
    }

    renderListAddress = data => {
        let obj = this;
        let items = data.map(item => {
            if(obj.checkAddressSelected(item.entity_id)){
                this.defaulVal = item.entity_id;
            }
            return(
                <option key={item.entity_id} value={item.entity_id}>
                    {item.firstname +' '+item.lastname+', '+item.street + ", " + item.region + ", " + item.country_name}
                </option>
            )
        })
        return(
            <div className="list-address">
                <select 
                    ref={item=>{this.listAddressSelect = item}}
                    defaultValue={this.defaulVal} 
                    onChange={(e)=> this.handleChangeSelect(e.target.value)}
                    >
                    <option value="">-- {Identify.__('Please select a address')} --</option>
                    {items}
                    <option value="new-address">{Identify.__('New Address')}</option>
                </select>
                <div style={{display:'none'}}>
                    {this.renderNewAddressPopup()}
                </div>
            </div>
        )
    }
}
export default CheckoutAddress