/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 10:54 AM
 */
import React from 'react'
import {AppState} from "../../../Observer/AppState";
import {SubscribeOne} from 'unstated-x'
import CartQty from './RightBar/CartQty'
import BottomMenu from './Component/BottomMenu'
import dynamic from 'next/dynamic'
import {Dynamic} from "../../../BaseComponent/Async";

export const CartQtyHoC = props => (
    <SubscribeOne to={AppState} bind={['cart_data']}>
        {app => <CartQty  cart_data={app.state.cart_data} {...props}/>}
    </SubscribeOne>
)

export const BottomMenuHoC = props => (
    <SubscribeOne to={AppState} bind={['cart_data']}>
        {app => <BottomMenu cart_data={app.state.cart_data} {...props}/>}
    </SubscribeOne>
)

export const WishListHoC = props => <Dynamic component={()=>import('./RightBar/WishListSideBar')} {...props}/>

export const CateTreeHoC = dynamic({
    loader : () => import(/* webpackChunkName : "CateTree" */'./LeftMenu/CateTree'),
    ssr : false
})