import React, { Component } from 'react';
import Base from '../../../Core/BaseAbstract';
import CustomerHelper from '../../../../Helper/Customer'
import ReviewModel from '../../../Core/Review/ReviewModel';
import Identify from '../../../../Helper/Identify';
import Rate from '../../../../BaseComponent/Rate';
import Button from '../../../../BaseComponent/Button';

class ReviewForm extends Base { 
    constructor(props) {
        super(props);
        this.reviewModel = new ReviewModel({ obj: this });
    }

    processData(data) {
        const $ = window.$;
        Identify.showToastMessage(data.message);
        $('input#nickname').val('');
        $('input#title').val('');
        $('#detail').val('');
        this.ReviewBtn.hideLoading();
    }
    

    handleSubmitReview = () => {
        const $ = window.$;
        const nickname = this.refs.nickname.value;
        const title = this.refs.title.value;
        const detail = this.refs.detail.value;
        if(nickname.trim() === '' || title.trim() === '' || detail.trim() === '') {
            Identify.showToastMessage(Identify.__('Please fill in all required fields'));
        } else {
            const params = {
                product_id: this.props.productId,
                ratings: {},
                nickname,
                title,
                detail
            }
            const star = $('.select-star');
            for (let i = 0; i < star.length; i++) {
                let rate_key = $(star[i]).attr('data-key');
                let point = $(star[i]).attr('data-point');
                params.ratings[rate_key] = point;
            }
            if (sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
                let email = sessionStorage.getItem('email').replace(/['"]+/g, '');
                let password = sessionStorage.getItem('password').replace(/['"]+/g, '');
                params.email = email;
                params.password = password;
            }
            this.ReviewBtn.showLoading();
            this.reviewModel.submitReview(params);
        }
    }

    render() {
        if(!CustomerHelper.isLogin()) {
            if(!CustomerHelper.isAllowGuestAddReview()) {
                return (
                    <div className="text-center" style={{
                        fontSize : 18
                    }}>
                        {Identify.__('Only registered users can write reviews')}
                    </div>  
                );
            }
        }

        const formData = this.props.data;
        const data = formData[0];
        if(typeof data !== 'object' && !Array.isArray(data)) {
            return (
                <div className="text-center" style={{ fontSize : 18 }}>
                    {data}
                </div>
            )
        }
        const rates = data.rates;
        return (
            <div className="review-form" style={{padding: '8px'}}>
                <div className="form-title hidden-xs flex">{Identify.__("You're reviewing:" )}<span className="review-item-name">{Identify.__(this.props.name)}</span></div>
                <p style={{padding : '8px',fontSize : '17px',fontWeight : 500,margin : 0}}>{Identify.__('Your rating')}<span className="rq">*</span></p>
                <table className="table table-hover">
                    <tbody>
                    {rates.map(item => {
                        return (
                            <tr key={Identify.makeid()}>
                                <td className="label-item" width="50px">{Identify.__(item.rate_code)}</td>
                                    <td id={item.rate_code}><Rate rate={1} size={20} rate_option={item.rate_options} rate_code={item.rate_code} change={true}/></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className="form-content">
                    <div className="form-group">
                        <p className="label-item">{Identify.__('Nickname')}<span className="rq">*</span></p>
                        <input type="text" id="nickname" className="form-control" name="nickname" ref="nickname" style={{background : '#f2f2f2'}} required/>
                    </div>
                    <div className="form-group">
                        <p className="label-item">{Identify.__('Title')}<span className="rq">*</span></p>
                        <input type="text" id="title" className="form-control" name="title" ref="title" style={{background : '#f2f2f2'}} required/>
                    </div>
                    <div className="form-group">
                        <p className="label-item">{Identify.__('Detail')}<span className="rq">*</span></p>
                        <textarea id="detail" name="detail" ref="detail" className="form-control" rows="10" style={{background : '#f2f2f2'}}></textarea>
                    </div>
                    <div className="btn-submit-review">
                        <Button text={Identify.__('Submit Review')}
                                style={{
                                    width: this.state.isPhone ? '100%' : '200px',
                                    height : '45px',
                                }}
                                ref={(btn)=> this.ReviewBtn = btn}
                                onClick={()=>this.handleSubmitReview()}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default ReviewForm;