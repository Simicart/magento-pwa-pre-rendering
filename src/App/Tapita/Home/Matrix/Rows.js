/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 3/29/19
 * Time: 11:35 AM
 */
import React from 'react';
import Abstract from '../../../Core/BaseAbstract'
import Identify from "../../../../Helper/Identify";
import {Link} from 'simiLink'
import Url from "../../../../Helper/Url";
class MatrixRows extends Abstract {
    constructor(props) {
        super(props);
        this.merchant_config = Identify.getMerchantConfig();
        this.is_show_home_title = this.merchant_config &&
            this.merchant_config.storeview &&
            this.merchant_config.storeview.base &&
            (this.merchant_config.storeview.base.is_show_home_title === '1');
        this.state.width = 360
    }

    componentDidMount(){
        this.setState({width : window.innerWidth})
    }

    renderRows(total) {

        let rows = [];
        const count = total.length;

        total.sort(function (a, b) {
            return parseInt(a.sort_order - b.sort_order, 10);
        });

        let mappedRows = [];
        for (let j = 0; j < count; j++) {
            const item = total[j];
            const matrixId = parseInt(item.matrix_row, 10);
            if (this.props.hide_product_list === '1' && !item.category_id)
                continue;
            if (!mappedRows[matrixId])
                mappedRows[matrixId] = [];

            mappedRows[matrixId].push(item);
        }
        mappedRows.map(function (mappedRow) {
            let row = [];
            let width = this.state.width
            mappedRow.map(function (item) {

                const item_width = width / 100 * item.matrix_width_percent;
                const item_height = width / 100 * item.matrix_height_percent;
                if (item.category_id != null) {
                    let image_url = item.simicategory_filename_tablet;
                    if (this.state.isPhone) {
                        image_url = item.simicategory_filename;
                    }
                    if (!image_url || image_url === '')
                        return false;

                    const url_path = (item.url_path && item.url_path!=='/') ?
                        item.url_path :
                        `/products?cat=${item.category_id}`

                    const location = {
                        pathname: url_path,
                        state: {
                            cate_id: item.category_id,
                            hasChild: item.has_children,
                            name: item.cat_name,
                        }
                    };

                    const textTitle = this.is_show_home_title ?
                        (<div className="matrix-row-item-text">{item.cat_name.toUpperCase()}</div>) : '';

                    row.push(
                        <div key={Identify.makeid()} onClick={()=>this.analyticsTracking(item)}>
                            {/*<Link to={location}>*/}
                            <div style={{
                                width: item_width,
                                height: item_height,
                                marginRight: '1px',
                                position: 'relative',
                                backgroundImage: `url("${image_url}")`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '50% 50%',
                            }}>
                                {textTitle}
                            </div>
                            {/*</Link>*/}
                        </div>
                    );
                } else {
                    let image_url = item.list_image_tablet;
                    if (this.state.isPhone) {
                        image_url = item.list_image;
                    }
                    if (!image_url || image_url === '')
                        return false;

                    const slug = Url.convertToSlug(item.list_title);
                    const location = {
                        pathname: `product-lists/${slug}`,
                        state: {product_list_id: item.item_id, hashChild: false, product_list_title: item.list_title}
                    }
                    const textTitle = this.is_show_home_title ?
                        (<div className="matrix-row-item-text">{item.list_title.toUpperCase()}</div>) : '';
                    row.push(
                        <div key={Identify.makeid()} onClick={()=>this.analyticsTracking(item)}>
                            {/*<Link to={location}>*/}
                            <div style={{
                                width: item_width,
                                height: item_height,
                                marginRight: '1px',
                                position: 'relative',
                                backgroundImage: `url("${image_url}")`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '50% 50%',
                            }}>
                                {textTitle}
                            </div>
                            {/*</Link>*/}
                        </div>
                    );
                }
                return null
            }, this);
            rows.push(
                <div key={Identify.makeid()} className="matrix-row">
                    {row}
                </div>
            );
            return null
        }, this);
        return rows;
    }

    render() {
        const homeData = this.props.data;
        // if (!homeData) {
        //     return (<Loading className="loading"/>);
        // }
        const categories = homeData.homecategories.homecategories;
        const products = homeData.homeproductlists.homeproductlists;
        const total = categories.concat(products);

        return (
            <div>{this.renderRows(total)}</div>
        );
    }
}
export default MatrixRows;
