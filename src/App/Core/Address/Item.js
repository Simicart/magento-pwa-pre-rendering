/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/11/19
 * Time: 2:35 PM
 */
import React from 'react'
export const AddressItem = props => {
    const data = props.data
    if(!data || !data.hasOwnProperty('firstname') || !data.firstname || !data.lastname){
        return null;
    }
    return (
        <ul className="address-item">
            <li className="customer-name">{data.firstname + " " + data.lastname}</li>
            <li className="street">{data.street}</li>
            <li className="city">{data.city+ ", "+data.region}</li>
            <li className="zipcode">{data.postcode}</li>
            <li className="country">{data.country_name}</li>
            <li className="telephone">{"T: "+data.telephone}</li>
        </ul>
    );
}