import Head from "./Head";
import React from "react";
import {Loading} from "../BaseComponent/Loading";
import Message from './Message'
import App from '../App/Tapita'
import PropTypes from "prop-types";
import Placeholder from './../BaseComponent/Placeholder'
/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 3:42 PM
 */
class Layout extends React.Component{

    renderLoadingType(){
        return (
            <React.Fragment>
                <div className="smc-normal-preload" style={{display: 'none', width: '100%'}}>
                    <Placeholder placeholderType="loading" />
                </div>
                <div className="smc-list-preload" style={{display: 'none', width: '100%'}}>
                    <Placeholder placeholderType="loading-list" />
                </div>
                <div className="smc-detail-preload" style={{display: 'none', width: '100%'}}>
                    <Placeholder placeholderType="loading-detail" />
                </div>
            </React.Fragment>
        )
    }

    render(){
        return(
            <div>
                <Head {...this.props.header} />
                <App server_render={this.props.server_render}>
                    {this.props.children}
                    <div id="app-placeholder-loading" style={{display:'none', top: 56}}>
                        {this.renderLoadingType()}
                    </div>
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