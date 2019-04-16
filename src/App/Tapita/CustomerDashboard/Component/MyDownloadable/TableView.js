import React from 'react';
import PageAbstract from '../../Page/PageAbstract';
import CustomerModel from '../../../../Core/Customer/CustomerModel';
import { AppState } from '../../../../../Observer/AppState';
import { SubscribeOne } from 'unstated-x';
import Loading from '../../../../../BaseComponent/Loading';
import PaginationTable from '../../../../../BaseComponent/Pagination/table';
import DownloadableItem from './DownloadableItem';
import Identify from '../../../../../Helper/Identify';

class TableView extends PageAbstract {
    constructor(props) {
        super(props);
        this.CustomerModel = new CustomerModel({ obj: this});
        this.state = {loaded: false}
    }

    componentDidMount = () => {
        if(!this.props.data) {
            this.CustomerModel.getDownloadableProducts();
        } else {
            this.setLoaded(true);
        }
    }

    processData(data) {
        this.props.updateDownloadable(data);
    }

    renderItems(item) {
        return <DownloadableItem itemData={item} key={Identify.makeid()}/>
    }
    
    render() {
        if(!this.state.loaded) {
            return <Loading />
        }

        const data = this.props.data;

        if(!data || !data.hasOwnProperty('downloadableproducts') || data.downloadableproducts.length < 1) {
            return <div className="text-center">{Identify.__('You have no items in your downloadable products')}</div>
        }
        
        const cols = ['Order #', 'Date', 'Title', 'Status', 'Remaining Download'];

        return (
            <div className="table-list-order">
                <PaginationTable
                    renderItem={this.renderItems}
                    data={data.downloadableproducts}
                    cols={cols}
                    showPageNumber={true}
                />
            </div>    
        );
    }
}

const ListDownloadablePage = props => (
    <SubscribeOne to={AppState} bind={['downloadable_data']}>
        {app => <TableView 
                    data={app.state.downloadable_data}
                    updateDownloadable={(data) => app.updateDownloadable(data)}
                    {...props}
                />
        }
    </SubscribeOne>
)
export default ListDownloadablePage;