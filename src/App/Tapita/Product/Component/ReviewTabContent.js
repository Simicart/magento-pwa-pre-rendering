import React from 'react';
import Base from '../../../Core/BaseAbstract';
import ReviewListItem from './ReviewListItem';
import ReviewForm from './ReviewForm';
import Identify from '../../../../Helper/Identify';

class ReviewTabContent extends Base {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }
    
    render() {
        if(this.data.rate !== 0) {
            return (
                <div className="product-review-tab">
                    <ReviewListItem productId={this.props.productId} rates={this.data.form_add_reviews} reviewNumber={this.data.number}/>
                    {this.data.form_add_reviews && <ReviewForm data={this.data.form_add_reviews} name={this.props.name} productId={this.props.productId}/>}
                </div>
            )
        }
        return (
            <div className="product-review-tab">
                <div className="text-center review-empty" style={{fontSize : 18,marginBottom:20}}>{Identify.__('Be the first to review this product')}</div>
                {this.data.form_add_reviews && <ReviewForm data={this.data.form_add_reviews} name={this.props.name} productId={this.props.productId}/>}
            </div>
        );
    }
}

export default ReviewTabContent;