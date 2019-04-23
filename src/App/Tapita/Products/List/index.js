/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/23/19
 * Time: 8:15 PM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import ListItem from './ListItem'
import SideBar from '../../../../BaseComponent/SideBar'
import './list.css'
import Identify from "../../../../Helper/Identify";
import {Filter} from "../HoC";

class ListProduct extends Abstract{

    renderFilter() {
        const {data} = this.props || {}
        if ((data && data.layers &&
            data.layers.layer_filter)) {
            return (
                <div>
                    <div className="left-navigation-title">{Identify.__('Shop by')}</div>
                    <Filter data={data.layers}
                            obj={this}
                            ProductsParent={this.parent}
                            parent_props={this.props}/>
                </div>
            );
        }
    }

    renderLeftNavigation() {
        let shopby = [];
        const filter = this.renderFilter();
        if (window.innerWidth < 768) {
            if (filter) {
                shopby.push(
                    <div key="tapita-left-navigation-filter" className="left-navigation">
                        {filter}
                    </div>
                );
            }
            const menuStyle = {
                background : 'white',
                padding: '10px',
                overflow: 'scroll'
                //background : configColor.menu_background,
            };
            if (shopby.length !==0)
                return (
                    <SideBar
                        SideBarClass="left-menu-filter-tablet"
                        contentStyle={menuStyle}
                        renderView={shopby}
                        showConfig='left'
                        width={300}
                        classToggleSideBar='.app-bar-menu-filter'
                    />);
            return shopby
        }
        if (filter) {
            shopby.push(
                <div key="tapita-left-navigation-filter" className="left-navigation" style={{width: '33.333%'}}>
                    {filter}
                </div>
            );
        }
        return shopby;
    }

    handleShowFilterMenu = () => {
        const $ = window.$
        $('#left-menu-filter-tablet').fadeToggle();
        $('#left-menu-filter-tablet .content-sidebar').toggleClass('in');
    };

    renderCategoryImage() {
        const {currentCate} = this.props || {};
        if (currentCate && currentCate.image_url) {
            return (<div style={{padding: '20px 15px 0 15px'}}>
                <div>
                    <img style={{width: '100%'}} src={currentCate.image_url} alt={currentCate.name}/>
                </div>
            </div>);
        }
    }

    render() {
        const {data} = this.props || {}
        this.leftNavigation = this.renderLeftNavigation();
        return (
            <div className="product-list-container-tablet">
                {this.leftNavigation}
                <div style={(this.leftNavigation && this.leftNavigation.length)?{width: '66.666%'}:{width: '100%'}}>
                    {this.renderCategoryImage()}
                    <ListItem data={data} parent={this} ProductsParent={this.parent}/>
                </div>
            </div>
        );
    }
}
export default ListProduct