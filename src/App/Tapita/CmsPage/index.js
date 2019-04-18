import React from 'react';
import Base from '../../Core/BaseAbstract';
import Layout from '../../../Layout/Tapita';
import CmsModel from '../../Core/CmsPage/CmsModel';
import CmsContent from './CmsContent';

class CmsPage extends Base {
    static async getInitialProps(ctx) {
        const cmsId = ctx.query.id;
        if(cmsId !== undefined) {
            const cmsModel = new CmsModel();
            const data = await cmsModel.getCmsPage(cmsId);
            return {cmsData: data};
        }
    }
    
    render() {
        const { cmsData } = this.props;
        return <CmsContent data={cmsData}/>
    }
}

export default CmsPage;