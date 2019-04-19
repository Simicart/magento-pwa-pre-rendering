import React from 'react'
import {CustomerDashboardHoC} from '../../src/App/Tapita/CustomerDashboard/HoC'

const OrderDetailPage = ({ query }, props) => {
    return <CustomerDashboardHoC {...props} page='order-detail' query={query}/>
}

OrderDetailPage.getInitialProps = async ({ query }) => {
    return { query };
}

export default OrderDetailPage;