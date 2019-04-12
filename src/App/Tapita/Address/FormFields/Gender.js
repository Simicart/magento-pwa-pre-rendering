import React from 'react';
import Base from "../../../Core/BaseAbstract";
import Select from '../../../../BaseComponent/Select';
import Identify from "../../../../Helper/Identify";


class Gender extends Base {
    constructor(props) {
        super(props);
        this.name = 'gender';
        this.label = Identify.__('Gender');
        this.required = this.props.required || 'req';
        this.dataBind = this.props.dataBind;
        this.onChangeGender = this.onChangeGender.bind(this);
        this.state = {selectedValue: this.dataBind[0].value}
    }

    onChangeGender = (event, key, value) => {
        this.setState({selectedValue: value});
    };

    render = () => {
        let liName = "li-" + this.name;
        let requiredLabel = '';
        if (this.required === 'req') {
            requiredLabel = ' *';
        }

        return (
            <li className="form-field-item" id={liName} key={Identify.makeid()}>
                <label htmlFor={this.name}>{this.label}<span className='required-label'>{requiredLabel}</span></label>
                <input type="hidden" value={this.state.selectedValue}/>
                <Select dataBind={this.dataBind} onChange={this.onChangeGender} value={this.state.selectedValue}/>
                <div className="error-message">
                    {Identify.__('This field is required')}
                </div>
            </li>
        );
    }
}

export default Gender;