/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/1/19
 * Time: 3:22 PM
 */
import React from 'react'
import ReactHTMLParse from "react-html-parser";
import SimiDialog from '../../../../BaseComponent/Dialog'
import Identify from "../../../../Helper/Identify";
import ArrowRight from '../../../../BaseComponent/Icon/ArrowLeft'
import Abstract from '../../../Core/BaseAbstract'
class Description extends Abstract{
    constructor(props) {
        super(props);
        this.state.popup = false
    }


    shouldComponentUpdate(nextProps,nextState){
        return this.state.popup !== nextState.popup;
    }

    renderDialog = (content) => {
        return <SimiDialog title={Identify.__('Description')}
                           open={this.state.popup}
                           onRequestClose={()=>this.setState({popup:false})}
                           dialogContent={
                               <div className="description-dialog">{ReactHTMLParse(content)}</div>
                           }
                           styleContent={{padding:10}}
                           fullScreen={true}/>
    }

    componentDidUpdate(){
        const $ = window.$
        $('#description-component img').addClass('img-responsive')
        $('.description-dialog img').addClass('img-responsive')
    }

    renderContent = () => {
        const {description,short_description} = this.props;
        if(short_description && this.state.isPhone){
            return (
                <div>
                    <div className="flex"
                         style={{justifyContent: 'space-between'}}
                         onClick={()=>this.setState({popup:true})}>
                        <div className="short-desc-content">
                            {ReactHTMLParse(short_description)}
                        </div>
                        {
                            (description.toString().length > short_description.length)&&
                            <div className="desc-icon">
                                <ArrowRight className={Identify.isRtl() ? 'rotate-180' : ''}/>
                            </div>
                        }
                    </div>
                    {this.renderDialog(description)}
                </div>
            )
        }else {
            return <React.Fragment>
                {ReactHTMLParse(description)}
            </React.Fragment>;
        }
    }

    render() {
        return (
            <div id="description-component">
                {this.renderContent()}
            </div>
        );
    }
}
export default Description