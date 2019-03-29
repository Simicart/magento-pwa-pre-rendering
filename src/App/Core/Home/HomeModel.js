import Model from '../../../Model'

class HomeModel extends Model {

    getHomeLite(params = {}){
        return this.connect('homes',params)
    }

    getHomeFull(params = {}){
        return this.connect('homes',params)
    }
}
export default HomeModel