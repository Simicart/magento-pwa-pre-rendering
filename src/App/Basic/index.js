import React from 'react'
import AppBar from './Header/AppBar'
import NoSSR from 'react-no-ssr';
import LoadingImg from '../../BaseComponent/Loading/LoadingImg';
const Basic = props => {
    return(
        <React.Fragment>
            <div className="app-header">
                <AppBar/>
            </div>
            <div className="app-body" style={{marginTop:55,paddingTop:10, display: 'flow-root'}}>
                {props.server_render ? props.children : (
                    <NoSSR onSSR={<LoadingImg/>}>
                        {props.children}
                    </NoSSR>
                )}
            </div>
        </React.Fragment>
    )
}
export default Basic