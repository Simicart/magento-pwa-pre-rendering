import React from 'react';
import Layout from '../../../Layout'
import Base from "../../Core/BaseAbstract";
import Identify from "../../../Helper/Identify";
import FlatButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'simiLink'
import PluginHelper from "../../../Helper/Plugin";
const configColor = Identify.getColorConfig()

const styles = theme => ({
    cssLabel: {
        fontSize: 15,
        paddingLeft: 11,
        '&$cssFocused': {
            color: configColor.button_background,
            paddingLeft: 13
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: configColor.button_background,
        },
    },
    cssInput: {
        fontSize: 16,
        marginTop: 5
    }
});

class SearchPage extends Base {
    constructor(props) {
        super(props);
        let keyWord = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'search') ? Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'search') : "";
        let pathname = "";
        if (keyWord !== "") {
            pathname = "/search/result?q=" + keyWord;
        }
        this.state = { location: pathname };
    }

    getMetaHeader() {
        let title = Identify.__("Search Your Product")
        let description = Identify.__("Search product page")
        return { title, description }
    }

    handleSearch = () => {
        const $ = window.$;
        let searchBox = $('.input-search input[type="text"]');
        let keyWord = searchBox.val();
        if (!keyWord) {
            Identify.showToastMessage(Identify.__('Please enter key word!'));
            return;
        }
        Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, 'search', keyWord);
        let pathname = "/search/result?q=" + keyWord;
        this.pushLink(pathname);
    }

    clear = () => {
        const $ = window.$;
        sessionStorage.removeItem('search');
        let searchBox = $('.input-search input[type="text"]');
        searchBox.val(null);
        searchBox.focus();
    };

    renderVoiceSearch() {
        if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
            let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (PluginHelper.isPluginEnabled(PluginHelper.getPluginSku().VOICE_SEARCH) && !iOS)
                return (
                    <div style={{ margin: '10px' }}>
                        <Link route="/voicesearch">
                            <FlatButton
                                style={{
                                    backgroundColor: configColor.button_background,
                                    color: configColor.button_text_color,
                                    minWidth: '160px',
                                    fontSize: 14
                                }}
                            >{Identify.__('Voice Search')}</FlatButton>
                        </Link>
                    </div>
                )
        }
    }

    render() {
        let value = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'search') ?
            Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'search') : null;
        let clear = value ? <FlatButton
            onClick={() => this.clear()}
            style={{ backgroundColor: '#eeeeee', color: '#000', marginLeft: '20px', marginRight: '20px', fontSize: 14 }}
        >{Identify.__('Clear')}</FlatButton> : null;

        let { classes } = this.props;

        return (
            <Layout header={this.getMetaHeader()}>
                <div className="app-searchbox">
                    <div className="app-search-text">
                        <TextField
                            className='input-search'
                            style={{ padding: 11, marginTop: 20 }}
                            label={Identify.__('Search Your Product')}
                            fullWidth={true}
                            defaultValue={value}
                            InputLabelProps={{
                                FormLabelClasses: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.cssInput,
                                    underline: classes.cssUnderline
                                }
                            }}
                        />
                    </div>
                    <div style={{ margin: '10px' }}>
                        <FlatButton
                            style={{
                                backgroundColor: configColor.button_background,
                                color: configColor.button_text_color,
                                minWidth: '160px',
                                fontSize: 14,
                                marginLeft: 10
                            }}
                            onClick={() => this.handleSearch()}
                        >{Identify.__('Search')}</FlatButton>
                        {clear}
                        {/* this.renderVoiceSearch() */}
                    </div>
                </div>
            </Layout>
        )
    }
}

SearchPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchPage);