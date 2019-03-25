/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 10/12/18
 * Time: 9:33 AM
 */
import React from 'react'
import Img from '../../../../../../magento-pwa1/src/BaseComponent/Img'
import Loading from "../../../../../../magento-pwa1/src/BaseComponent/Loading/LoadingImg";
class ImgItem extends Img{

    componentDidUpdate(){
    const $ = window.$;
        let w = $('.product-item').first().width();
        let img = $('#'+this.id);
        img.css({
            width:w,
            height:w,
        })
        img.find('.iron-image-loaded').css({
            width:w,
            height:w,
        })
        img.find('.iron-image-loaded img').css({
            width:w,
            height:w,
        })
    }

    componentDidMount(){
        const $ = window.$;
        let w = $('.product-item').first().width();
        let img = $('#'+this.id);
        img.css({
            width:w,
            height:w,
        })
        img.find('.iron-image-loaded').css({
            width:w,
            height:w,
        })
        img.find('.iron-image-loaded img').css({
            width:w,
            height:w,
        })
        this.ironImageHd.onload = (e) => {
            // this.ironImageHd.setAttribute(
            //     'style',
            //     `background-image: url('${this.props.srcLoaded}')`
            // );
            // this.ironImageHd.classList.add('iron-image-fade-in');
            this.setState({loaded:true});
            // this.imgLoaded.classList.add('iron-image-fade-in');
            $('#'+this.id).find('.iron-image-loaded').addClass('iron-image-fade-in');
            $('#'+this.id).find('.iron-image-preload').addClass('hidden')
        }
    }

    render() {
        this.ironImageHd = new Image();
        this.ironImageHd.src = this.props.src;
        let img = this.state.loaded ?
            <img src={this.props.src} alt={this.props.alt} style={{...this.props.style,minWidth:'100%',minHeight:'auto'}}/> : null;
        return (
            <div className="iron-image-container" style={{background : '#fff'}} id={this.id}>
                <div
                    className="iron-image-loaded"
                    ref={(img)=>this.imgLoaded = img}
                >
                    {img}
                </div>
                <div
                    className="iron-image-preload"
                    ref={(loaded) => this.preLoaded = loaded}
                    style={{margin:'0 auto'}}
                >
                    {/*//style={{ backgroundImage: `url('${this.props.srcPreload}')` }}>*/}
                    <Loading className="loading-img" divStyle={{marginTop:'auto'}}/>
                </div>

            </div>
        )
    }
}
export default ImgItem