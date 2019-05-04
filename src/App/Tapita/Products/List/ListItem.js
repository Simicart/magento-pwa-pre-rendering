/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/23/19
 * Time: 8:32 PM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import GridItem from '../Component/Griditem'
import ListProduct from '../Component/ListItem'
import Identify from "../../../../Helper/Identify";
import SortBy from './Sortby'
import Pagination from '../../../../BaseComponent/Pagination'
class ListItem extends Abstract{

    constructor(props) {
        super(props);
        this.ProductsParent = this.props.ProductsParent
        this.itemsPerPageOptions = [12, 24, 36, 48, 60];
        this.limit = 12;
        this.currentPage = 1;
        this.state = {
            itemsDisplayMode: 1
        }
    }


    renderProduct(data){
        console.log(this.state.itemsDisplayMode);
        return data.products.map(function (item, index) {
            const itemKey = `tablet-product-items-${item.entity_id}-${index}`;
            if (this.state.itemsDisplayMode === 0) {
                return (
                    <ListProduct
                        key={itemKey}
                        item={item}
                        lazyImage={true}
                    />
                )
            } 
            
            return (
                <GridItem
                    key={itemKey}
                    item={item}
                    lazyImage={true}
                />
            )

        }, this);
    }

    handleChangePage = (page,limit) => {
        let params = this.ProductsParent.ProductModel.getParams()
        params['limit'] = limit
        params['offset'] = (page-1)*limit
        this.ProductsParent.ProductModel.setParams(params)
        Identify.showLoading()
        this.ProductsParent.getProducts()
    }

    render() {
        const {data} = this.props || {}
        if(data.products instanceof Array && data.products.length < 1){
            return(
                <div className="no-product">
                    <p>{Identify.__('There are no products matching the selection')}</p>
                </div>
            )
        }
        let limit = parseInt(this.props.data.page_size,10);
        return (
            <div className="product-list-items">
                <SortBy ProductsParent={this.ProductsParent}
                        currentPage={this.currentPage}
                        parent={this}
                        data={data}
                        total={data.total}
                        limit={this.limit}/>
                <div className="product-grid">{this.renderProduct(data)}</div>
                <div className="product-grid-pagination">
                    <Pagination itemCount={data.total}
                                limit={limit}
                                currentPage={this.currentPage}
                                itemsPerPageOptions={this.itemsPerPageOptions}
                                showInfoItem={false}
                                handleChangePage={this.handleChangePage}/>
                </div>
            </div>
        );
    }
}
export default ListItem