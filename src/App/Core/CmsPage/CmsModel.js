import Model from '../../../Model';

class CmsModel extends Model {
    getCmsPage = (itemId) => {
        return this.connect(`cmspages/${itemId}`);
    }
}

export default CmsModel;