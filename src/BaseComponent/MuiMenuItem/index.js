import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Identify from "../../Helper/Identify";
import PropTypes from 'prop-types';

const configColor = Identify.getColorConfig()

class MenuItem extends Component {
    render() {
        let {title,icon,divider,menuStyle,iconStyle,titleStyle} = this.props;
        return (
            <div>
                <ListItem button style={menuStyle} onClick={this.props.onClick}>
                    <div className="menu-content">
                        <div className="icon-menu" style={iconStyle}>
                            {icon}
                        </div>
                        <div className="menu-title" style={titleStyle}>
                            {title}
                        </div>
                    </div>
                </ListItem>
                {divider && (
                    <Divider style={{backgroundColor:configColor.menu_line_color}}/>
                )}
            </div>

        )
    }
}
MenuItem.defaultProps = {
    title : '',
    icon : '',
    divider : true,
    menuStyle : {},
    titleStyle : {},
    iconStyle : {},
    onClick : function () {}
}
MenuItem.propsTypes = {
    title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ]),
    icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ]),
    divider: PropTypes.bool,
    menuStyle : PropTypes.object,
    titleStyle : PropTypes.object,
    iconStyle : PropTypes.object,
    onClick : PropTypes.func
}
export default MenuItem;