import React from 'react'
import BaseAbstract from '../BaseAbstract'
import Model from './HomeModel'
import * as Constants from '../../../Helper/Constants'
import Identify from '../../../Helper/Identify';
import Banner from './Banner'
const HomeModel = new Model();

const jsonSimiCart = Identify.getAppDashboardConfigs();
let layout = 1;
let app_name = 'Home | PWA';
if (jsonSimiCart !== null) {
    const config = jsonSimiCart['app-configs'][0];
    app_name = config.app_name;
    if (config.home === "default") {
        layout = 1;
    } else if (config.home === "matrix") {
        layout = 2;
    } else {
        layout = 3;
    }
}
class HomeAbstract extends BaseAbstract{

    static async getInitialProps(ctx) {
        // console.log(ctx)
        let params = {
            image_height: Constants.HEIGHT_IMAGE_PHONE,
            image_width: Constants.HEIGHT_IMAGE_PHONE
        }
        let data = null;

        // for api cache
        if (Identify.isClient()){
            data = Identify.ApiDataStorage('home_api') || null;
            if(data instanceof Object)  return {home:data}
        }

        if(layout !== 3){
            data = await HomeModel.getHomeFull(params)
        }else{
            params['get_child_cat'] = 1
            data = await HomeModel.getHomeLite(params)
        }
        return {...data}
    }
    constructor(props){
        super(props)
        this.metaHeader = {
            title : app_name,
            description : 'Progress Web App'
        }
        this.layout = layout;
        this.homepage = 'tapita-homepage'
    }

    renderTheme(){}

    renderBanner = () => {
        if(this.layout === 3 || !this.props.home){
            return <div/>
        }
        return <Banner data={this.props.home.homebanners} isPhone={this.state.isPhone} />
    }

    renderLayout(component){
        return(
            <div>
                {component}
            </div>
        )
    }

    componentDidMount(){
        this.checkPhoneResize()
        Identify.showMsgLogin()
        Identify.showMsgLogout()
        Identify.ApiDataStorage('home_api','update',this.props.home)
    }

    render(){
        return this.renderLayout(
            <HomeContext.Provider value={this.props.home}>
                <div className={`homepage ${this.homepage}`}>
                    {this.renderBanner()}
                    <div className="theme-content">
                        {this.renderTheme()}
                    </div>
                </div>
            </HomeContext.Provider>
        )
    }
}
export const HomeContext = React.createContext();
export default HomeAbstract