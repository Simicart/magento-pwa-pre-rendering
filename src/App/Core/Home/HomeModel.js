import Model from '../../../Model'

class HomeModel extends Model {

    getHomeLite(params = {}){
        return this.connect('homes/lite',params)
    }

    getHomeFull(params = {}){
        return this.connect('homes',params)
    }
}
export default HomeModel