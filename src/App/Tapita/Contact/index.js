import React, { Component } from 'react';
// import AddCommentFrom from './AddCommentFrom';
import Layout from '../../../Layout/Tapita';
import Info from './Info';
import Identify from '../../../Helper/Identify';
import dynamic from "next/dynamic";

const AddCommentFrom = dynamic(
  import('./AddCommentFrom'),
  { ssr: false }
)

class Contact extends Component {
  constructor(props) {
    super(props);
    this.metaHeader = {
      title: 'Contact'
    };
    this.storeViewConfigs = Identify.getMerchantConfig();
  }

  renderContactContent() {
    return (
      <React.Fragment>
        <div className="contact-us-wrapper">
          <div className="contact-header container">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <h1 className="title">{Identify.__('Contact Us')}</h1>
              </div>
            </div>
          </div>
          <div className="contact-content">
            {this.storeViewConfigs.storeview !== undefined
              && this.storeViewConfigs.storeview.instant_contact !== undefined && (
                <Info contactData={this.storeViewConfigs.storeview.instant_contact} />
              )}
            <div className="add-comment-slide">
              <div className="container">
                <AddCommentFrom />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Layout header={this.metaHeader}>
        {this.renderContactContent()}
      </Layout>
    );
  }
}

export default Contact;