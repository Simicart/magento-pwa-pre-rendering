/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 1:43 PM
 */
import React from 'react'
import Abstract from '../../Core/BaseAbstract'
import Layout from '../../../Layout/Tapita'
import Login from './Login'
import './style.css'
class CustomerAccount extends Abstract{

    render(){
        return(
            <Layout>
                <Login/>
            </Layout>
        )
    }
}
export default CustomerAccount