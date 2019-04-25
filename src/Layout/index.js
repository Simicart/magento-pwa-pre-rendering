import Head from "./Head";
import React from "react";
import {Loading} from "../BaseComponent/Loading";
import Message from './Message'
import App from '../App/Tapita'
import PropTypes from "prop-types";
/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 3:42 PM
 */
class Layout extends React.Component{

    componentDidMount() {
        sessionStorage.removeItem('product_list_review');
    }

    render(){
        return(
            <div>
                <Head {...this.props.header} />
                <App server_render={this.props.server_render}>
                    {this.props.children}
                </App>
                <Message/>
                <div className="app-loading" style={{display:'none'}} id="app-loading">
                    <Loading/>
                </div>
            </div>
        )
    }
}
Layout.propsTypes = {
    server_render : PropTypes.bool,
    header : PropTypes.object
}
export default Layout