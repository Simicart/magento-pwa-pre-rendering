/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/21/19
 * Time: 8:15 PM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import Identify from "../../../../Helper/Identify";
import {SimiLink} from "../../../../BaseComponent/Link";
import './ListHeader.scss'

const configColor = Identify.getColorConfig()
class ListHeader extends Abstract{

    getCategoryPath = () => {
        const {cateId,catePath} = this.props;
        if(catePath.hasOwnProperty(cateId)){
            let currentPath = catePath[cateId].path;
            currentPath = currentPath.toString().split('/')
            currentPath = currentPath.filter(id => {
                return catePath.hasOwnProperty(id)
            })
            let size = currentPath.length
            currentPath = currentPath.map((id,key) => {
                const item = catePath[id]
                let link = item.link ?
                    <div key={key} style={{display: 'inline-block', color: configColor.button_background}}>
                        <SimiLink route={item.link}>{item.name}</SimiLink>
                    </div> : item.name
                let icon = size === key+1 ? null : ' | '
                return (
                    <React.Fragment key={key}>
                        {link}
                        {icon}
                    </React.Fragment>
                )
            },this)
            return currentPath
        }
        return [];
    }

    renderHeader(){
        const {page_type,currentCate} = this.props
        if(page_type === 'category'){
            let catePath = this.getCategoryPath().length > 1 ? this.getCategoryPath() : null
            let  headerStyle = {borderBottom: `1px solid ${configColor.line_color}`};
            if (currentCate && currentCate.thumbnail_url) {
                headerStyle.background = `white url("${currentCate.thumbnail_url}") top center no-repeat`;
                headerStyle.backgroundSize = 'cover';
            }
            return(
                <div
                    className="product-list-header-tablet"
                    style={headerStyle}
                >
                    <div id="category-path">
                        {catePath}
                    </div>
                    <div id="category-title">
                        {currentCate.name}
                    </div>
                </div>
            )
        }
        return null
    }

    renderChildCats() {
        const {currentCate} = this.props
        if (currentCate && Array.isArray(currentCate.child_cats) && currentCate.child_cats.length > 0) {
            const childCats = currentCate.child_cats.map((item, index) => {
                let link = item.url_path !== undefined ? "/" + item.url_path : "/" + item.request_path || "/products?cat=" + item.entity_id
                return (
                    <div
                        className="category-nav-item-container"
                        onClick={()=>this.pushLink(link)}
                        key={index}
                    >
                        <div
                            className="category-nav-item"
                            style={{borderColor: configColor.line_color}}
                        >
                            {item.name}
                        </div>
                    </div>
                )
            })
            return (
                <div
                    style={{marginTop: 10, marginBottom: 10}} >
                    {childCats}
                </div>
            )
        }
        return null
    }

    render() {
        return (
            <div className="tapita-products-header">
                {this.renderHeader()}
                {this.renderChildCats()}
            </div>
        )
    }
}
export default ListHeader