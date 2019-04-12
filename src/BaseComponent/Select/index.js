import React from 'react';
import ViewComponent from '../ViewComponent'
import Identify from "../../Helper/Identify";
import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

const styles = {
    style: {background: "#f2f2f2", borderRadius: 5, height: 40, paddingLeft: 16},
    iconStyle: {padding: 8},
    labelStyle: {lineHeight: '50px', height: 40, fontSize: 16, fontWeight: 300},
    fullWidth: true,
    underlineStyle: {display: 'none'}
};

class Select extends ViewComponent {
    constructor(props) {
        super(props);
        this.style = this.props.style || styles.style;
        this.iconStyle = this.props.iconStyle || styles.iconStyle;
        this.labelStyle = this.props.labelStyle ||styles.labelStyle;
        this.underlineStyle = this.props.underlineStyle || styles.underlineStyle;
        this.fullWidth = this.props.fullWidth || styles.fullWidth;
        this.onChange = this.props.onChange;

    }

    renderItems = () => {
        let data = this.props.dataBind;
        return data.map((item) => {
            return (
                <MenuItem style={this.labelStyle} value={item.value}key={Identify.makeid()}>
                    <div className="select-item">
                        {item.label}
                    </div>
                </MenuItem>
            );
        });
    };
    render = () => {
        this.value = this.props.value || null;
        return (
            <SelectField
                fullWidth={this.fullWidth}
                style={this.style}
                underlinestyle={this.underlineStyle}
                value={this.value}
                iconstyle={{padding: 8}}
                onChange={this.onChange}
            >
                {this.renderItems()}
            </SelectField>
        );
    }
}

Select.defaultProps = {
    style: styles.style,
    iconStyle: styles.iconStyle,
    labelStyle: styles.labelStyle,
    underlineStyle: styles.underlineStyle,
    fullWidth: styles.fullWidth,
    dataBind: [],
    onChange: {},
};
Select.propTypes = {
    style: PropTypes.object,
    iconStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    fullWidth: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    dataBind: PropTypes.array,
};

export default Select;