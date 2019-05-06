import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import SideBar from '../../../../BaseComponent/SideBar'
import ListItem from './ListItem'
import FilterIcon from '../../../../BaseComponent/Icon/Filter'
import SortIcon from '../../../../BaseComponent/Icon/Sort'
import ListIcon from '../../../../BaseComponent/Icon/List'
import GridIcon from '../../../../BaseComponent/Icon/Grid'
import {Filter} from "../../../Tapita/Products/HoC"
import Sortby from "./Sortby"
import Identify from "../../../../Helper/Identify"
import './list.scss'

const menuStyle = {
    background : 'white',
    padding: '10px',
    overflow: 'scroll'
};

class ListBasic extends Abstract {
    constructor(props){
        super(props);
        /* this.limit = 12;
        this.currentPage = 1; */
    }

    renderFilter() {
        const data = this.parent.state.data;
        if (this.filterTree || (data && data.layers &&
            data.layers.layer_filter)) {
            return (
                <div>
                    <div className="left-navigation-title">{Identify.__('Shop by')}</div>
                    <Filter ref={(filterTree) => this.filterTree = filterTree}
                            data={data.layers}
                            obj={this}
                            productIndex={this.parent}
                            parent_props={this.props}/>
                </div>
            );
        }
    }

    renderLeftNavigation() {
        let shopby = [];
        const filter = this.renderFilter();
        if (filter) {
            shopby.push(
                <div key="tapita-left-navigation-filter" className="left-navigation">
                    {filter}
                </div>
            );
        }
        
        if (shopby.length !==0)
            return (
                <SideBar
                    SideBarClass="left-menu-filter-tablet"
                    contentStyle={menuStyle}
                    renderView={shopby}
                    showConfig='left'
                    width={this.state.isPhone?300:400}
                    classToggleSideBar='.app-bar-menu-filter'
                />);
        return ''
    }

    renderSortby() {
        const {data} = this.props || {};
        return (
            <SideBar
                SideBarClass="left-menu-sort-tablet"
                contentStyle={menuStyle}
                renderView={
                    <div>
                        <div className="left-navigation-title">{Identify.__('Sort by')}</div>
                        <Sortby
                            ProductsParent={this.parent}
                            parent={this}
                            data={data}
                            total={data.total}
                            limit={this.limit}
                            currentPage={this.currentPage}
                        />
                    </div>
                }
                showConfig='left'
                width={this.state.isPhone ? 300 : 400}
                classToggleSideBar='.app-bar-menu-sort'
            />
        );
    }

    renderList() {
        if (!this.parent.state.loaded || !this.props.data) {
            return (<Loading/>);
        }
        this.leftNavigation = this.renderLeftNavigation();
        const iconFilter = this.leftNavigation?(
            <span className="bottom-icon app-bar-menu-filter" style={{float: 'left', borderRight: '1px solid #000000'}}>
                <FilterIcon style={{width: 22}}/>
            </span>
        ):''

        const iconSort = (
            <span className="bottom-icon app-bar-menu-sort" style={{float: 'left', borderRight: '1px solid #000000'}}>
                <SortIcon style={{width: 22}}/>
            </span>
        )
        
        const displayMode = this.parent.state.itemsDisplayMode
        const iconDisplayType = (
            <span className="bottom-icon" 
                  style={{float: 'right', borderLeft: '1px solid #000000'}}
                  onClick={(e) => {
                        this.parent.setState({itemsDisplayMode: (displayMode)?0:1});
                        sessionStorage.setItem('itemsDisplayMode', (displayMode)?0:1)
                        /* Analytics.analyticsTracking(
                            {
                                mixpanel : true,
                                ga : false
                            }, 
                            {
                                action: 'changed_product_list_style',
                                product_list_style: (displayMode)?0:1,
                            }
                        ) */
                  }}>
                {(displayMode) ?
                    <GridIcon style={{width: 22}}/> :
                    <ListIcon style={{width: 22}}/>
                }
            </span>
        )

        let numb = parseInt(this.parent.state.data.products.length, 10);
        const numberProduct = (
            <span className="top-number-products">
                {Identify.__('%c of %t').replace('%c', numb).replace('%t', this.parent.state.data.total)}
            </span>
        )
        
        return (
            <div>
                {this.leftNavigation}
                {this.renderSortby()}
                <div className="basic-product-items">
                    <ListItem data={this.props.data} parent={this} ProductsParent={this.parent} show={this.parent.state.itemsDisplayMode} />
                </div>
                {/* <Items
                    show={this.parent.state.itemsDisplayMode}
                    parent={this}
                    productIndex={this.parent}
                    data={this.parent.state.data}
                /> */}
                <div id="filter-bottom">
                    {iconFilter}
                    {iconSort}
                    {numberProduct}
                    {iconDisplayType}
                </div>
            </div>
        )
    }

    render(){
        const {data} = this.props || {}
        return (
            <div className="basic-product-list">
                {this.renderList()}
            </div>
        )
    }
}

export default ListBasic;