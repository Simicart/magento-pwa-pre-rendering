import React from 'react';
import PageAbstract from './PageAbstract';
import ListDownloadable from '../Component/MyDownloadable/ListDownloadable';
import TableView from '../Component/MyDownloadable/TableView';

class MyDownloadable extends PageAbstract {
    render() {
        return (
            <div className="my-downloadable-page">
                {this.renderPageTitle("My downloadable products")}
                <div className="page-content">
                    <div className="section my-downloadable">
                        <div className="section-content">
                            {this.state.isPhone && (
                                <ListDownloadable/>
                            )}
                            {!this.state.isPhone && (
                                <TableView/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyDownloadable;