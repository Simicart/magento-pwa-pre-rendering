import React from 'react';
import Model from '../../../Model';

class ReviewModel extends Model {
    getReviewProduct = (productId) => {
        return this.connect(`reviews?filter[product_id]=${productId}`, {});
    }

    submitReview = (params) => {
        return this.advancedConnect('POST', 'reviews', {}, params);
    }
}

export default ReviewModel;