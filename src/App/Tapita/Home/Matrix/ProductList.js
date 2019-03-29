/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 11:35 AM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Identify from "../../../../Helper/Identify";
import {Link} from "simiLink";
import Url from "../../../../Helper/Url";
import Horizontal from '../../Products/Horizontal'
const configColor = Identify.getColorConfig()
class ProductList extends Abstract{

    constructor(props) {
        super(props);
        this.state.tab = 0
    }


    shouldComponentUpdate(nextProps,nextState){
        return (this.state.tab !== nextState.tab) || (this.props.data !== nextProps.data);
    }

    handleTabClick(entity_id,tab){
        this.setState({tab})
    }

    renderViewAllButton = (productList, url, isTop = true) => {
        return (productList.product_array && productList.product_array.total && productList.product_array.total > 3)?
            <Link route={url}>
                <a>
                    <div key={productList.productlist_id}
                         className="matrix-productlist-bottom-link-tapita"
                         style={{color: configColor.button_background}}
                    >
                        {
                            Identify.__('View all') + ' ' + productList.list_title
                        }
                    </div>
                </a>
            </Link>
            :'';
    }

    render(){
        const {tab} = this.state;
        const {data} = this.props;
        let tabs = [];
        const productlists = data.homeproductlists;
        for (let i = 0; i < productlists.length; i++) {
            const item = productlists[i];
            const tabClass = (i === tab)?"matrix-productlist-tapita-tab active":"matrix-productlist-tapita-tab";
            tabs.push(
                <div key={Identify.makeid()} id={"product-list-tab-"+item.entity_id}
                     onClick={() => this.handleTabClick(item.entity_id,i)}
                     style={{backgroundColor: (i===tab)?configColor.button_background:'#f2f2f2'}}
                     className={tabClass}>
                    {item.list_title}
                </div>
            )
        }

        let tabItems = [];
        tabs.forEach(function (tab) {
            tabItems.push(tab);
        });
        if (tabItems.length === 0) return '';
        let item = productlists[tab];

        const slug = '/'+ Url.convertToSlug(item.list_title);
        Identify.setUrlMatchApi(slug,'simi-product-lists',{id:item.item_id})
        return (
            <div className="matrix-productlist-tapita">
                <span className="productlist-title">{Identify.__('FEATURED PRODUCTS')}</span>
                <div className="productlist-tab-container">
                    {tabItems}
                </div>
                <div id={"product-list-tab-content-"+item.entity_id}
                     className={`matrix-productlist-tapita-tab-content`}
                     key={Identify.makeid()}>
                    {
                        item.product_array &&
                        <Horizontal homepage={true}  static={true} product_home_data={item.product_array}/>
                    }
                    {this.state.isPhone && this.renderViewAllButton(item, slug, false)}
                </div>
            </div>
        );
    }
}
export default ProductList