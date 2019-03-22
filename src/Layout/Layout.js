import Head from "./head";
import React from "react";
import {Tapita} from '../App/Tapita'
import {Loading} from "../BaseComponent/Loading";
import './global.css'
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
            <Tapita server_render={props.server_render}>
                {props.children}
            </Tapita>
            <div className="app-loading" style={{display:'none'}} id="app-loading">
                <Loading/>
            </div>
            {/* <script type="application/javascript" src="/static/config.js"/> */}
        </div>
    )
}
export default Layout