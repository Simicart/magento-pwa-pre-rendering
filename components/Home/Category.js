import React from 'react'
import Link from 'next/link'
import Identify from './../../Helper/Identify';
class Category extends React.Component{

    render() {
        const {data} = this.props;
        let categories = data.homecategories.map((item,key)=>{
            return (
                <div className="category-item" key={key}>
                    <Link href={`/products?cat=${item.category_id}`} as={`/product/${item.url_path}`}>
                        <a>
                            <div className="category-item-container" style={{maxWidth: 130}}>
                                    <div className="category-image" style={{borderColor: 'rgb(245, 245, 245)', margin:"0 auto", width: 130, height: 130,overflow : 'hidden'}}>
                                    <img src={item.simicategory_filename} alt={item.simicategory_name} width={130} height={130} />
                                </div>
                                <div className="category-des" style={{color: 'rgb(19, 19, 19)'}}>
                                    <div className="category-name"
                                        style={{
                                            color: 'rgb(19, 19, 19)'
                                        }}>{item.cat_name}</div>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            )
        },this)
        return (
            <div id="categories_home">
                <div className="categories_home_label" style={{margin:10,fontSize:20}}>Category</div>
                <div className="category-content">
                    {categories}
                </div>
            </div>
        );
    }
}
export default Category