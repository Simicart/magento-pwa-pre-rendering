import React from 'react'
import Abstract from '../../../Core/BaseAbstract';
import Rows from '../../../Tapita/Home/Matrix/Rows';
import {HomeContext} from "../../../Core/Home/HomeAbstract";
class Matrix extends Abstract{
    render() {
        return (
            <HomeContext.Consumer>
                {data =>
                    <div>
                        <Rows data={data} />
                    </div>
                }
            </HomeContext.Consumer>
        );
    }
}
export default Matrix