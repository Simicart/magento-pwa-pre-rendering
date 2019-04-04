/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/4/19
 * Time: 9:38 AM
 */
import Model from '../../../Model'

class CategoryModel extends Model{
    getTreeCategory(params = {}){
        let api = 'categorytrees';
        return this.connect(api, params);
    }

    getRootCategory(cate_id = -1) {
        let api = 'categories';
        if(cate_id !== -1){
            api += '/' + cate_id;
        }
        let data = {};
        return this.connect(api, data);
    }

    setData(data) {
        if (data && !data.errors) {
            sessionStorage.setItem('categorytrees', JSON.stringify(data));
        }
        if (this.obj) {
            try{
                this.obj.setData(data);
            } catch(err) {

            }
        }
    }
}
export default CategoryModel