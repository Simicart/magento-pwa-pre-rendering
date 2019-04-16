import React from 'react'
import Identify from '../../../../Helper/Identify';
import PropTypes from 'prop-types';

class InputFields extends React.Component {
    render = () => {
        const props = this.props
        const type = props.type
        const name = props.name
        const value = props.value
        const label = props.label
        const show = props.show
        if (show !== "") {
            let classRequried = '';
            let liName = "li-" + name;
            let requiredLabel = '';

            if (show === 'req') {
                classRequried = 'required';
                requiredLabel = " *"
            }

            return (
                <li className="form-field-item" id={liName}>
                    <label htmlFor={name}>{label}<span className='required-label'>{requiredLabel}</span></label>
                    <input type={type} name={name} id={name} className={classRequried}
                           defaultValue={value}
                           onChange={(e)=>this.props.onChange(e)}
                           onBlur={(e) => this.props.onBlur(e)}/>
                    <div className="error-message">
                        {Identify.__('This field is required')}
                    </div>
                </li>
            );
        }
        return ''
    }
}

InputFields.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    label: PropTypes.string,
    show: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};
export default InputFields