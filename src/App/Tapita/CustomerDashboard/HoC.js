/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/8/19
 * Time: 10:07 AM
 */
import React from 'react'
import {Dynamic} from "../../../BaseComponent/Async";
import Layout from '../../../Layout/Tapita'
import CustomerDashboard from './index'
export const CustomerDashboardHoC = props => (
    <Layout header={{title : 'Customer Dashboard'}}>
        <CustomerDashboard {...props}/>      
    </Layout>
)

export const Dashboard = props => <Dynamic component={()=>import('./Page/AccountDashboard')} {...props}/>

export const MyOrder = props => <Dynamic component={() => import('./Page/MyOrder')} {...props} />

export const OrderDetail = props => <Dynamic component={() => import('./Page/OrderDetail')} {...props} />
