/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 4:18 PM
 */
import React from 'react'
import {Link} from 'simiLink'

export const SimiLink = props => {
    return(
        <Link {...props}>
            <a>
                {props.children}
            </a>
        </Link>
    )
}