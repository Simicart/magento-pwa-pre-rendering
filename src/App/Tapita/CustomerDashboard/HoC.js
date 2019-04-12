/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/8/19
 * Time: 10:07 AM
 */
import React from 'react'
import {LazyComponent} from "../../../BaseComponent/Async";
import Layout from '../../../Layout/Tapita'
import CustomerDashboard from './index'
export const CustomerDashboardHoC = props => (
    <Layout header={{title : 'Customer Dashboard'}}>
        <CustomerDashboard {...props}/>      
    </Layout>
)

export const Dashboard = props => <LazyComponent component={()=>import('./Page/AccountDashboard')} {...props}/>

export const MyOrder = props => <LazyComponent component={() => import('./Page/MyOrder')} {...props} />

export const OrderDetail = props => <LazyComponent component={() => import('./Page/OrderDetail')} {...props} />
