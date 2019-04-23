/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/21/19
 * Time: 11:20 PM
 */
import Model from '../../../Model'

class ProductModel extends Model{
    constructor(props){
        super(props);
        this.params ={}
    }

    setParams = (params) => {
        this.params = params;
        return this;
    }

    getParams() {
        return this.params;
    }

    getCollection(params = this.params){
        this.setParams(params);
        if(params.hasOwnProperty('filter[cat_id]') && params['filter[cat_id]']){
            this.obj.cateId = params['filter[cat_id]']
        }
        return this.connect('products', params);
    }

    getHomeProductListCollection(list_id, params = this.params){
        this.setParams(params);
        return this.connect(`homeproductlists/${list_id}`,params);
    }
}
export default ProductModel