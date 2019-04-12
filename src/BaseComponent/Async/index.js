/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/8/19
 * Time: 10:07 AM
 */
import React from 'react'
import dynamic from 'next/dynamic'
import Loading from '../Loading/LoadingImg'
export const LazyComponent = props => {
    const Component = dynamic({
        loader : props.component,
        loading : ()=><Loading/>,
        ssr : false
    })
    return <Component {...props}/>
}