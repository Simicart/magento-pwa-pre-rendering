/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/1/19
 * Time: 3:53 PM
 */
import React from 'react'
import ProductPath from '../Component/ProductPath'
import ProductImage from '../Component/ProductImage'
// import ProductTabs from '../Component/ProductTabs'
import ProductName from '../Component/ProductName'
import ReviewCount from '../Component/ReviewCount'
import ProductPrice from '../Component/ProductPrice'
import ProductAction from '../Component/ProductAction'
import {ProductOptions, ProductTabs} from "../HoC";

export const layoutConfig =  {
    top_section : {
        product_path : {
            component : ProductPath,
            enable : true,
            sort_order : 10,
        }
    },
    content_left_section : {
        product_image : {
            component :ProductImage,
            enable : true,
            sort_order : 10,
            position : 'left',
            propsComponent : {
                showArrows : true,
                showThumbs : true,
            }
        }
    },
    content_right_section : {
        product_name : {
            component : ProductName,
            enable : true,
            sort_order : 10,
        },
        product_review_count : {
            component : ReviewCount,
            enable : true,
            sort_order : 20,
        },
        product_options : {
            component :   ProductOptions,
            enable : true,
            sort_order : 40
        }
    },
    bottom_section : {
        product_tab : {
            component : ProductTabs,
            enable : true,
            sort_order : 10,
        }
    }
}