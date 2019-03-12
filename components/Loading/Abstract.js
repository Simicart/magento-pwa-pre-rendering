import React from 'react'
import Identify from '../../Helper/Identify';

class Abstract extends React.PureComponent {
    constructor(props){
        super(props)
        let style = {
            fontSize:30,
            fill : '#5580ff',
            width: 65,
            height : 65
        };
        let color = this.props.color ? {fill: this.props.color} : {};
        this.style = {...style,...this.props.loadingStyle,...color};
        let divStyle = {
            textAlign : 'center',width : '100%',marginTop : 50
        }
        this.divStyle = {...divStyle,...this.props.divStyle}
    }

    renderLoading = (icon) => {
        return (
            <div id={this.props.id?this.props.id:Identify.makeid()}
                 className={`loading-spiner ${this.props.className}`}
                 style={this.divStyle}>
                {icon}
            </div>
        )
    }
}
export default Abstract