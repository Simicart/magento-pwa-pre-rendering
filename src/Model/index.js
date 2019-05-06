import Connection from './Connection';
import {SMCONFIGS} from '../../static/config'
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig()
class Model  {

    constructor(props) {
        this.isLoaded = false;
        this.data = null;
        let url = publicRuntimeConfig.server_url
        console.log(url)
        this.fullUrl = url+SMCONFIGS.api_path
        if (props && props.obj) {
            this.obj = props.obj;
        }
    }
    
    async connect(api, params ={}){
        // SimiMixpanel.track();
        api = this.fullUrl + api;
        console.log(api)
        Connection.restData();
        Connection.setGetData(params);
        let data = await Connection.connect(api);
        if(this.obj){
            this.setData(data)
            return true;
        }
        return data
    }
    
    /*
    * 
    * type = 'POST' 'PUT' 'DELETE'
    * urlParam = {index: value}
    * bodyData = {index: value}
    * 
    */
   async advancedConnect(type, api, urlParam, bodyData) {
        // SimiMixpanel.track();
        api = this.fullUrl + api;
        Connection.restData();
        Connection.setGetData(urlParam);
        Connection.setBodyData(bodyData);
        let data = await Connection.connect(api, type);
        if(this.obj){
            this.setData(data)
            return true;
        }
        return data
    }

    setLoaded(isLoaded) {
        this.isLoaded = isLoaded;
        if (this.obj) {
            try{
                this.obj.setLoaded(isLoaded);
            } catch(err) {

            }
        }
    }

    setData(data) {
        this.data = data;
        if (this.obj) {
            try{
                this.setLoaded(true)
                this.obj.setData(data);
            } catch(err) {

            }
        }
    }

    async connectWithUrl( api,type = 'GET', urlParam = {}, bodyData = {}){
        // SimiMixpanel.track();
        Connection.restData();
        Connection.setGetData(urlParam);
        Connection.setBodyData(bodyData);
        let data = await Connection.connect(api,type);
        if(this.obj){
            this.setData(data)
            return true;
        }
        return data
    }

    getProductApi(api,params = {}){
        params['image_height'] = 1206;
        params['image_width'] = 750;
        return this.connect(api,params)
    }
}

export default Model;
