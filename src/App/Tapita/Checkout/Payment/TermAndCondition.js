import React from 'react';
import Base from "../../../Core/BaseAbstract";
import Checkbox from '@material-ui/core/Checkbox';
import Identify from "../../../../Helper/Identify";
import Button from '@material-ui/core/Button';
import SimiDialog from "../../../../BaseComponent/Dialog";

const configColor = Identify.getColorConfig()
class TermAndCondition extends Base {
    constructor(props) {
        super(props);
        let isSelectedTerm = !!Identify.getDataFromStoreage(Identify.SESSION_STOREAGE,'selected_term')
        this.state = {showModal: false,checked:isSelectedTerm}
        this.terms = this.props.data_terms;
    }
    
    closeModal = () => {
        this.setState({showModal: false});
    };

    agreeTermConditions = () => {
        this.onCheckBoxCheck(true)
    };


    renderModal = () => {
        let btn = <Button style={
                        {
                            color: configColor.button_text_color,
                            background: configColor.button_background,
                            width: window.innerWidth < 768 ? '100%' : 'auto',
                            fontSize: 14,
                            marginBottom:5
                        }}
                          onClick={() => this.agreeTermConditions()}>
                    <div>{Identify.__('Agree')}</div>
                </Button>
        return (
            <div>
                <SimiDialog title={this.terms.title} dialogContent={<div id="term-content"/>}
                            open={this.state.showModal}
                            onRequestClose={()=>this.closeModal()}
                            fullScreen={window.innerWidth<768}
                            dialogActions={btn}/>
                {this.renderJs()}
            </div>

        );
    };

    showTermsConditions = () => {
        this.setState({showModal: true});
    };

    onCheckBoxCheck = (isChecked) => {
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'selected_term',isChecked)
        this.setState({showModal: false,checked:isChecked});
    };

    renderJs = () => {
        let currentObject = this;
        const $ = window.$;
        $(document).ready(() => {
            $('#term-content').html(currentObject.terms.content);
        });
    };

    render = () => {
        let isSelectedTerm = this.state.checked;
        return (
            <div className="terms-condition" style={{marginTop: 20}}>
                <Checkbox style={{width: 'auto'}} checked={isSelectedTerm}
                          onClick={()=>this.onCheckBoxCheck(!isSelectedTerm)} color="primary"/>
                <div className="term-title"> {Identify.__('I have read and agreed to the ')}
                    <span id="terms-condition" style={{color:configColor.button_background}} onClick={() => this.showTermsConditions()}>
                    {Identify.__('terms & conditions')}
                    </span>
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

export default TermAndCondition