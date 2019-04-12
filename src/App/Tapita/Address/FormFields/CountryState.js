import React from 'react';
import Base from "../../../Core/BaseAbstract";
import Identify from "../../../../Helper/Identify";
import SearchList from "../../../../BaseComponent/Popup/SearchList";
import PropTypes from 'prop-types';
import ArrowDown from '../../../../BaseComponent/Icon/ArrowDown'

class CountryState extends Base {
    constructor(props) {
        super(props);
        this.isStateRequired = this.props.isStateRequired;
        this.allCountries = this.props.allCountries;
        this.defaultCountryCode = this.props.defaultCountryCode;
        this.defaultRegionId = this.props.defaultRegionId;
        this.defaultRegionName = this.props.defaultRegionName;
        this.listCountry = [];
        this.states = [];
        this.country_code = this.defaultCountryCode;

        let isPhone = this.state.isPhone;
        this.isShowListRegion = false;
        for (let i in this.allCountries) {
            let allow = this.allCountries[i];
            this.listCountry = [...this.listCountry, {label: allow.country_name, value: allow.country_code}];

            if (allow.country_code === this.defaultCountryCode) {
                this.country_code = allow.country_code;
                this.country_name = allow.country_name;
                this.states = allow.states;
                if (this.states.length > 0) {
                    this.isShowListRegion = true;
                }
            }
        }
        this.stateId = 1;
        if (this.states.length > 0) {
            if (this.defaultRegionId) {
                this.stateId = this.defaultRegionId;
                this.states.map((item) => {
                    if (parseInt(item.state_id, 10) === parseInt(this.stateId, 10)) {
                        this.state_name = item.state_name;
                        return true;
                    }
                    return null
                })
            } else {
                this.stateId = this.states[0].state_id;
                this.state_name = this.states[0].state_name;
            }
        }
        if (this.props.useEmptySelection) {
            this.listCountry.unshift({label: Identify.__('Please choose a country'), value: ''});
            if (!this.defaultCountryCode) {
                this.country_code = '';
                this.country_name = Identify.__('Please choose a country');
            }

        }
        this.state = {
            country_name: this.country_name,
            country_code: this.country_code,
            region_id: this.stateId,
            state_name: this.state_name,
            region: this.defaultRegionName,
            states: this.states,
            isPhone
        }
    }

    renderListCountry = () => {

        this.isCountryRequired = this.props.isCountryRequired;
        if (this.isCountryRequired !== '') {
            let requiredLabel = '';
            if (this.isCountryRequired === 'req') {
                requiredLabel = '*';
            } ;

            return (
                <li key={Identify.makeid()} id="li-country" className='form-field-item'>
                    <label htmlFor='country'>{Identify.__('Country')}<span
                        className='required-label'>{requiredLabel}</span></label>
                    <input type="hidden" name="country_id" value={this.state.country_code}/>
                    <input type="hidden" name="country_name" value={this.state.country_name}/>
                    <div className="fake-input-select" onClick={() => this.showListCountry()}>
                        <span className="input-label">{this.state.country_name}</span>
                        <span className="input-icon"><ArrowDown/></span>
                    </div>
                    <SearchList ref={(name) => this.countries = name}
                                DataBind={this.listCountry}
                                id="modal-country"
                                popupTitle={Identify.__('Please choose a country')}
                                itemSelect={String(this.state.country_code)}
                                popup={true}
                                itemClick={(e) => this.handleCountryChange(e)}
                    />
                </li>
            );
        }
    };

    renderStates = () => {
        let listState = this.state.states.map((item) => {
            return {value: item.state_id, label: item.state_name}
        });
        this.isShowListRegion = this.state.states.length > 0;
        //add fix show/hide region list
        if (this.props.isShowListRegion !== undefined) {
            this.isShowListRegion = Boolean(this.props.isShowListRegion);
        }
        this.isStateRequired = this.props.isStateRequired;
        console.log(this.isShowListRegion)
        if (this.isStateRequired !== '') {
            let requiredLabel = '';
            if (this.isStateRequired === 'req') {
                requiredLabel = '*';
            }
            ;

            return (
                <div className="region-view">
                    {this.isShowListRegion && (
                        <li key={Identify.makeid()} id="li-region-id" className='form-field-item'>
                            <label htmlFor='country'>{Identify.__('State/Province')}<span
                                className='required-label'>{requiredLabel}</span></label>
                            <input type="hidden" value={this.state.region_id} id='region_id' name="region_id"/>
                            <div className="fake-input-select" onClick={() => this.showListState()}>
                                <span className="input-label">{this.state.state_name}</span>
                                <span className="input-icon"><ArrowDown/></span>
                            </div>
                            <SearchList ref={(name) => this.states = name}
                                        DataBind={listState}
                                        id="modal-sate"
                                        popupTitle={Identify.__('Please choose a state')}
                                        itemSelect={String(this.state.region_id)}
                                        popup={true}
                                        itemClick={(e) => this.handleStateChange(e)}
                            />
                        </li>
                    )}

                    {!this.isShowListRegion && (
                        <li key={Identify.makeid()} id="li-region-id" className='form-field-item'>
                            <label htmlFor='country'>{Identify.__('State/Province')}<span
                                className='required-label'>{requiredLabel}</span></label>
                            <input type="text" defaultValue={this.state.region} id='region' name="region"/>

                        </li>
                    )}
                </div>

            );
        }
    };

    handleCountryChange = (event) => {
        const $ = window.$;
        let target = event.currentTarget;
        let value = $(target).find('input[type=hidden]').val();
        for (let i in this.allCountries) {
            let allow = this.allCountries[i];
            if (allow.country_code === value) {
                if (allow.states.length <= 0) {
                    $('#li-region_id').hide();
                    $('#li-region').show();
                } else {
                    $('#li-region_id').show();
                    $('#li-region').hide();
                }
                this.country_name = allow.country_name;
                this.states = allow.states;
                this.country_code = value;
                break;
            } else {
                if (!value) {
                    this.country_name = Identify.__('Please choose a country');
                    this.states = [];
                    this.country_code = "";
                    break;
                }
            }
        }
        return this.setState({country_code: this.country_code, country_name: this.country_name, states: this.states});
    };

    handleStateChange = (event) => {
        const $ = window.$;
        let target = event.currentTarget;
        let value = $(target).find('input[type=hidden]').val();
        for (let i in this.state.states) {
            let state = this.state.states[i];
            if (parseInt(state.state_id, 10) === parseInt(value, 10)) {
                this.stateId = state.state_id;
                this.state_name = state.state_name;
                break;
            }
        }
        return this.setState({state_name: this.state_name, region_id: this.stateId});
    };

    showListCountry() {
        if (!this.countries.state.openDialog) {
            this.countries.showDiaglog(true);
        }
    }

    showListState() {
        if (!this.states.state.openDialog) {
            this.states.showDiaglog(true);
        }
    }

    render = () => {
        return (
            <div className="list-country-and-state">
                {this.renderListCountry()}
                
            </div>
        );
    }
}


CountryState.propTypes = {
    isStateRequired: PropTypes.string,
    allCountries: PropTypes.array,
    defaultCountryCode: PropTypes.string,
    defaultRegionId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    defaultRegionName: PropTypes.string,
    isShowListRegion: PropTypes.bool,
    useEmptySelection: PropTypes.bool,
};
CountryState.defaultProps = {
    useEmptySelection: false,
};


export default CountryState;