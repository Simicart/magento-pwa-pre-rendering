import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import List from '@material-ui/core/List';
import ListItem from '../../../../BaseComponent/MuiListItem/Text';
import NestedListItem from '../../../../BaseComponent/MuiListItem/Nested';
import CloseIcon from '../../../../BaseComponent/Icon/Close';

import './filter.css';
import {Loading} from "../../../../BaseComponent/Loading";

const $ = window.$;
const configColor = Identify.getColorConfig()
const listItemStyle = {
    lineHeight: '20px',
    color : configColor.content_color,
    fontSize : '18px',
    fontFamily: 'Montserrat , sans-serif'
};

class Filter extends Abstract {

    constructor(props) {
        super(props);
        this.items = this.props.data?this.props.data:null;
        this.ProductsParent = this.props.ProductsParent;
        this.state = {...this.state, ...{loaded: true}}
    }

    renderActivedFilter() {
        let rowsActived = [];
        if (this.props.data)
            this.items = this.props.data;

        if (this.items.layer_state) {
            const activedItems = this.items.layer_state;
            rowsActived = activedItems.map((activedItem) => {
                const label = <div className="item-content">
                    <div style={{width: '83.33%'}}>{activedItem.title}: {activedItem.label}</div>
                    <div style={{width: '16.66%'}} className="clear-icon"><CloseIcon style={{width: 14, height: 14}}/></div>
                </div>
                return (
                    <div className="filter-active-item" key={Identify.makeid()}>
                        <div className="active-filter-list-item" onClick={() => this.deleteFilter(activedItem.attribute)} style={{padding: 0}}>
                            {label}
                        </div>
                    </div>
                );
            });

            return (
                <List>{rowsActived}</List>
            );
        }
    }
    
    renderFilterItems() {
        if (this.props.data)
            this.items = this.props.data;

        let rowFilterAttributes = [];
        if (this.items.layer_filter && this.items.layer_filter.length !== 0) {
            const filterAttributes = this.items.layer_filter;
            rowFilterAttributes = filterAttributes.map((item) => {
                const name = <span className="filter-name-item root-menu">{Identify.__(item.title)}</span>;
                return (
                    <div key={Identify.makeid()}  style={{color: configColor.content_color}} onClick={(e)=>this.handleShowSubMenu(e)}>
                        <NestedListItem
                            primarytext={name}
                            style={listItemStyle}
                            color={configColor.content_color}
                        >
                            {this.renderFilterItemsOptions(item)}
                        </NestedListItem>
                    </div>
                );
            }, this);
            return (
                <List>{rowFilterAttributes}</List>
            );
        }
    }

    renderFilterItemsOptions(item)
    {
        let options= [];
        if(item){
            if(item.filter !== null){
                options = item.filter.map(function (optionItem) {
                    const name = <span className="filter-name-item">
                        {$("<div/>").html(Identify.__(optionItem.label)).text()}
                        </span>;
                    return (
                        <ListItem
                            key={Identify.makeid()}
                            primarytext={name}
                            style={listItemStyle}
                            color={configColor.content_color}
                            className="filter-item"
                            onClick={(e)=>{
                                this.applyFilter(item.attribute, optionItem.value);
                            }}
                        />
                    );
                }, this, item);
            }
        }
        return options
    };

    handleShowSubMenu =(e,sub =false)=>{
        let menu = e.target;
        if(sub){
            menu = $(menu).parents('.sub-menu-item');
        }else{
            menu = $(menu).parents('.list-menu-item');
        }
        $(menu).find('.item-icon').toggleClass('hidden');
        $(menu).next().slideToggle();
    }
    
    applyFilter(attribute, value) {
        let params = this.ProductsParent.ProductModel.getParams();
        params[`filter[layer][${attribute}]`] = value;
        params['offset'] = 0
        this.ProductsParent.ProductModel.setParams(params);
        Identify.showLoading()
        this.reloadData();
    }

    deleteFilter(attribute) {
        Identify.showLoading()
        let Jquery = this.ProductsParent.ProductModel.getParams();
        delete Jquery[`filter[layer][${attribute}]`];
        Jquery['offset'] = 0
        this.ProductsParent.ProductModel.setParams(Jquery);
        this.reloadData();
    }

    clearFilter() {
        Identify.showLoading()
        let Jquery = this.ProductsParent.ProductModel.getParams();

        const activeFilter = this.items.layer_state;
        if (!activeFilter || !Array.isArray(activeFilter))
            return;
        activeFilter.map((item) => {
            if (item.attribute && Jquery[`filter[layer][${item.attribute}]`]) {
                delete Jquery[`filter[layer][${item.attribute}]`];
            }
            return false
        }, Jquery);
        Jquery['offset'] = 0
        this.ProductsParent.ProductModel.setParams(Jquery);
        this.reloadData();
    }
    
    reloadData() {
        this.ProductsParent.getProducts()
    }

    componentDidMount(){
        let obj = this;
        $('.top-filter-button').click(function () {
            if(!obj.state.loaded){
                setTimeout(()=>{
                    obj.setState({loaded:true})
                },1000)
            }
        })
    }
    
    render() {
        if(!this.state.loaded){
            return <Loading/>
        }
        let activeFilter = '';
        const display = this.items.layer_state ? "block" : "none";
        if (this.items.layer_state) {
            const buttonClear = this.items.layer_state
                ? (<div className="action-clear">
                        <button onClick={() => this.clearFilter()}
                                className="clear-filter">{Identify.__('Clear all')}</button>
                    </div>
                ) : <div/>
            activeFilter = <div className="active-filter">
                <p className="title" style={{display: display}}>{Identify.__('Activated')}</p>
                {this.renderActivedFilter()}
                {buttonClear}
            </div>;
        }
        return (
            <div className="filter-products">
                {activeFilter}
                {this.renderFilterItems()} 
            </div>
        );
    }
}

export default Filter;