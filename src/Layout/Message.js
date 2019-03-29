/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 9:45 AM
 */
import React from 'react';
export default class Message extends React.PureComponent{
    render(){
        return (
            <div className="message-global" style={{display: 'none'}}>
                <div id="error-message">
                </div>
                <div id="success-message">
                </div>
                <div id="waring-message">
                </div>
            </div>
        );
    }
}
