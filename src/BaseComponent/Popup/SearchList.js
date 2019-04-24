import React from 'react';
import ListWithSearchComponent from "./ListWithSearchComponent";
import Identify from "../../Helper/Identify";
import IconButton from '@material-ui/core/IconButton';
import ClearSearch from '@material-ui/icons/HighlightOff';
import SimiDialog from "../Dialog";
import IconCheck from '../../BaseComponent/Icon/SingleSelect'
import './SearchList.scss';

const configColor = Identify.getColorConfig()
class SearchList extends ListWithSearchComponent {

    renderListItems() {
        let items = this.state.items;
        let itemSelected = String(this.state.itemSelected);
        if (items.length > 0) {

            return items.map((item) => {
                let value = item.value ? item.value : 0;
                let isDisabled = false;
                if (item.value === itemSelected) {
                    isDisabled = true;
                }
                return (
                    <li key={Identify.makeid()}
                        onClick={this.props.itemClick || function (e) {
                        }}
                        style={{pointerEvents: isDisabled ? 'none' : ''}}
                    >
                        <span className="item-label">{item.label}</span>
                        <input type="hidden" value={item.value}/>
                        {value === itemSelected && (
                            <IconCheck style={{width: 15, marginLeft: 10}}/>
                        )}
                    </li>
                );
            });
        }

        return (
            <div>{Identify.__('List is empty')}</div>
        );
    }

    renderPopup = () => {
        return (
            <SimiDialog open={this.state.openDialog}
                        onRequestClose={() => {
                            this.setState({openDialog: false})
                        }}
                        title={this.props.popupTitle}
                        fullScreen={window.innerWidth < 768}
                        dialogContent={this.renderDialogContent()}/>
        );
    };

    renderDialogContent = () => {
        return (
            <div key={Identify.makeid()} className='list-container' id="list-container"
                 style={{background: configColor.app_background}}>
                <div className="autocomplete-search-box" style={{background: configColor.app_background}}>
                    <div className="search-box" id="search-box">
                        <input type='text' name='search-ac' id="search-ac"
                               placeholder={Identify.__('Search')}
                               defaultValue={this.state.searchKey}
                               onChange={this.searchList}
                               autoFocus={true}
                        />
                        <span className="clear-search">
                            <IconButton onClick={() => this.clearSearch()}><ClearSearch
                                style={{fill:'#cacaca'}}/></IconButton>
                        </span>
                    </div>
                </div>
                <ul className="list-items">
                    {this.renderListItems()}
                </ul>
                {this.renderJs()}
            </div>
        );
    };

    render = () => {

        if (this.props && this.props.popup === true) {
            return this.renderPopup();
        }
        return (<div key={Identify.makeid()} className='list-container'
                     id="list-container"
                     style={{background: configColor.app_background}}>
            <div className="autocomplete-search-box" style={{background: configColor.app_background}}>
                <div className="search-box" id="search-box">
                    <input type='text' name='search-ac' id="search-ac" autoComplete={true}
                           placeholder={Identify.__('Search')}
                           defaultValue={this.state.searchKey}
                           onChange={this.searchList}
                           autoFocus={true}
                    />
                    <span className="clear-search">
                        <IconButton onClick={() => this.clearSearch()}><ClearSearch
                            color="#cacaca"/></IconButton>
                    </span>
                </div>
            </div>
            <ul className="list-items">
                {this.renderListItems()}
            </ul>
            {this.renderJs()}
        </div>);
    }
}

export default SearchList;