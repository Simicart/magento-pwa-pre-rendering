import React from 'react'
import {CustomerDashboardHoC} from '../../src/App/Tapita/CustomerDashboard/HoC'
import { async } from 'q';

const OrderDetailPage = ({ query }, props) => {
    return <CustomerDashboardHoC {...props} page='order-detail' query={query}/>
}

OrderDetailPage.getInitialProps = async ({ query }) => {
    return { query };
}

export default OrderDetailPage;