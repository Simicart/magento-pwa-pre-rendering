import React from 'react'
import AppBar from './Header/AppBar'
import NoSSR from 'react-no-ssr';
export const Tapita = props => {
    return(
        <React.Fragment>
            <div className="app-header">
                <AppBar/>
            </div>
            <div className="app-body" style={{marginTop:55,paddingTop:10}}>
                {props.server_render ? props.children : (
                    <NoSSR onSSR={`loadding...`}>
                        {props.children}
                    </NoSSR>
                )}
            </div>
        </React.Fragment>
    )
}