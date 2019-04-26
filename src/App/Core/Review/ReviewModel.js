import React from 'react';
import Model from '../../../Model';

class ReviewModel extends Model {
    getReviewProduct = (productId) => {
        const params = {
            'filter[product_id]': productId
        }
        return this.connect('reviews', params);
    }

    submitReview = (params) => {
        return this.advancedConnect('POST', 'reviews', {}, params);
    }
}

export default ReviewModel;