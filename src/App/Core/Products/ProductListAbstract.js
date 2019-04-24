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
        let cateId = null
        let q_filter = null
        let params = {}
        if(query.hasOwnProperty('q')){
            page_type = 'search'
            q_filter = query.q
            const Model = new CateModel();
            const data = await Model.getTreeCategory()
            return {page_type, cateId, q_filter, catetrees : data}
        }
        if(page_type === 'category'){
            cateId = query.cat
            const Model = new CateModel();
            const data = await Model.getTreeCategory()
            return {page_type, cateId, q_filter, catetrees : data}
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.list_products && nextProps.list_products !== prevState.data) {
            return {data : nextProps.list_products}
        }
        return {...prevState}
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.cateId !== this.props.cateId){
            let params = this.ProductModel.getParams()
            params['filter[cat_id]'] = nextProps.cateId
            this.ProductModel.setParams(params)
            this.getProducts()
            return true
        }
        return true
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

    getMetaHeader(){
        let {page_type, q_filter} = this.props;
        let title = null;
        let description = null;
        if(page_type === 'search'){
            title = Identify.__(`Search result for '${q_filter}'`);
            description = Identify.__(`Result detail of search keyword: '${q_filter}'`)
        }else{
            const currentCate = this.cateData || {}

            title = currentCate.name
            description = currentCate.meta_description ? currentCate.meta_description : title
        }

        return {title,description}
    }

    componentDidMount(){
        const {catetrees,page_type,cateId,q_filter} = this.props
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE,'categorytrees',catetrees)
        let params = this.ProductModel.getParams()
        if(!this.state.data){
            params['image_height'] = this.checkIsPhone() ? 180 : 300
            params['image_width'] = this.checkIsPhone() ? 180 : 300
            if(page_type === 'category'){
                params['filter[cat_id]'] = cateId
            }else if(page_type === 'search'){
                params['filter[q]'] = q_filter
            }
            this.getProducts()
        }else{
            this.setLoaded(true)
        }
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