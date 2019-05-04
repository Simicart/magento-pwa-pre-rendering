import React from 'react';
import Identify from '../../../../Helper/Identify';
import Abstract from '../../../Core/BaseAbstract';
import IconButton from '../../../../BaseComponent/IconButton';
import GridIcon from '../../../../BaseComponent/Icon/Grid';
import ListIcon from '../../../../BaseComponent/Icon/List';
import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowUp from '../../../../BaseComponent/Icon/LongArrowUp';
import ArrowDown from '../../../../BaseComponent/Icon/LongArrowDown';
import Check from '../../../../BaseComponent/Icon/SingleSelect';

const configColor = Identify.getColorConfig()
class Sortby extends Abstract {

    constructor(props) {
        super(props);
        this.ProductsParent = this.props.ProductsParent;
        this.parent = this.props.parent;
    }


    changedSortBy(event) {
        const item = JSON.parse(event.target.value);
        let Jquery = this.ProductsParent.ProductModel.getParams();
        Jquery['order'] = item.key;
        Jquery['dir'] = item.direction;
        this.ProductsParent.ProductModel.setParams(Jquery);
        Identify.showLoading()
        this.ProductsParent.getProducts()
    }

    switchShowType(showType) {
        this.parent.setState({itemsDisplayMode: showType});
        sessionStorage.setItem('itemsDisplayMode', showType);
    }

    renderSortBy(data){
        let selections = [];
        let selectedItem = null ;
        if(data.orders && data.orders instanceof Array && data.orders.length > 0) {
            selections = data.orders.map((item) => {
                const itemCheck = item.default === '1' ?
                    <span className="is-selected">
                            <Check color={configColor.button_background} style={{width: 16, height: 16}}/>
                        </span>
                    : "";
                const directionIcon = item.direction === 'asc' ?
                    <ArrowUp style={{width: 16, height: 16}}/> :
                    <ArrowDown style={{width: 16, height: 16}}/>;
                const isItemDisable = item.default === '1';
                if(isItemDisable) {
                    selectedItem = item;
                }
                return (
                    <MenuItem key={Identify.makeid()}
                              disabled={isItemDisable}
                              style={{display: 'flex', width:'auto', borderBottom: 'solid #aeaeae 1px'}}
                              className="dir-item"
                              value={JSON.stringify(item)}
                    >
                        <div className="dir-arrow">{directionIcon}</div>
                        <div className="dir-title">
                            {Identify.__(item.value)}
                        </div>
                        <div className="dir-check">
                            {itemCheck}
                        </div>
                    </MenuItem>
                );
            }, this);
        }
        if(selections.length > 1){
            return (
                <div className="sort-by-select" style={Identify.isRtl()?{marginRight: 'auto'}:{marginLeft: 'auto'}}>
                    <div className="sort-by-options">
                        {Identify.__('Sort by')}
                    </div>
                    <div style={{marginTop: '-5px'}}>
                        <SelectField
                            value={JSON.stringify(selectedItem)}
                            onChange={this.changedSortBy.bind(this)}
                        >
                            {selections}
                        </SelectField>
                    </div>
                </div>

            )
        }
    }

    render() {
        console.log(this.parent.state.itemsDisplayMode);
        const {data} = this.props || {};
        let itemCount = '';
        if(this.props.currentPage && data.total && this.props.limit && data.all_ids instanceof Array){
            const anchorItem = (this.props.currentPage -1)* this.props.limit;
            itemCount = <span className="items-count">
                    {Identify.__('Items %c of %t')
                        .replace('%c', (anchorItem + 1) + '-' + (anchorItem + data.all_ids.length))
                        .replace('%t', this.props.total)}
                </span>;

        }
        const filterButton = (this.parent.parent.leftNavigation && this.parent.parent.leftNavigation.length !== 0)?
            <div className="top-filter-button" onClick={() => {this.parent.parent.handleShowFilterMenu()}}>
                {Identify.__('Filter')}
            </div>:'';
        return (
            <div className="top-sort-by">
                {filterButton}
                <div className={this.parent.state.itemsDisplayMode === 1 ? "gridlist-switcher active" : "gridlist-switcher"}>
                    <IconButton style={{width: '36px', height: '36px', padding: '8px'}}
                                onClick={(e) => {
                                    this.switchShowType(1)
                                }}>
                        <GridIcon/>
                    </IconButton>
                </div>
                <div className={this.parent.state.itemsDisplayMode === 0 ? "gridlist-switcher active" : "gridlist-switcher"}>
                    <IconButton style={{width: '36px', height: '36px', padding: '8px'}}
                                onClick={(e) => {
                                    this.switchShowType(0)
                                }}>
                        <ListIcon/>
                    </IconButton>
                </div>
                {itemCount}
                {this.renderSortBy(data)}
            </div>
        )
    }
}

export default Sortby