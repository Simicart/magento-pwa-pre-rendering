/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 5:45 PM
 */
import React from 'react'
import Abstract from '../../Core/BaseAbstract'
import Layout from '../../../Layout/Tapita'
class Detail extends Abstract{

    render() {
        return (
            <Layout server_render={true}>
                Product Detail
            </Layout>
        );
    }
}
export default Detail