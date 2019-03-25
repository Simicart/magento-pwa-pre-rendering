import React from 'react'
import ObjectHelper from "../../Helper/ObjectHelper";
import Identify from '../../Helper/Identify';
import {SMCONFIGS,ColorConfig} from '../../../static/config'
class SimiComponent extends React.Component{
    constructor(props){
        super(props)
        this._mounted = true;
        this.parent = this.props.parent;
        this.state = {data:null,loaded:false}
        this.SMCONFIGS = SMCONFIGS
        this.ColorConfig = ColorConfig
    }

    isClient(){
        return Identify.isClient()
    }

    componentWillUnmount() {
        this._mounted = false;
    }
    
    shouldComponentUpdate(nextProps,nextState){
        return ObjectHelper.shallowCompare(this,nextProps,nextState);
    }

    setData(data){
        Identify.hideLoading();
        if (data.errors) {
            this.processError(data);
            let errors = data.errors;
            let text = "";
            for (let i in errors) {
                let error = errors[i];
                text += error.message + ' ';
            }
            Identify.showToastMessage(text);
        }else{
            this.processData(data);
        }
    }

    processError(data){
        console.log(data)
    }

    processData(data){
        console.log(data);
        this.setState(data)
    }

    setLoaded(loaded){
        this.setState({loaded})
    }
}
export default SimiComponent