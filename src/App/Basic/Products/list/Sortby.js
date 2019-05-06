import React from 'react'
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify'
import ArrowUp from '../../../../BaseComponent/Icon/LongArrowUp'
import ArrowDown from '../../../../BaseComponent/Icon/LongArrowDown'
import Check from '../../../../BaseComponent/Icon/SingleSelect'
import './sortby.scss'

// import {OFFSET} from '../../../../Config/Constants'
const configColor = Identify.getColorConfig()

class BasicSortby extends Abstract {
    changedSortBy(item) {
        if (!this.props.ProductsParent || !this.props.ProductsParent.ProductModel)
            return;
        this.props.ProductsParent.setLoaded(false);
        let Jquery = this.props.ProductsParent.ProductModel.getParams();
        Jquery['order'] = item.key;
        Jquery['dir'] = item.direction;
        /* Jquery['offset'] = OFFSET
        this.props.ProductsParent.offset = OFFSET */
        this.props.ProductsParent.ProductModel.setParams(Jquery);
        this.props.ProductsParent.getProducts();
       
    }

    render() {
        this.parent = this.props.parent;
        let selections = [];
        const ProductsParent = this.props.ProductsParent;
        if (!ProductsParent)
            return;

        const {data} = this.props || {};

        if(data && data.orders) {
            selections = data.orders.map((item, index) => {
                const itemCheck = item.default === '1' ?
                    <span className="is-selected">
                            <Check color={configColor.button_background} style={{width: 16, height: 16}}/>
                        </span>
                    : "";
                const directionIcon = item.direction === 'asc' ?
                    <ArrowUp style={{width: 16, height: 16}}/> :
                    <ArrowDown style={{width: 16, height: 16}}/>;
                return (
                    <div key={Identify.makeid()}
                              style={{display: 'flex', width:'auto', borderTop: (index !== 0)?'solid 1px #d0d0d0':'none'}}
                              className="dir-item"
                              onClick={() => this.changedSortBy(item)}
                    >
                        <div style={{display: 'flex', width:'auto'}}>
                            <div className="dir-arrow">{directionIcon}</div>
                            <div className="dir-title">
                                {item.value}
                            </div>
                        </div>
                        <div className="dir-check">
                            {itemCheck}
                        </div>
                    </div>
                );
            }, this);
        }
        
        return (
            <div className="basic-sort-by">
                <div style={{marginTop: '-5px'}}>
                    {selections}
                </div>
            </div>
        )
    }
}
export default BasicSortby