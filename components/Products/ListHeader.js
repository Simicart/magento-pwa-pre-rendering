import React from 'react'
import Layout from '../Layout'
import fetch from "isomorphic-unfetch";
class ListHeader extends React.Component {

    renderHeader(data) {
        if (this.header)
            return this.header
        let title = this.props.list_title?this.props.list_title:''
        if (this.props.search_key) {
            title = Identify.__(`Search results for '%s'`).replace('%s', this.props.search_key);
            this.categoryPath = 'Home' + ' | ' + title;
        }
        if(this.category) {
            title = this.category.name.toUpperCase();
        } 
        if(this.categoryPath instanceof Array && this.categoryPath.length < 3){
            this.categoryPath = null
        }
        if (CardTitle && title){
            const categoryPath = this.categoryPath?this.categoryPath:'';
            let  headerStyle = {borderBottom: `1px solid ${configColor.line_color}`};
            if (this.category && this.category.thumbnail_url) {
                headerStyle.background = `white url("${this.category.thumbnail_url}") top center no-repeat`;
                headerStyle.backgroundSize = 'cover';
            }
            this.header =
                <div 
                    className="product-list-header-tablet"
                    style={headerStyle}
                >
                    <div id="category-path">
                        {categoryPath}
                    </div>
                    <div id="category-title">
                        {this.renderMetaHeader({
                            title: title,
                            desc : title
                        })}
                        {title}
                    </div>
                </div>
        }
        return this.header
    }

    render() {
        const {data} = this.props
        let header = {
            title : 'Category page'
        }
        if(this.props.layers && this.props.layers.hasOwnProperty('layer_state') && this.props.layers.layer_state.length ){
            const {layer_state} = this.props.layers;
            header['title'] = layer_state.label
            header['description'] = layer_state.label
        }
        return (
            <div className="tapita-products-header">
                {this.renderHeader()}
                {this.renderChildCats()}
            </div>
        )
    }
}
export default ListHeader