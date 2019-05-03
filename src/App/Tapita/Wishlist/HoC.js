import React from 'react'
import {Dynamic} from "../../../BaseComponent/Async";

export const WishlistHoC = props => <Dynamic component={()=>import('./index')} {...props}/>