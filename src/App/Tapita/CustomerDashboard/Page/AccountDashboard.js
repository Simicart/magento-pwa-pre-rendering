/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/8/19
 * Time: 10:05 AM
 */
import React from 'react'
import PageAbstract from './PageAbstract'

class AccountDashboard extends PageAbstract{

    render() {
        return (
            <div className="account-dashboard">
                {this.renderPageTitle('My Dashboard')}
            </div>
        );
    }
}
export default AccountDashboard