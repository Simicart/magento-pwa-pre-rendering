import  React from 'react';
import Identify from '../../Helper/Identify';
import './placeholder.css'
import Loading from '../Loading';

const IMAGE_TYPE = 'image';
const CUSTOM_TYPE = 'custom';
const LOADING_TYPE = 'loading';

const maskerStyle = {background: Identify.getColorConfig().app_background}
class Placeholder extends React.Component {

    renderImagePlaceholderBlock(src, style) {
        return (<div className="loading-placeholder">
            <div className="image-type" style={style}>
                <img src={src} align="Loading..." alt=""/>
            </div>
        </div>);
    }

    renderDefaultBlock() {
        return (
            <Loading className="loading"/>
        );
    }

    renderSpinnerProgressBlock() {
        return (
            <div className="spinner-container">
                <div className="spinner">
                    <div key={Identify.makeid()} className="rect1"
                         style={{backgroundColor: configColor.loading_color}}></div>
                    <div key={Identify.makeid()} className="rect2"
                         style={{backgroundColor: configColor.loading_color}}></div>
                    <div key={Identify.makeid()} className="rect3"
                         style={{backgroundColor: configColor.loading_color}}></div>
                    <div key={Identify.makeid()} className="rect4"
                         style={{backgroundColor: configColor.loading_color}}></div>
                    <div key={Identify.makeid()} className="rect5"
                         style={{backgroundColor: configColor.loading_color}}></div>
                </div>
            </div>
        );
    }

    renderCustomViewBlock(view) {
        return (<div className="loading-placeholder">
            {view}
        </div>);
    }

    renderLoadingBlock() {
        return (
            <div className="shimmer-loading-view">
                <div className="timeline-item">
                    <div className="animated-background">
                        <div className="background-masker line-top" style={maskerStyle}></div>
                        <div className="background-masker padding-cate" style={maskerStyle}></div>
                        <div className="background-masker padding-cate-second" style={maskerStyle}></div>
                        <div className="background-masker line-cate" style={maskerStyle}></div>
                        <div className="background-masker cate-name" style={maskerStyle}></div>
                        <div className="background-masker cate-name-second" style={maskerStyle}></div>
                        <div className="background-masker cate-name-third" style={maskerStyle}></div>
                        <div className="background-masker line-list-products" style={maskerStyle}></div>
                        <div className="background-masker padding-list" style={maskerStyle}></div>
                        <div className="background-masker padding-list-second" style={maskerStyle}></div>
                        <div className="background-masker line-product-price" style={maskerStyle}></div>
                        <div className="background-masker product-name" style={maskerStyle}></div>
                        <div className="background-masker product-name-second" style={maskerStyle}></div>
                        <div className="background-masker line-product-one" style={maskerStyle}></div>
                        <div className="background-masker line-product-two" style={maskerStyle}></div>
                        <div className="background-masker product-price" style={maskerStyle}></div>
                        <div className="background-masker product-sub-price" style={maskerStyle}></div>
                        <div className="background-masker line-product-third" style={maskerStyle}></div>

                    </div>
                </div>
            </div>
        );
    }


    render() {

        if (this.props && this.props.placeholderType === CUSTOM_TYPE) {
            if (this.props && this.props.customView) {
                return (
                    <div className="loading-container">
                        {this.renderCustomViewBlock(this.props.customView)}
                    </div>
                );
            }
        }

        if (this.props && this.props.placeholderType === IMAGE_TYPE) {
            if (this.props && this.props.src) {
                return (
                    <div className="loading-container">
                        {this.renderImagePlaceholderBlock(this.props.src)}
                    </div>
                );
            }
        }

        if (this.props && this.props.placeholderType === LOADING_TYPE) {
            return (
                <div className="loading-holder">
                    {this.renderLoadingBlock()}
                </div>
            );
        }

        return (
            <div className="loading-container">
                {this.renderDefaultBlock()}
            </div>
        );
    }
}

export  default Placeholder;