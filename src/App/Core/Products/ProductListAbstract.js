/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/19/19
 * Time: 4:15 PM
 */
import React from 'react'
import Abstract from '../BaseAbstract'
import CateModel from '../Category/CategoryModel'
import Identify from "../../../Helper/Identify";
import ProductModel from '../Product/Model'
class ProductListAbstract extends Abstract{

    static async getInitialProps(ctx) {
        let query = ctx.query
        let page_type = 'category'
        let params = {}
        if(query.hasOwnProperty('q')){
            page_type = 'search'
        }
        if(page_type === 'category'){
            const cateId = query.cat
            const Model = new CateModel();
            const data = await Model.getTreeCategory()
            return {page_type,cateId,catetrees : data}
        }
    }

    constructor(props) {
        super(props);
        this.cateData = null;
        this.catePath = {};
        //loadingMore: 0-no, 1-loading, 2-loaded
        this.loadingMore = 0
        this.limit = 12;
        this.offset = 0;
        this.total = 0;
        this.ProductModel = new ProductModel({obj:this})
        this.ProductModel.setParams({limit:this.limit,offset : this.offset})
    }

    getCateData = (catArray = [], catId = null) => {
        if(catArray.length > 0 && catId){
            for (let i = 0; i < catArray.length; i++) {
                let childCat = catArray[i];
                if(childCat.entity_id && parseInt(childCat.entity_id,10) === parseInt(catId,10)){
                    this.cateData = childCat;
                    this.catePath[childCat.entity_id] = {name: childCat.name,path:childCat.path}
                    return true
                }else if(childCat.child_cats && Array.isArray(childCat.child_cats)) {
                    this.getCateData(childCat.child_cats,catId)
                    let link = childCat.url_path ? '/'+childCat.url_path : '/products?cat='+childCat.entity_id
                    this.catePath[childCat.entity_id] = {name: childCat.name, link}
                }
            }
        }
        return false
    }

    componentWillMount(){
        const {catetrees,cateId} = this.props;
        this.getCateData(catetrees.categorytrees,cateId)
    }

    getMetaHeader(){
        const currentCate = this.cateData || {}
        let title = currentCate.name
        let description = currentCate.meta_description ? currentCate.meta_description : title
        return {title,description}
    }

    componentDidMount(){
        const {catetrees,page_type,cateId} = this.props
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'categorytrees',catetrees)
        let params = this.ProductModel.getParams()
        params['image_height'] = this.checkIsPhone() ? 180 : 300
        params['image_width'] = this.checkIsPhone() ? 180 : 300
        if(page_type === 'category'){
            params['filter[cat_id]'] = cateId
        }
        this.getProducts()
    }

    getProducts(){
        this.ProductModel.getCollection()
    }

    processData(data){
        this.setState({data})
    }

    render() {
        return (
            <div>
                Product List
            </div>
        );
    }
}
export default ProductListAbstract