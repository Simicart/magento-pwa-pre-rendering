/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 2/27/19
 * Time: 4:22 PM
 */
import React from 'react'
import Link from 'next/link'
import './style.css'
class AppBar extends React.Component{
    renderLogo = ()=>{
        return (
            <div id="app-logo">
                <Link href="/">
                <img style={{display: 'inline-block'}}
                     alt={'App Logo'}
                     src={"https://theme.zdassets.com/theme_assets/835315/46b5860567f3d9e07649c775676d979ab45b5b85.png"}/>
                </Link>
            </div>
        )
    }

    renderAppBar = ()=>{
        let app_style = {
            height: '55px',
            backgroundColor: '#fff'
        };
        return (
            <div id="app-bar" style={app_style}>
                {this.renderLogo()}
            </div>
        )
    }

    render(){
        // console.log(SMCONFIGS)
        return (
            <div style={{borderBottom: '1px solid #eeeeee'}}>
                {this.renderAppBar()}
            </div>
        )
    }
}
export default AppBar