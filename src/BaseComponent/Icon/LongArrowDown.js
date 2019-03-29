/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 6/22/18
 * Time: 9:44 AM
 */
import React from 'react'
import Abstract from './Abstract'
class Icon extends Abstract {
    render(){
        return this.renderSvg('0 0 493.3 493.3',
            <path d="M139.3,380.9l101.4,109.6c1.9,1.9,4.2,2.9,6.9,2.9c2.5,0,4.7-1,6.6-2.9L354,380.9c2.5-3,3-6.4,1.4-10
		c-1.5-3.6-4.3-5.4-8.3-5.4h-64V9.1c0-2.7-0.9-4.9-2.6-6.6c-1.7-1.7-3.9-2.6-6.6-2.6h-54.8c-2.7,0-4.9,0.9-6.6,2.6
		c-1.7,1.7-2.6,3.9-2.6,6.6v356.3h-64c-3.8,0-6.6,1.8-8.3,5.4C136.4,374.5,136.9,377.8,139.3,380.9z"/>)
    }
}
export default Icon