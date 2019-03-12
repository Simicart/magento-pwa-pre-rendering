import React from 'react'
import Layout from '../Layout'
import fetch from "isomorphic-unfetch";
import Link from 'next/link'
import Route from 'next/router';
class Products extends React.Component {

    state = {
        data : null,
        loaded : false
    }

    setData(data){
        this.setState({
            data,loaded:true
        })
    }

    static async getInitialProps(context) {
        let id = context.query.cat
        const res = await fetch('https://cody.pwa-commerce.com/simiconnector/rest/v2/products?filter[cat_id]='+id);
        const data = await res.json()
        return {...data}
    }

    renderContent = (data) => {
        return (
            <div className="product-detail container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="product-detail-img">
                            <img className="img-fluid" style={{height:330,objectFit:'contain'}} src={data.images[0].url} alt={data.name}/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    renderLeftNavigation() {
        let shopby = [];
        const filter = this.renderFilter();
        if (window.innerWidth < 768) {
            if (filter) {
                shopby.push(
                    <div key="tapita-left-navigation-filter" className="left-navigation">
                        {filter}
                    </div>
                );
            }
            const menuStyle = {
                background : 'white',
                padding: '10px',
                overflow: 'scroll'
                //background : configColor.menu_background,
            };
            if (shopby.length !==0)
                return (
                    <SideBar
                        SideBarClass="left-menu-filter-tablet"
                        contentStyle={menuStyle}
                        renderView={shopby}
                        showConfig='left'
                        width={300}
                        classToggleSideBar='.app-bar-menu-filter'
                    />);
            return shopby
        }
        if (filter) {
            shopby.push(
                <div key="tapita-left-navigation-filter" className="left-navigation" style={{width: '33.333%'}}>
                    {filter}
                </div>
            );
        }
        return shopby;
    }

    renderItems =(data) => {
        if (data.length === 0) {
            return (
                <div className="no-product">
                    <p>{Identify.__('There are no products matching the selection')}</p>
                </div>
            );
        }
        return data.map(function (item, index) {
            const itemKey = `tablet-product-items-${item.entity_id}-${index}`;
            let img = item.images[0].url;
            return (
                <div className="product-item tapita-product-grid-item" key={itemKey}>
                    <Link href={`/product?id=${item.entity_id}`} as={`/product/${item.request_path}`}>
                        <a>
                            <div className="product-img">
                                <img src={img} alt={item.name}/>
                            </div>
                        </a>
                    </Link>
                    <div className="tablet-product-des">
                        <div className="product-name small">
                            <Link href={`/product?id=${item.entity_id}`} as={`/product/${item.url_path}`}>
                                <a>{item.name}</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )

        }, this);
    }

    render() {
        const data = this.props.products
        let header = {
            title : 'Category page'
        }
        if(this.props.layers && this.props.layers.hasOwnProperty('layer_state') && this.props.layers.layer_state.length ){
            const {layer_state} = this.props.layers;
            header['title'] = layer_state.label
            header['description'] = layer_state.label
        }
        return (
            <Layout header={header}>
                category page
                <div className="product-list-container-tablet">
                    {this.renderItems(data)}
                </div>
            </Layout>
        );
    }
}
export default Products