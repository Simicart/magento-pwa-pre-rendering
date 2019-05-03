import React from 'react'
import ObjectHelper from "../../Helper/ObjectHelper";
import Identify from '../../Helper/Identify';
import {SMCONFIGS,ColorConfig} from '../../../static/config'
import {Router} from 'simiLink'
class SimiComponent extends React.Component{
    constructor(props){
        super(props)
        this._mounted = true;
        this.parent = this.props.parent;
        this.state = {data:null,loaded:false,isPhone : Identify.isMobile()||true}
        this.SMCONFIGS = SMCONFIGS
        this.configColor = ColorConfig
        this.data = this.props.data
        if(Identify.isClient()){
            this.state.isPhone = this.checkIsPhone()
        }
    }

    checkIsPhone(){
        return window.innerWidth < 768
    }

    checkPhoneResize(){
        let obj = this;
        if(Identify.isClient()){
            const $ = window.$;
            $(window).resize(function () {
                let width = window.innerWidth;
                let isPhone = width < 768;
                if(obj.state.isPhone !== isPhone){
                    obj.setState({isPhone})
                }
            })
        }
    }

    componentDidMount(){
        this.setState({isPhone : window.innerWidth < 768})
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
        this.setState({data})
    }

    setLoaded(loaded){
        this.setState({loaded})
    }

    pushLink(route){
        if(route instanceof Object){
            if(route.pushTo){
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'pushTo',route.pushTo)
            }
            if(route.pathname){
                Router.pushRoute(route.pathname)
            }
            return;
        }
        if(route){
            Router.pushRoute(route)
        }
    }

    replaceLink(route){
        if(route)
            Router.replaceRoute(route)
    }
}
export default SimiComponent