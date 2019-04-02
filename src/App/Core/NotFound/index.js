/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 4:04 PM
 */
import React from 'react'
import Identify from '../../../Helper/Identify';
import Button from '../../../BaseComponent/Button';
import {Link} from 'simiLink'
const configColor = Identify.getColorConfig();
export const Page404 = ()=>{
    return (
        <div className="page-404 text-center" style={{marginTop : '20%'}}>
            <p style={{
                fontSize : '16px',
                textTransform : 'uppercase'
            }}>{Identify.__('404 error')}</p>
            <p style={{
                fontSize : '16px'
            }}>{Identify.__('Page not found')}</p>
            <div className="btn-back-to-home">
                <Link to="/">
                    <Button
                        text={Identify.__('Back to Home')}
                        textStyle={{
                            textTransform : 'unset',
                            color : configColor.button_text_color,
                            fontSize : '16px'
                        }}
                        style={{
                            backgroundColor : configColor.button_background,
                            borderRadius : 5,
                            margin : '0 auto'
                        }}
                    />
                </Link>
            </div>
        </div>
    )
}