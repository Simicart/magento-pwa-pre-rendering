/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 5:52 PM
 */
import React from 'react'
import Layout from '../index'
import {Tapita} from "../../App/Tapita";

class TapitaLayout extends Layout{

    renderApp(){
        return(
            <Tapita server_render={this.props.server_render}>
                {this.props.children}
            </Tapita>
        )
    }

    render() {
        return super.render()
    }
}
export default TapitaLayout