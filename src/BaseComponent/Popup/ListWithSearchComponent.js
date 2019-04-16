import React from 'react';
import {List} from '@material-ui/core/List';
import {ListItem} from '@material-ui/core/ListItem'
import Identify from '../../Helper/Identify';
import Check from '@material-ui/icons/Check';
import ClearSearch from '@material-ui/icons/HighlightOff';
import Divider from '@material-ui/core/Divider';
import FullscreenDialog from '../../BaseComponent/Dialog';
import './ListWithSearchComponent.css';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '../../BaseComponent/Icon/Close'

const configColor = Identify.getColorConfig()
class ListWithSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemSelected: this.props.itemSelect || 0,
            initialItems: this.props.DataBind || [],
            openDialog: false,
            searchKey: ""

        }
    }

    componentDidMount() {
        this.setState({items: this.state.initialItems});
    }

    showDiaglog = (openDialog) => {
        this.setState({openDialog});
    };

    renderListItems() {
        let items = this.state.items;
        let itemSelected = this.state.itemSelected;
        if (items.length > 0) {

            return items.map((item) => {
                let right_icon = <div></div>;
                let isDisabled = false;
                if (item.value === itemSelected) {
                    isDisabled = true;
                    right_icon = <Check/>
                }
                return (
                    <div key={Identify.makeid()}>
                        <ListItem onClick={this.props.itemClick || function (e) {
                        }}
                                  rightIcon={right_icon}
                                  primaryText={item.label}
                                  disabled={isDisabled}
                        >
                            <input type='hidden' value={item.value}/>
                        </ListItem>
                        <Divider/>
                    </div>
                );
            });
        }

        return (
            <div>{Identify.__('List is empty')}</div>
        );
    }

    searchList = event => {
        let updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function (item) {
            return item.label && item.label.toString().toLowerCase().search(
                event.target.value.toString().toLowerCase()) !== -1;
        });
        this.setState({items: updatedList, searchKey: event.target.value});
    };

    clearSearch() {
        this.setState({items: this.state.initialItems, searchKey: ""});
    }

    renderJs() {
        let currentClass = this;
        const $ = window.$;
        $(document).ready(function () {
            $('#search-ac').focus().val('').val(currentClass.state.searchKey);
            if (currentClass.state.searchKey !== "") {
                $('.clear-search').show();
            } else {
                $('.clear-search').hide();
            }
        });

    }

    render() {
        let appBarStyle = {
            background: configColor.key_color,
        };

        if (this.props && this.props.popup === true) {
            return (
                <FullscreenDialog
                    open={this.state.openDialog}
                    onRequestClose={() => this.showDiaglog(false)}
                    closeIcon={<CloseIcon color={{color: configColor.top_menu_icon_color}}/>}
                    title={this.props.popupTitle || Identify.__('Please choose')}
                    titleStyle={{color: configColor.top_menu_icon_color, fontWeight: "lighter"}}
                    appBarStyle={appBarStyle}
                    containerStyle={{background: configColor.app_background}}
                >
                    <div key={Identify.makeid()} className='list-container' id="list-container"
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
                        <List>
                            {this.renderListItems()}
                        </List>
                        {this.renderJs()}
                    </div>
                </FullscreenDialog>
            );
        }
        return (
            <div key={Identify.makeid()} className='list-container'
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
            <List>
                {this.renderListItems()}
            </List>
            {this.renderJs()}
        </div>);
    }
}

ListWithSearchComponent.propTypes = {
    popupTitle: PropTypes.string,
    DataBind: PropTypes.array,
    itemClick: PropTypes.func,
    popup: PropTypes.bool,
    itemSelect: PropTypes.string,
}
export default ListWithSearchComponent;