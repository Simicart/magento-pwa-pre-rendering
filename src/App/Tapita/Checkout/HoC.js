/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/11/19
 * Time: 2:46 PM
 */
import React from 'react'
import {SubscribeOne} from 'unstated-x'
import {AppState} from "../../../Observer/AppState"
import CheckoutPage from "./index";
import Identify from "../../../Helper/Identify";
import Layout from "../../../Layout/Tapita";
export const CheckoutTapita = props => (
    <Layout header={{title : Identify.__('Checkout')}}>
        <SubscribeOne to={AppState} bind={['cart_data']}>
            {app => <CheckoutPage cart_data={app.state.cart_data}
                                  updateCart={(data)=>app.updateCart(data)}
                                  {...props}/>}
        </SubscribeOne>
    </Layout>

)