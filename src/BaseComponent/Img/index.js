import React, { Component } from 'react';
import './img.css';
import Loading from '../Loading/LoadingImg';
import Identify from "../../Helper/Identify";
import NoSSR from 'react-no-ssr'
class IronImage extends Component {

    constructor(props) {
        super(props);
        this.ironImageHd = null;
        this.state = {
            loaded : false
        }
        this.id = 'img-'+Identify.makeid()
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.state.loaded !== nextState.loaded;
    }

    componentDidMount(){
        const $ = window.$;
        let img = $('#'+this.id)
        let w = img.width();
        if(w > 400) w = w/2
        img.height(w)
        this.ironImageHd.onload = (e) => {
            img.height('100%')
            this.setState({loaded:true});
            img.find('.iron-image-loaded').addClass('iron-image-fade-in');
            img.find('.iron-image-preload').addClass('hidden')
            img.css({
                minWidth:'unset',
                minHeight:'unset'
            }).find('.iron-image-loaded').css({
                minWidth:'100%',
                minHeight:'100%'
            })
        }
    }

    render() {
        if(!Identify.isClient()){
            return <img {...this.props}/>
        }
        this.ironImageHd = new Image();
        this.ironImageHd.src = this.props.src;

        let style = {
            // minWidth:window.innerWidth,
            // minHeight:window.innerWidth/2,
            width : this.props.width,
            height : this.props.height
        }
        let img = this.state.loaded ?
            <img {...this.props}/> : null;

        return (
            <div className="iron-image-container" style={{...style,background : '#fff'}} id={this.id}>
                <div
                    className="iron-image-loaded"
                    ref={(img)=>this.imgLoaded = img}
                    style={style}
                >
                    {img}
                </div>
                <div
                    className="iron-image-preload"
                    ref={(loaded) => this.preLoaded = loaded}
                    style={{minWidth:100,minHeight:100,margin:'0 auto'}}
                >
                    {/*//style={{ backgroundImage: `url('${this.props.srcPreload}')` }}>*/}
                    <Loading className="loading-img" divStyle={{marginTop:'auto'}}/>
                </div>

            </div>
        )
    }

}
IronImage.defaultProps = {
    alt : '',
    style : {},
    width : '100%',
    height: '100%'
}
// IronImage.propTypes = {
//     width: propTypes.isRequired,
//     height: propTypes.isRequired
// }
export default IronImage;