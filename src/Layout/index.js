import Head from "./Head";
import React from "react";
import {Loading} from "../BaseComponent/Loading";
import Message from './Message'
/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 3:42 PM
 */
class Layout extends React.Component{

    renderApp(){
        return null
    }

    render(){
        return(
            <div>
                <Head {...this.props.header} />
                {this.renderApp()}
                <Message/>
                <div className="app-loading" style={{display:'none'}} id="app-loading">
                    <Loading/>
                </div>
            </div>
        )
    }
}
export default Layout