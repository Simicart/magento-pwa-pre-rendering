import React from 'react';
import ViewComponent from '../ViewComponent';
import Loading from '../Loading/ReactLoading';
import PropTypes from 'prop-types';
import ButtonUI from '@material-ui/core/Button'
import Identify from '../../Helper/Identify';
class Button extends ViewComponent {

    constructor(props){
        super(props);
        this.text = this.props.text ;
        this.className = this.props.className ;
        this.style = {
            backgroundColor: Identify.getColorConfig().button_background,
            display : 'flex',
            alignItems : 'center',
            cursor: 'pointer',
            borderRadius : 5
        };
        this.textStyle = {
            color : Identify.getColorConfig().button_text_color,
            textAlign : 'center',
            fontSize : '16px',
            width : '100%',
            fontWeight : 600,
            textTransform :'initial'
        };
    }

    renderButton = ()=>{
        let style = {...this.style,...this.props.style};
        let textStyle = {...this.textStyle,...this.props.textStyle};
        let btn = <div ref={(div) => {this.btnText = div}} className="btn-text" style={textStyle}>
                    {this.text}
                </div>
        if(this.props.disable){
            style = {...style,...{background : '#d2d2d2',color : '#fff'}}
            btn = <div ref={(div) => {this.btnText = div}} className="btn-text" style={textStyle} >
                {this.text}
            </div>;
        }
        return(
            <ButtonUI className={`btn-component ${this.className}`} color="primary" style={style} onClick={this.props.onClick}>
                {btn}
                <div ref={(div) => {this.btnLoading = div}} className="btn-loading" style={{position:'absolute',display:'none'}}>
                    <Loading loadingStyle={{fill:Identify.getColorConfig().button_text_color, fontSize: 24}} divStyle={{marginTop : 0}}/>
                </div>
            </ButtonUI>
        )
    };

    render(){
        return this.renderButton();
    }
    
    showLoading() {
        this.btnText.style.display = 'none';
        this.btnLoading.style.display = 'block';
    }
    hideLoading() {
        this.btnText.style.display = 'block';
        this.btnLoading.style.display = 'none';
    }
}
Button.defaultProps = {
    style : {},
    textStyle : {},
    text: 'Button',
    className : '',
    disable : false
};
Button.propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    className: PropTypes.string,
};
export default Button;