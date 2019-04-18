import React, { Component } from 'react';
import Base from '../BaseAbstract';

class CmsAbstract extends Base {
    static async getInitialProps(ctx) {
        console.log(ctx);
    }

}

export default CmsAbstract;