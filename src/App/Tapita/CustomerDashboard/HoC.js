/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/8/19
 * Time: 10:07 AM
 */
import React from 'react'
import {Dynamic} from "../../../BaseComponent/Async";

export const Dashboard = props => <Dynamic component={()=>import('./Page/AccountDashboard')} {...props}/>
