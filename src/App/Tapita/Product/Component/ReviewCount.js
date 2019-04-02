/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/2/19
 * Time: 9:21 AM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Identify from "../../../../Helper/Identify";
import Rate from '../../../../BaseComponent/Rate'
class ReviewCount extends Abstract{

    render() {
        this.data = this.data.product
        let reviewLink = {
            color: this.configColor.button_background.toLowerCase() !== '#ffffff' ? this.configColor.button_background : "#f69435",
        }
        if (this.data.hasOwnProperty('app_reviews') && this.data.app_reviews) {
            let reviewLabel = Identify.__('Reviews');
            if (this.data.app_reviews.number > 0) {
                reviewLabel = Identify.__('Reviews');
                return (
                    <div className="product-review-summary">
                        <div className="review-summary">
                            <Rate size={this.state.isPhone ? 16 : 24} rate={this.data.app_reviews.rate}/>
                            <span className="review-count">
                                ({this.data.app_reviews.number} {reviewLabel})
                            </span>
                        </div>
                        <div className="review-link" id="review-link" onClick={() => this.handleClickReview()}
                             style={reviewLink}>{Identify.__('Add your review')}</div>
                    </div>
                );
            } else {
                reviewLink = {...reviewLink, marginLeft: 0, marginRight: 0};
                return (
                    <div className="product-review-summary">
                        <div className="review-link flex" id="review-link" onClick={() => this.handleClickReview()}
                             style={reviewLink}>{Identify.__('Be the first to review this product')}</div>
                    </div>
                )
            }
        }
    }
}
export default ReviewCount