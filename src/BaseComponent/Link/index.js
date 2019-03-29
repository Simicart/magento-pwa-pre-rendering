/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 4:18 PM
 */
import React from 'react'
import {Router} from 'simiLink'

export const Link = props => {
    const onClick = e => {
        e.preventDefault()
        if(props.route){
            Router.pushRoute(props.route,props.params)
        }
    }
    return(
        <a href={props.href} target={props.target} onClick={onClick}>
            {props.children}
        </a>
    )
}