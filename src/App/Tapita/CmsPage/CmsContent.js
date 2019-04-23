import React from 'react';
import Base from '../../Core/BaseAbstract';
import Layout from '../../../Layout';
import ReactHtmlParser from 'react-html-parser';

class CmsContent extends Base {
    constructor(props) {
        super(props);
        this.ranEval = false;

    }
    
    componentDidMount() {
        const { data } = this.props;  
        if(typeof data !== 'object' || !data.hasOwnProperty('cmspage') || Object.keys(data.cmspage).length === 0) {
            this.pushLink('/');
        }
        if (!this.ranEval && data.cmspage.cms_script) {
            const $ = window.$
            $.globalEval(data.cmspage.cms_script)
            this.ranEval = true
        }
    }
    
    render() {
        const { data } = this.props;
        // const $ = window.$
        const header = {
            title : data.cmspage.cms_meta_title ? data.cmspage.cms_meta_title : data.cmspage.cms_title,
            description : data.cmspage.cms_meta_desc ? data.cmspage.cms_meta_desc : data.cmspage.cms_title
        } 
        
        return (
            <Layout server_render={true} header={header}>
                <div style={{ padding: 20}}>
                    {ReactHtmlParser(data.cmspage.cms_content)}
                </div>
            </Layout>
        );
    }
}

export default CmsContent;