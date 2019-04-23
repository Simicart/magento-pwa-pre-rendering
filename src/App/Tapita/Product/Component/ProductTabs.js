/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/1/19
 * Time: 3:18 PM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Description from './Description'
import Identify from "../../../../Helper/Identify";
import ArrowUp from '../../../../BaseComponent/Icon/ArrowUp';
import ArrowDown from '../../../../BaseComponent/Icon/ArrowDown';
import TechSpec from './TechSpec';
import ReviewTabPhone from './ReviewTabPhone';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ReviewTabContent from './ReviewTabContent';
import Model from '../../../../Model';
import CustomerHelper from '../../../../Helper/Customer';

const configColor = Identify.getColorConfig()
const tabLabel = {
    fontSize: 22,
    fontWeight: 800,
}
class ProductTabs extends Abstract{
    constructor(props) {
        super(props);
        this.model = new Model({ obj: this })
        this.state = {
            tabIndex: 0,
            isPhone: this.state.isPhone,
            checkLogin: false,
        }
    }

    componentDidMount() {
        if(
            this.product.app_reviews.hasOwnProperty('form_add_reviews') 
            && typeof this.product.app_reviews.form_add_reviews[0] === 'string'
            && (CustomerHelper.isLogin() || CustomerHelper.isAllowGuestAddReview())
        ) {
            this.model.getProductApi(`products/${this.product.entity_id}`);
        }
    }

    processData(data) {
        this.setState({
            checkLogin: true,
            data: data.product,
        })
    }
    
    handleChange = (event, value) => {
        this.setState({tabIndex: value});
    }

    handleChangeIndex = (index) => {
        this.setState({tabIndex: index});
    }

    tabDataConfig(){
        if(this.state.data && this.state.checkLogin === true){
            this.product = this.state.data;
        }
        let data = [
            {
                sort_order : 1000,
                enable : this.product.description && this.description !== "",
                id : 'description',
                label : 'Details',
                content : <div key={Identify.makeid()} className="description-tab-content tab-content">
                    <Description description={this.product.description} short_description={this.product.short_description}/>
                </div>
            },
            {
                sort_order : 2000,
                enable : this.product.additional && this.product.additional.length !== 0,
                id : 'tech_spec',
                label : 'More Information',
                content : <div key={Identify.makeid()} className="techspec-content tab-content">
                    <TechSpec product={this.product}/>
                </div>
            },
            {
                sort_order : 4000,
                enable : true,
                id : 'review',
                label : `Reviews ${this.product.app_reviews.number > 0 ? `(${this.product.app_reviews.number})` : ''}`,
                content : <div key={Identify.makeid()} className="product-reviews tab-content" style={!this.state.isPhone ? { display: 'block'}: {}}>
                    {
                        this.state.isPhone 
                        ? <ReviewTabPhone product={this.product.app_reviews} productId={this.product.entity_id} name={this.product.name}/> 
                        : <ReviewTabContent data={this.product.app_reviews} productId={this.product.entity_id} name={this.product.name}/>
                    }
                </div>
            },
        ]
        return data;
    }

    getTabData = ()=>{
        let data = this.tabDataConfig();
        data = data.sort((a,b)=>a.sort_order - b.sort_order)
        return data;
    };

    renderViewPhone =()=>{
        let data = this.getTabData();
        let items = [];
        for (let i in data){
            let item = data[i];
            let label = Identify.__(item.label);
            if(item.enable){
                items.push(
                    <div className="panel-item" key={Identify.makeid()}>
                        <div className="panel-label" id={item.id} onClick={()=>this.handleShowContent(item.id)}>
                            <div id={item.id + '-label'}>{Identify.__(label)}</div>
                            <div className="panel-icon">
                                <div className="icon"><ArrowDown /></div>
                                <div className="icon hidden">
                                    <ArrowUp color={configColor.button_background}/>
                                </div>
                            </div>
                        </div>
                        <div  className="panel-content">
                            {item.content}
                        </div>
                    </div>
                )
            }

        }
        return (
            <div className="product-info" style={{paddingBottom : 20}} id="accordion">
                {items}
            </div>
        )
    }

    renderTabContent() {
        const data = this.tabDataConfig();
        const items = [];
        for(let i in data) {
            const item = data[i];
            i = parseInt(i, 10);
            if(item.enable) {
                items.push(
                    <TabContainer key={i}>
                        {item.content}
                    </TabContainer>
                )
            }
        }

        return (
            <div className="swipeable-views">
                <SwipeableViews
                    axis={Identify.isRtl() ? 'x-reverse' : 'x'}
                    index={this.state.tabIndex}
                    onChangeIndex={this.handleChangeIndex}
                    animateHeight={true}
                >
                    {items}
                </SwipeableViews>
            </div>
        )
    }

    renderTabLabel(text) {
        return <div style={tabLabel}>{Identify.__(text)}</div>
    }

    renderTabs() {
        const data = this.tabDataConfig();
        const items = []
        for(let i in data) {
            const item = data[i];
            i = parseInt(i, 10);
            if(item.enable) {
                items.push(
                    <Tab 
                        key={Identify.makeid()}
                        id="detail-tab"
                        value={i}
                        className={`tab-${i}`}
                        label={this.renderTabLabel(item.label)}
                        textColor="primary"
                    />
                )
            }
        }
        return (
            <Tabs 
                className="product-description-tabs"
                value={this.state.tabIndex}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {items}
            </Tabs>
            
        )
    }

    handleShowContent = (id)=>{
        const $ = window.$
        $('.panel-label').each(function () {
            if($(this).attr('id') !== id){
                let content = $(this).next();
                let display = content.css('display');
                if(display !== 'none' ){
                    content.slideToggle();
                    $(this).css('color','#333')
                    $(this).removeClass('active')
                    $(this).find('div.icon').toggleClass('hidden');
                }
            }
        })
        let el = $('#'+id+'')
        el.toggleClass('active');
        if(el.hasClass('active')){
            el.css('color',configColor.button_background)
        }else{
            el.css('color','#333')
        }
        el.find('div.icon').toggleClass('hidden');
        el.next().slideToggle();
        $('html, body').animate({
            scrollTop: el.offset().top-60
        },1000)
    }

    render() {
        this.product = this.props.data.product;
        if(this.state.isPhone){
            return this.renderViewPhone()
        }
        return (
            <div className="product-info" style={{paddingBottom : 20}}>
                {this.renderTabs()}
                {this.renderTabContent()}
            </div>
        )
    }
}

const TabContainer = ({ children, dir }) => (
    <Typography component="div" dir={dir}>
        {children}
    </Typography>
);

export default ProductTabs