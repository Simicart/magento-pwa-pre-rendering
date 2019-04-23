import React from 'react';
import Base from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import Dialog from '../../../../BaseComponent/Dialog';
import Button from '../../../../BaseComponent/Button';
import ReviewModel from '../../../Core/Review/ReviewModel';
import Model from '../../../../Model';
import Loading from '../../../../BaseComponent/Loading';
import ReviewItem from './ReviewItem';
import ReviewPopup from './ReviewPopup';
import ReviewForm from './ReviewForm';
import CustomerHelper from '../../../../Helper/Customer';

const ReviewPhoneContext = React.createContext();
class ReviewTabPhone extends Base {
    constructor(props) {
        super(props);
        this.data = this.props.product;
        this.reviewModel = new ReviewModel({ obj:this });
        this.model = new Model({ obj: this });
        this.state = {
            data: null,
            loaded : false,
            contentSidebar : 'list-review',
            openDialog : false
        };
    }

    
    componentWillMount() {
        const productId = this.props.productId;
        const apiData = Identify.ApiDataStorage('product_list_review');
        if(apiData && apiData instanceof Object && apiData.hasOwnProperty(productId)) {
            this.setState({data: apiData[productId], loaded: true})
        }
    }

    componentDidMount() {
        if(!this.state.data) {
            this.reviewModel.getReviewProduct(this.props.productId);
            this.loadReview = true;
        }
    }

    processData(data) {
        const apiData = {
            [this.props.productId]: data
         };
        Identify.ApiDataStorage('product_list_review','update',apiData);
        this.setState({data});
        this.loadReview = false;
    }

    openSidebarReview = (content) => {
        this.setState({
            openDialog: true,
            contentSidebar: content
        });
    }

    handleReviewDetail = (data) => {
        this.openSidebarReview('review-detail');
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'review_detail', data)
    }

    onRequestClose = () => {
        this.setState({openDialog: false});
    }

    handleChangeContent =(content)=>{
        this.setState({contentSidebar: content})
    }

    renderDetail() {
        const data = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'review_detail');
        if(data) {
            return (
                <div className="sidebar-review-detail">
                    <ReviewItem key={Identify.makeid()}  data={data}/>
                </div>
            )
        }
    }
    
    renderReviewForm() {
        return (
            <div>
                {this.data.form_add_reviews && <ReviewForm data={this.data.form_add_reviews} name={this.props.name} productId={this.props.productId}/>}
            </div>
        )
    }

    renderActionDialog(content = this.state.contentSidebar) {
        const styleBtn = {
            margin: 'auto',
            width: '100%',
            borderRadius: 0,
        }
        
        const textStyle = {
            padding: '10px 0',
            textTransform: 'uppercase'
        }

        if(content === 'list-review'){
            return (
                <div className="popup-btn-action">
                    <Button
                        text={Identify.__('Add Your Review')}
                        style={{...styleBtn,...{backgroundColor : this.configColor.button_background}}}
                        textStyle={{...textStyle,...{color : this.configColor.button_text_color}}}
                        onClick={()=>this.handleChangeContent('add-review')}
                    />
                </div>
            )
        } else if (content === 'review-detail') {
            return (
                <div className="popup-btn-action">
                    <div style={{display : 'flex',alignItems :'center'}}>
                        <Button
                            className="btn-action-view-all"
                            text={Identify.__('View all')}
                            style={{...styleBtn,...{backgroundColor : this.configColor.button_text_color,width : '50%'}}}
                            textStyle={{...textStyle,...{color : this.configColor.button_background}}}
                            onClick={()=>this.handleChangeContent('list-review')}
                        />
                        <Button
                            className="btn-action-add-review"
                            text={Identify.__('Add Your Review')}
                            style={{...styleBtn,...{backgroundColor : this.configColor.button_background,width : '50%'}}}
                            textStyle={{...textStyle,...{color : this.configColor.button_text_color}}}
                            onClick={()=>this.handleChangeContent('add-review')}
                        />
                    </div>
                </div>
            )
        } else if(content === 'add-review') {
            return (
                <div className="popup-btn-action">
                    <div></div>
                </div>
            )
        }
    }

    renderItem(showAll = false) {
        const  { data } = this.state;
        if(data && data instanceof Object && data.hasOwnProperty('reviews') && data.reviews.length > 0) {
            let reviews = data.reviews;
            if(!showAll) {
                reviews = data.reviews.slice(0,2);
            }
            const items = reviews.map(item => {
                return (
                    <div key={Identify.makeid()} onClick={() => this.handleReviewDetail(item)}>
                         <ReviewItem data={item} />
                    </div>
                )
            });

            return (
                <div className="list-review-item">
                    {items}
                </div>
            )
        }

        return (
            <div className="text-center review-empty" style={{fontSize : 16}}>
                {Identify.__('Be the first to review this product')}
            </div>
        )
    }

    renderAction() {
        let buttonViewAll = (
            <div 
                className="review-btn text-center"
                onClick={() => this.openSidebarReview('list-review')}
            >
                {Identify.__('View All')}
            </div>
        );

        const buttonAddReview = (
            <div 
                className="review-btn text-center" 
                onClick={()=>this.openSidebarReview('add-review')}
                style={{color : this.configColor.button_background}}
            >
                {Identify.__('Add Your Review')} 
            </div>
        );

        buttonViewAll = this.data instanceof Object && this.data.number > 0 ? buttonViewAll : null;
        return (
            <div className="review-action">
                {buttonViewAll}
                {buttonAddReview}
            </div>
        )
    }

    renderPopup() {
        return (
            <Dialog 
                ref={(SidebarApp) => this.SidebarApp = SidebarApp}
                open={this.state.openDialog}
                onRequestClose={this.onRequestClose}
                dialogContent={
                    <ReviewPhoneContext.Consumer>
                        {data => (
                            <ReviewPopup 
                                parent={this} 
                                content={data.contentSidebar}
                                ref={(popup) => this.Popup = popup}
                            />
                        )}
                    </ReviewPhoneContext.Consumer>
                }
                title={Identify.__('Product Reviews')}
                fullScreen={true}
                styleContent={{
                    padding: '0 10px 10px'
                }}
                transition='left'
                dialogActions={this.renderActionDialog()}
            />
        )
    }
    
    render() {
        if(!this.state.loaded) {
            <Loading />
        }
        return (
            <ReviewPhoneContext.Provider value={this.state}>
                <div className="product-review-phone">
                    {this.renderItem()}
                    {this.renderAction()}
                    {this.renderPopup()}
                </div>
            </ReviewPhoneContext.Provider>
        );
    }
}

export default ReviewTabPhone;