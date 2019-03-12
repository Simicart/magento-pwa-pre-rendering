import Head from "./head";
import React from "react";
import AppBar from '../components/Header/AppBar'
import NoSSR from "react-no-ssr";
import {Loading} from "./Loading";
/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 3:42 PM
 */
const Layout = props => {
    return (
        <div>
            <Head {...props.header} />
            <div className="app-header">
                <AppBar/>
            </div>
            <div className="app-body" style={{marginTop:55,paddingTop:10}}>
                {props.children}
            </div>
            <div className="app-loading" style={{display:'none'}} id="app-loading">
                <Loading/>
            </div>
            {/* <script type="application/javascript" src="/static/config.js"/> */}
        </div>
    )
}
export default Layout