import fetch from 'isomorphic-unfetch';
//import fetch from 'node-fetch';

class Connection {
    constructor(props) {
        // this.config = config;
        this._dataGet = [];
        this._dataPost = null;
        this._headers = {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            // 'Access-Control-Allow-Credentials': true
        };
        this._init = {cache: 'default', mode: 'cors'};
    }

    setHeader(key, value) {
        this._headers.set(key, value);
    }

    setInitConfig(key, value) {
        this._init[key] = value;
    }

    setHttpMethod(method) {
        this._init['method'] = method;
    }

    setLoading(isLoad) {
        this._loading = isLoad;
    }

    restData() {
        this._dataGet = [];
        this._dataPost = null;
        this._init['body'] = null;
    }

    //param is array
    setGetData(data) {
        this._dataGet = Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(data[key]);
        })
    }

    //param is JSON
    setBodyData(data) {
        this._dataPost = JSON.stringify(data);
    }

    /**
     * param url - api resources/{id}/nested_resources/{nested_id}?refines
     * param obj - object that call to Api.
     **/
    async connect(_fullUrl,method = 'GET') {
        if(typeof(Storage) !== "undefined"){
            if (sessionStorage.getItem('email')) {
                let email = sessionStorage.getItem('email').replace(/['"]+/g, '');
                this._dataGet.push(`email=${email}`)
                if (sessionStorage.getItem('simi_hash')) {
                    let simi_hash = sessionStorage.getItem('simi_hash').replace(/['"]+/g, '');
                    this._dataGet.push(`simi_hash=${simi_hash}`)
                } else if (sessionStorage.getItem('password')) {
                    let password = sessionStorage.getItem('password').replace(/['"]+/g, '');
                    this._dataGet.push(`password=${password}`)
                }
            }
        }
        this._dataGet = this._dataGet.join('&')
        if(_fullUrl.includes('?')){
            _fullUrl += "&" + this._dataGet;
        }else{
            _fullUrl += "?" + this._dataGet;
        }

        this._init['headers'] = this._headers;
        this._init['method'] = method;
        this._init['credentials'] = 'same-origin';
        if (this._dataPost) {
            this._init['body'] = this._dataPost;
        }
        if (method === 'GET') {
            this._init['body'] = null;
        }

        try {
            let data = await (await fetch(_fullUrl,this._init)).json()
            return data;
        } catch (error) {
            console.warn(error);
            return { error: error };
        }
    }
}

const connection = new Connection();
export default connection;
