import React, { Component } from 'react';

class ReviewPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'list-review'
        }
        this.parent = this.props.parent;
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.content === prevState.content) {
            return null
        }
        return {content: nextProps.content}
    }

    renderView(content = this.state.content) {
        if(content === 'list-review'){
            return this.parent.renderItem(true)
        } else if(content === 'review-detail'){
            return this.parent.renderDetail()
        } else if(content === 'add-review'){
            return this.parent.renderReviewForm()
        }
        return <div></div>
    }
    
    render() {
        return (
            <div className="review-popup">
                {this.renderView()}
            </div>
        );
    }
}

export default ReviewPopup;