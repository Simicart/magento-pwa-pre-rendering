import React from 'react'
import Sidebar from './index'

class  SidebarApp extends Sidebar {
    renderHeader = ()=>{
        return (
            <div className={this.props.SideBarClass + '-header-fixed header-sidebar'} >
                <div id={this.props.SideBarClass + '-app-bar'}
                     style={{
                         display : 'flex',
                         alignItems : 'center',
                         padding : '10px 20px',
                         background : this.configColor.button_background,
                         justifyContent : 'space-between'
                     }}
                >
                    <div className="sidebar-title" style={{fontSize : 24,color: this.configColor.button_text_color }}>
                        {this.props.title}
                    </div>
                    <div className="close-icon" onClick={()=>this.handleCloseSideBar()} >
                        {this.props.CloseIcon}
                    </div>
                </div>
            </div>
        )
    }

    renderContentView = ()=>{
        return (
            <div>
                {this.renderHeader()}
                <div className="content-sidebar-app" style={{height : window.innerHeight - 110}}>
                    {this.props.renderView}
                </div>
            </div>
        )
    }

    render(){
        return super.render();
    }
}
export default SidebarApp