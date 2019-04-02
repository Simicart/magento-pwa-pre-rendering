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
import TechSpec from './TechSpec'
const configColor = Identify.getColorConfig()
class ProductTabs extends Abstract{

    tabDataConfig(){
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

    render(){
        this.product = this.props.data.product;
        if(this.state.isPhone){
            return this.renderViewPhone()
        }
        return null
    }
}
export default ProductTabs