import React from  'react';
import ViewComponent from '../ViewComponent';
import ToggleStar from '@material-ui/icons/Star';
import Identify from '../../Helper/Identify';
import PropTypes from 'prop-types';

class Rate extends ViewComponent {
    constructor(props){
        super(props);
        this.rate = this.props.rate ;
        this.size = this.props.size ;
        this.rate_option = this.props.rate_option ;
        this.rate_code = this.props.rate_code ;
        this.flag = this.props.change ;

    }
    handleChangeRate = (item, id) => {
        const $ = window.$;
        if (item) {
            const ColorStar = this.colorConfig.button_background;
            let star = $('#' + item + '-' + id + '');
            $(star[0]).nextAll().children().css('fill', '#e0e0e0');
            $(star[0]).prevAll().children().css('fill', ColorStar);
            $(star[0]).children().css('fill', ColorStar);
            $(star[0]).prevAll().removeClass('select-star');
            $(star[0]).nextAll().removeClass('select-star');
            $(star[0]).addClass('select-star');
        }
    };

    renderRate = () => {
        this.rate = Math.round(this.rate, 10);
        let rate_point = this.flag ? 'rate-point' : '';
        let select = this.flag ? 'select-star' : '';
        let star = [];
        let point = 0;
        let rate_key = 0;
        let id = '';
        for (let i = 0; i < 5; i++) {
            if (this.flag) {
                id = this.rate_code + '-' + i
            }
            if (this.rate_option) {
                point = this.rate_option[i].value;
                rate_key = this.rate_option[i].key;
            }
            if (i + 1 <= this.rate) {
                star.push(
                    <span key={Identify.makeid()} id={id} className={rate_point + " rate-star  active " + select}
                          onClick={() => this.handleChangeRate(this.rate_code, i)} data-key={rate_key}
                          data-point={point}><ToggleStar style={{height: this.size + 'px', width: this.size + 'px',fill:Identify.getColorConfig().button_background}}/></span>
                );
            } else {
                star.push(
                    <span key={Identify.makeid()} id={id} className={rate_point + " rate-star  active"}
                          onClick={() => this.handleChangeRate(this.rate_code, i)} data-key={rate_key}
                          data-point={point}><ToggleStar style={{fill : '#e0e0e0',height: this.size + 'px', width: this.size + 'px'}}/></span>
                );
            }
        }

        return star;
    };
    render(){
        return <div className="rate-review">{this.renderRate()}</div>
    }
}
Rate.defaultProps = {
    rate : 0,
    size : 15,
    rate_option: null,
    rate_code : null,
    change : false
};
Rate.propTypes = {
    rate : PropTypes.number,
    size : PropTypes.number,
    rate_option: PropTypes.array,
    rate_code : PropTypes.string,
    change : PropTypes.bool
};
export default Rate;