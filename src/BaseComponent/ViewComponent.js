import React from 'react'
import ObjectHelper from '../Helper/ObjectHelper';
import Identify from '../Helper/Identify';
class Abstract extends React.Component{

    constructor(props){
        super(props)
        this.colorConfig = Identify.getColorConfig();
    }

    shouldComponentUpdate(nextProps,nextState){
        return ObjectHelper.shallowCompare(this,nextProps,nextState);
    }
}
export default Abstract