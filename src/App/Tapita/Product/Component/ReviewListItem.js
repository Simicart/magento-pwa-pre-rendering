import React, { Component } from 'react';
import Base from '../../../Core/BaseAbstract';
import ReviewModel from '../../../Core/Review/ReviewModel';
import Loading from '../../../../BaseComponent/Loading';
import Identify from '../../../../Helper/Identify';
import Pagination from '../../../../BaseComponent/Pagination';
import ReviewItem from './ReviewItem';

class ReviewListItem extends Base {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loaded: false
        };
        this.reviewModel = new ReviewModel({ obj: this });
    }
    
    componentWillMount() {
        const { productId } = this.props;
        const apiData = Identify.ApiDataStorage('product_list_review');
        if(apiData && apiData instanceof Object && apiData.hasOwnProperty(productId)){
            this.setState({data:apiData[productId], loaded:true})
        }
    }
    
    componentDidMount() {
        if(!this.state.data) {
            this.reviewModel.getReviewProduct(this.props.productId);
        }
    }

    processData(data) {
        const apiData = {
            [this.props.productId]: data,
        };
        Identify.ApiDataStorage('product_list_review', 'update', apiData);
        this.setState({
            loaded: true,
            data
        })
    }

    renderItem(item) {
        return <ReviewItem key={Identify.makeid()} rates={this.props.rates} data={item}/>
    }

    renderListItem() {
        const { data, loaded } = this.state;
        if(data && loaded) {
            return (
                <div className="list-review-item">
                    <div className="list-review-title">{Identify.__('Customer Reviews')}</div>
                    <Pagination data={data.reviews} renderItem={this.renderItem.bind(this)} />
                </div>
            )
        }

        return (
            <div className="text-center">
                {Identify.__('Review is empty')}
            </div>
        )
    }
    
    render() {
        if(!this.state.loaded) {
            return <Loading />
        }
        
        return this.renderListItem();
    }
}

export default ReviewListItem;