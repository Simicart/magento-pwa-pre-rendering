/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/27/19
 * Time: 8:45 AM
 */
import {SubscribeOne} from 'unstated-x'
import {AppState} from "../../../Observer/AppState";
import React from 'react'
import ItemAction from './Component/ItemAction'

export const ItemActionHoC = props => (
    <SubscribeOne to={AppState} bind={['']}>
        {app => (
            <ItemAction {...props}
                        updateCart={app.updateCart}
                        updateWishlist={app.updateCart}/>
        )}
    </SubscribeOne>
)
