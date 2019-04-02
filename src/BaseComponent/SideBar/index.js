import React from 'react';
import View from '../ViewComponent'
import PropTypes from 'prop-types';
import './sidebar.css';
import Identify from '../../Helper/Identify';
const configColor = Identify.getColorConfig()
class SideBar extends View{

    constructor(props){
        super(props)
        this.configColor = configColor
    }

    handleCloseSideBar = ()=>{
        const $ = window.$;
        let sidebar = $('#'+this.props.SideBarClass+'');
        if(sidebar.css('display') !== 'none'){
            sidebar.fadeToggle();
            sidebar.children('.content-sidebar').removeClass('in');
        }
        $('body').removeClass('fixed-scroll')
    };

    handleOpenSideBar = ()=>{
        const $ = window.$;
        let sidebar = $('#'+this.props.SideBarClass+'');
        if(!sidebar.children('.content-sidebar').hasClass('in')){
            sidebar.fadeToggle();
            sidebar.children('.content-sidebar').addClass('in');
        }
        $('body').addClass('fixed-scroll')
    }

    componentDidMount(){
        const $ = window.$;
        let classToggleSideBar = this.props.classToggleSideBar;
        let obj = this;
        $(function () {
            $(classToggleSideBar).click(function () {
                obj.handleOpenSideBar();
            })
        })
    }

    renderContentView = ()=>{
        return this.props.renderView;
    }

    componentWillUnmount(){
        const $ = window.$;
        $('body').removeClass('fixed-scroll')
    }

    render(){
        let width = -this.props.width + 'px';
        let contentStyle = {};
        if(this.props.showConfig === 'right'){
            width = this.props.width ;
            width = Identify.isRtl() ? -width+'px' : width+'px';
            contentStyle = {
                width : this.props.width,
                transform: `translateX(${width})`,
            };
            let rtl = Identify.isRtl() ? {left : 0} : {right : 0}
            contentStyle = {...contentStyle,...rtl}
        }else{
            width = this.props.width ;
            width = Identify.isRtl() ? width+'px' : -width+'px';
            contentStyle = {
                width : this.props.width,
                transform: `translateX(${width})`,
            };
            let rtl = Identify.isRtl() ? {right : 0} : {left : 0}
            contentStyle = {...contentStyle,...rtl}
        }
        contentStyle = {...contentStyle,...this.props.contentStyle}
        let SideBarStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99999,
            display: 'none'
        };
        let overlayStyle = {
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 1,
            background: '#8c8a8a',
            opacity: 0.5
        };
        SideBarStyle = {...SideBarStyle,...this.props.SideBarStyle};
        let SideBarClass = 'sidebar '+this.props.SideBarClass ;
        SideBarClass = Identify.isRtl() ? SideBarClass +' sidebar-rtl' : SideBarClass;
        return(
            <div className={SideBarClass} id={this.props.SideBarClass} style={SideBarStyle}>
                <div className="overlay-sidebar" style={overlayStyle} onClick={()=>this.handleCloseSideBar()}/>
                <div className="content-sidebar" style={contentStyle}>
                    {this.renderContentView()}
                </div>
            </div>
        )
    }
}
SideBar.defaultProps = {
    SideBarClass : '',
    SideBarStyle : {},
    renderView : <div></div>,
    contentStyle : {},
    width : 300,
    showConfig : 'left',
    classToggleSideBar : '',
}
SideBar.propsTypes = {
    SideBarClass : PropTypes.string,
    SideBarStyle : PropTypes.object,
    contentStyle : PropTypes.object,
    width : PropTypes.number,
    showConfig : PropTypes.string,
    classToggleSideBar : PropTypes.string
}
export default SideBar;