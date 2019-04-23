import React from 'react';
import View from '../../../../BaseComponent/ViewComponent';
import Identify from '../../../../Helper/Identify';
import Rate from '../../../../BaseComponent/Rate'

class ReviewItem extends View {
    constructor(props) {
        super(props);
        this.state = {
            isPhone: window.innerWidth < 768
        }

    }
    
    render() {
        const item = this.props.data;
        if(item.hasOwnProperty('votes')) {
            const ratingVotes = item.votes.map(rate => {
                const point = rate.value;
                return (
                    <div className="rating-votes" key={Identify.makeid()}>
                       <div className="label-rate">{Identify.__(rate.label)}</div>
                       <div className="item-rating"><Rate rate={parseInt(point,10)} size={this.state.isPhone ? 13 : 17}/></div>
                   </div>
                )
            });
            const created = (
                <div className="item-created flex" style={{marginLeft : 'auto'}}>
                    <span>{item.created_at}</span>
                    <span style={{margin : '0 5px'}}>By</span>
                    <span>{item.nickname}</span>
                    {this.state.isPhone ? <span className="review-detail-icon"
                        style={{
                            color : this.colorConfig.button_background,
                            marginLeft : Identify.isRtl() ? 0 : 'auto',
                            marginRight : Identify.isRtl() ? 'auto' : 0
                        }}> >> </span> : null}
                </div>
            )

            return (
                <div className="review-item item" >
                    <div className="item-title flex">{item.title}</div>
                    <div className="review-item-detail" style={{
                        display : 'flex',
                        marginBottom : this.state.isPhone ? 0 : 10
                    }}>
                        <div className="item-votes ">
                            {ratingVotes}
                        </div>
                        <div className="item-review-content " >
                            <div className="item-detail">{item.detail}</div>
                            {this.state.isPhone ? null : created}
                        </div>
                    </div>
                    {this.state.isPhone ? created : null}
                    <div className="clearfix"></div>
                </div>
            )
        }
        
        return (
            <div className="review-item item" >
                <div className="item-title flex">{item.title}</div>
                <div style={{
                    display : 'flex',
                    marginBottom : '10px'
                }}>
                    <div className="item-rate"><Rate rate={item.rate_points} /></div>
                    <div className="item-created flex" style={{marginLeft : Identify.isRtl() ? 0 : 'auto',marginRight : Identify.isRtl() ? 'auto' : 0}}>
                        <span>{item.created_at}</span>
                        <span style={{margin : '0 5px'}}>By</span>
                        <span>{item.nickname}</span>
                    </div>
                </div>
                <div className="item-detail">{item.detail}</div>
            </div>
        );
    }
}

export default ReviewItem;