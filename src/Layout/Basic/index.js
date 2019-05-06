import React from 'react'
import Layout from '../index'
import {Basic} from "../../App/Basic";
import PropTypes from 'prop-types';

class BasicLayout extends Layout{
        
    renderApp(){
        return(
            <Basic server_render={this.props.server_render}>
                {this.props.children}
            </Basic>
        )
    }

    render() {
        return super.render()
    }
}
BasicLayout.propsTypes = {
    server_render : PropTypes.bool,
    header : PropTypes.object
}
export default BasicLayout