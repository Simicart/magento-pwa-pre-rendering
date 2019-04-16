import React, { Component } from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import LoadingMore from '../../../../BaseComponent/Loading';

class ListViewAbstract extends Abstract {
    constructor(props) {
        super(props);
        this.configs = Identify.getMerchantConfig();
        this.offset = 0;
        this.limit = 15;
        this.total = 0;
        this.loadMore = true;
        this.unmount = false;
    }

    componentDidMount() {
        if (!this.checkExistData()) {
            this.initLoadData();
        };

        const self = this;
        const $ = window.$;
        $(window).scroll(function () {
            let st = $(this).scrollTop();
            let lastScrollTop = $(window).height() + st + 50;
            let documentHeight = $(document).height();
            if(documentHeight - lastScrollTop <= 10 &&
                self.loadMore &&
                self.total > self.limit && !self.unmount)
            {
                console.log('haha');
                self.loadMoreData()
            }
        });
    }

    componentWillUnmount() {
        this.unmount = true;
    }
    

    initLoadData = () => {
        return null;
    };

    hideLoadingMore = () => {
        const $ = window.$;
        $(".listview-component .loading-more").hide();
    };

    showLoadingMore = () => {
        const $ = window.$;
        $(".listview-component .loading-more").show();
    };

    checkExistData = () => {
        return true;
    };

    loadMoreData = () => {
        console.log('loadmore');
    };

    getDateFormat = (dateData) => {
        let date = Date.parse(dateData);
        date = new Date(date);
        // if (Identify.detectPlatforms() === 1 || Identify.detectPlatforms() === 3) {
        //     let arr = dateData.split(/[- :]/);
        //     date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        // }
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        return month + "/" + day + "/" + date.getFullYear();
    };

    renderLoadMore() {
        return <LoadingMore className='loading-more' divStyle={{display:'none'}}/>
    }
    
    render() {
        return (
            <div className="listview-component">
                <ul className="list-view-content" id="data-list">
                    {this.props.renderItems}
                </ul>
                <LoadingMore className='loading-more' divStyle={{display:'none'}}/>
            </div>
        );
    }
}

export default ListViewAbstract;