import React from 'react';
import ViewComponent from '../ViewComponent';
import PropTypes from 'prop-types';
import Identify from '../../Helper/Identify';
import BackIcon from '../../BaseComponent/Icon/Back'
import NextIcon from '../../BaseComponent/Icon/Next'
import './pagination.scss'
class Pagination extends ViewComponent {
    constructor(props){
        super(props);
        this.state = {
            currentPage : this.props.currentPage,
            limit : this.props.limit,
            data : this.props.data,
            itemCount : this.props.itemCount
        }
        this.startPage = 1;
        this.endPage = this.startPage + 3;
    }

    changePage(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
        this.props.handleChangePage(event.target.id,this.state.limit)
    }

    changeLimit = (event, index, value) => {
        this.setState({
            limit: Number(event.target.value),
            currentPage : 1
        });
        this.props.handleChangePage(1,Number(event.target.value))
    };

    renderItem =(item)=>{
      return this.props.renderItem(item)
    };

    handleChangePage =(next = true)=>{
        let currentPage = next ? this.state.currentPage + 1 : this.state.currentPage - 1;
        if(currentPage > this.endPage){
            this.startPage = this.startPage + 1;
            this.endPage = this.endPage + 1;
        }else if (currentPage < this.startPage){
            this.startPage = this.startPage - 1;
            this.endPage = this.endPage - 1;
        }
        this.setState({
            currentPage : currentPage
        })
        this.props.handleChangePage(currentPage,this.state.limit)
    }

    renderPageNumber = (total)=>{
        // Logic for displaying page numbers
        if(!this.props.showPageNumber) return null;
        const pageNumbers = [];
        let totalItem = total;
        total =  Math.ceil(total / this.state.limit);
        let endpage = this.endPage > total ? total : this.endPage
        for (let i = this.startPage; i <= endpage; i++) {
            pageNumbers.push(i);
        }
        let obj = this;
        const renderPageNumbers = pageNumbers.map(number => {
            let active = number === obj.state.currentPage ?
                {
                    borderRadius: '15px',
                    background: '#f2f2f2',
                } : {};
            active = {
                ...active,
                ...{
                    fontWeight : 500,
                    display : 'inline-block',
                    width: '30px',
                    height: '30px',
                    textAlign: 'center',
                    paddingTop: 5,
                    cursor : 'pointer'
                }
            };
            return (
                <li
                    key={number}
                    id={number}
                    onClick={(e)=>this.changePage(e)}
                    style={active}
                >
                    {number}
                </li>
            );
        });
        let option_limit = [];
        if (this.props.itemsPerPageOptions)
        {
            this.props.itemsPerPageOptions.map((item) => {
                    option_limit.push(<option key={Identify.makeid()} value={item} >{item}</option>);
                    return null    
                }
            );
        }
        let nextPageIcon = null;
        let prevPageIcon = null;
        if(this.endPage < total && this.state.currentPage <= this.endPage){
            nextPageIcon = <NextIcon style={{width: 6}}/>;
        }
        if(this.state.currentPage >= this.startPage && this.endPage > 4){
            prevPageIcon = <BackIcon style={{width: 6}}/>;
        }
        
        let pagesSelection = (total>1)?(
            <ul id="page-numbers" style={{
                border : 'none',
                padding : 0,
                display : 'flex',
                alignItems : 'center',
                fontSize : 14
            }}>
                <li className="icon-page-number" onClick={()=>this.handleChangePage(false)}>{prevPageIcon}</li>
                {renderPageNumbers}
                <li className="icon-page-number" onClick={()=>this.handleChangePage(true)}>{nextPageIcon}</li>
            </ul>
        ):'';
        let {currentPage,limit} = this.state;
        let lastItem = currentPage * limit;
        let firstItem = lastItem - limit+1;
        lastItem = lastItem > totalItem ? totalItem : lastItem;
        let itemsPerPage = (
            <div className="items-per-page" style={{marginLeft : 'auto'}}>
                {
                    this.props.showInfoItem &&
                    <span style={{marginRight : 10,fontSize : 16}}>
                        {Identify.__('Items %a - %b of %c').replace('%a', firstItem).replace('%b', lastItem).replace('%c', totalItem)}
                    </span>
                }
                <span style={{fontWeight : 600,fontSize : 16}}>{Identify.__('Show')}</span>
                <span className="items-per-page-select"  style={{
                    margin : '0 5px',
                    background: 'none'
                }}>
                        <select value={this.state.limit}
                                id="limit"
                                onChange={(e)=>this.changeLimit(e)}
                                style={{
                                    border: 'none',
                                    borderRadius: '0',
                                    borderBottom: 'solid #2d2d2d 1px',
                                    fontSize : 14
                                }}
                        >
                            {option_limit}
                        </select>
                    </span>
                <span style={{fontWeight : 400,fontSize : 16}}>{Identify.__('per page')}</span>
            </div>
        );
        
        return (
            <div className="config-page"
                 style={{
                     display : 'flex',
                     alignItems : 'center',
                     justifyContent : 'space-between'
                 }}
            >
                {pagesSelection}
                {itemsPerPage}
            </div>
        )
    };

    renderPagination = ()=>{
        //handle the case itemCount changed from parent
        if (this.props.itemCount !== this.state.itemCount) {
            this.setState({
                currentPage : 1,
                limit : this.props.limit,
                data : this.props.data,
                itemCount : this.props.itemCount
            })
        }
        
        let {data,currentPage, limit, itemCount} = this.state;
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
                    {items}
                    {this.renderPageNumber(total)}
                </div>
            )
        } else if (itemCount > 0) {
            this.renderItem();
            return (
                <div className="list-items">
                    {this.renderPageNumber(itemCount)}
                </div>
            )
        }
        return <div></div>
    }

    render(){
        return this.renderPagination();
    }
}
/*
data OR itemCount is required to calculate pages count
 */

Pagination.defaultProps = {
    currentPage : 1,
    limit : 5,
    data: [],
    itemCount: 0,
    itemsPerPageOptions: [5, 10, 15, 20],
    table : false,
    showPageNumber : true,
    showInfoItem : true,
    handleChangePage : ()=>{},
    renderItem : ()=>{}
};
Pagination.propTypes = {
    currentPage: PropTypes.number,
    limit: PropTypes.number,
    data: PropTypes.array,
    renderItem : PropTypes.func,
    itemCount: PropTypes.number,
    itemsPerPageOptions: PropTypes.array,
    handleChangePage : PropTypes.func
};
export default Pagination;