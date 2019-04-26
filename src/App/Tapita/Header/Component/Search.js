/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/10/19
 * Time: 2:49 PM
 */
import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import IconButton from '../../../../BaseComponent/IconButton';
import SearchIcon from '../../../../BaseComponent/Icon/Search';
import Close from '../../../../BaseComponent/Icon/Close';
import PropTypes from 'prop-types';

const configColor = Identify.getColorConfig()
class SearchBar extends Abstract {

    componentDidMount(){
        this.searchInput.focus();
    }

    handleSearch = (e) => {
        if (e.key === 'Enter') {
            this.startSearching();
        }
    }

    renderSearchField = () => {
        return <div className="search-field">
            <input id="search-field-value"
                   type="text"
                   onKeyPress={this.handleSearch}
                   ref={(input) => { this.searchInput = input}}
            />
            <IconButton className="search-field-icon"
                        onClick={() => {this.startSearching()}}>
                <SearchIcon color={configColor.button_background}/>
            </IconButton>
        </div>
    }

    startSearching = () => {
        if (this.searchInput && this.searchInput.value.trim()) {
            this.handleHideSearchbar();
            const keyWord = this.searchInput.value;
            this.pushLink(`/search/result?q=${keyWord}`)
        } else {
            Identify.showToastMessage(Identify.__('Please enter key word!'));
        }
    }

    handleHideSearchbar = () => {
        const $ = window.$
        $('#app-bar').css('display','flex')
        $('#search-bar').hide();
    }

    render() {
        let app_style = {
            height: '55px',
            borderBottom: '1px solid #eeeeee',
            backgroundColor: configColor.key_color,
            display: 'none'
        };
        let screen_w = window.innerWidth;
        if (screen_w >= 768 && screen_w < 1024) {
            app_style.paddingLeft = '30px';
            app_style.paddingRight = '40px';
        }
        let rtl = '';
        if (Identify.isRtl()) {
            rtl = 'app-bar-rtl';
        }

        return (
            <div id="search-bar" className={rtl} style={app_style}>
                {this.renderSearchField()}
                <IconButton style={{padding: 0,margin:'0 10px'}}
                            onClick={()=> {this.handleHideSearchbar()}}>
                    <Close color={configColor.top_menu_icon_color} />
                </IconButton>
            </div>
        );
    }
}

SearchBar.contextTypes = {
    parent: PropTypes.object
};
export default SearchBar;