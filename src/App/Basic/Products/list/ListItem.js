import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import GridItem from '../../../Tapita/Products/Component/Griditem'
import Identify from "../../../../Helper/Identify";
import LoadingMore from '../../../../BaseComponent/Loading/ReactLoading'

class ListItem extends Abstract{

    renderProduct(data){

        let itemWidth = '100%'
        if (this.props.show === 1) {
            if (!this.state.isPhone) {
                itemWidth = '50%'
            }
        } else {
            itemWidth = '50%'
            if (!this.state.isPhone) {
                itemWidth = '25%'
            }
        }

        return data.products.map(function (item, index) {

            const itemKey = `tablet-product-items-${item.entity_id}-${index}`;
            return (
                <div key={itemKey} style={{width: itemWidth, display: 'inline-block'}}>
                    <GridItem
                        item={item}
                        lazyImage={true}
                    />
                </div>
            )

        }, this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
    
    isBottom(el) {
        return el.getBoundingClientRect().top <= window.innerHeight;
    }
    
    trackScrolling = () => {
        const wrappedElement = document.getElementById('basic-product-items-load-more');
        if (wrappedElement && this.isBottom(wrappedElement)) {
            this.props.ProductsParent.loadMoreProducts()
        }
    };

    render() {

        const {data} = this.props || {}
        const {ProductsParent} = this.props

        if(data.products instanceof Array && data.products.length < 1){
            return(
                <div className="no-product">
                    <p>{Identify.__('There are no products matching the selection')}</p>
                </div>
            )
        }

        return (
            <div className="basic-product-items">
                {this.renderProduct(data)}
                {((ProductsParent.limit + ProductsParent.offset) < ProductsParent.total) &&
                    (
                        <div id="basic-product-items-load-more">
                            <LoadingMore />
                        </div>
                    )
                }
            </div>
        );
    }
}
export default ListItem