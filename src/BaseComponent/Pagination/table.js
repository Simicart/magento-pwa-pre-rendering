import React from  'react';
import Pagination from './index';
import Identify from '../../Helper/Identify';
class PaginationTable extends Pagination {

    renderColumnTitle=()=>{
        let data = this.props.cols;
        if(data.length > 0){
            let columns = data.map(item=>{
                return <th key={Identify.makeid()}>{Identify.__(item)}</th>
            });
            return <thead>
            <tr>
                {columns}
            </tr>
            </thead>
        }

    };

    renderPagination = ()=>{
        let {data, currentPage, limit} = this.state;
        if(data.length > 0){
            // Logic for displaying current todos
            const indexOfLastTodo = currentPage * limit;
            const indexOfFirstTodo = indexOfLastTodo - limit;
            const currentReview = data.slice(indexOfFirstTodo, indexOfLastTodo);
            let obj = this;
            const items = currentReview.map((item, key) => {
                return obj.renderItem(item);
            });
            let total = data.length;
            return (
                <div className="list-items">
                    <table style={{width : '100%'}} className="table table-responsive">
                        {this.renderColumnTitle()}
                        <tbody>{items}</tbody>
                    </table>
                    {this.renderPageNumber(total)}
                </div>
            )
        }
        return <div></div>
    }

    render (){
        return this.renderPagination();
    }
}
export default PaginationTable;