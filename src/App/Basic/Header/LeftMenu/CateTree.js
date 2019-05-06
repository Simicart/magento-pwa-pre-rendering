import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import CateIcon from '@material-ui/icons/ClearAll'
import CategoryCollectionModel from '../../../Core/Category/CategoryModel';
import Loading from "../../../../BaseComponent/Loading/ReactLoading";
import List from "../../../../BaseComponent/MuiList";
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem'
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SubCate from './SubCate'

const configColor = Identify.getColorConfig();

class CateTree extends Abstract {

    constructor(props){
        super(props);
        this.modelCollection = new CategoryCollectionModel({obj : this});
        this.state = {
            treecate : null,
            loaded : false,
            open:false,
        }
        this.parent = this.props.parent;
    }

    componentWillMount(){
        let treecate = Identify.ApiDataStorage('categorytrees');
        if(treecate instanceof Object){
            this.setState({treecate,loaded:true})
        }
    }

    getTreeCategory() {
        if(!this.state.treecate){
            this.modelCollection.getTreeCategory();
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.loaded !== this.state.loaded
    }

    setData(data){
        if (data.errors) {
            let errors = data.errors;
            let text = "";
            for (let i in errors) {
                let error = errors[i];
                text += error.message + ' ';
            }
            if (text === "") {
                text = Identify.__('Something went wrong')
            }
            Identify.showToastMessage(text);
        }else{
            this.setState({
                treecate:data,
                loaded : true
            });
        }

    }

    openLocation = (location)=>{
        this.parent.handleMenuItem(location);
    }

    renderTitleMenu = (title)=>{
        return (
            <div className="menu-cate-name-item"
                 style={{color:configColor.menu_text_color}}>{Identify.__(title)}</div>
        )
    }

    renderTreeMenu = (data = this.state.treecate) => {
        if (!this.state.loaded) {
            return (<Loading divStyle={{marginTop:0}}/>);
        }
        if (data) {
            let obj =this;
            let categories = data.categorytrees.map(function (item,key) {
                let cate_name = <div className="root-menu" >{obj.renderTitleMenu(item.name)}</div>;
                let location = {
                    pathname: item.url_path !== undefined ? "/" + item.url_path : "/" + item.request_path || "/products?cat=" + item.entity_id,
                    state: {
                        cate_id: item.entity_id,
                        hasChild: item.has_children,
                        name: item.name
                    }
                };
                location = !item.child_cats ? location : null;
                return !item.child_cats  ?
                    obj.renderMenuItem(cate_name, location) : <SubCate key={key}
                                                                       cate_name={cate_name}
                                                                       item={item} parent={this}/>;
            }, this);
            return (
                <div style={{
                    padding: 0,
                    direction : Identify.isRtl() ? 'rtl' : 'ltr',
                }}>
                    <List>
                        {categories}
                    </List>
                    {this.renderJs()}
                </div>
            )
        }
        return '';
    };

    renderMenuItem = (cate_name,location) => {
        return(
            <ListItem key={Identify.makeid()} button style={{color:configColor.menu_text_color}} onClick={()=>this.handleMenuLocation(location)}>
                <ListItemText primary={cate_name} primaryTypographyProps={{style:{color:configColor.menu_text_color}}}/>
            </ListItem>
        )
    }

    handleToggleMenu = (id) => {
        const $ = window.$;
        let cate = $('.cate-'+id);
        $('.sub-cate-'+id).slideToggle('fast');
        cate.find('.cate-icon').toggleClass('hidden')
        // this.setState(state => ({ open: !state.open }));
        if(!this.state.loaded){
            this.getTreeCategory()
        }
    };

    handleMenuLocation = location => {
        const $ = window.$;
        this.pushLink(location)
        $('.left-menu-base .overlay-sidebar').click()
    }

    renderJs = ()=>{
        const $ = window.$;
        $(function () {
            if(Identify.isRtl()){
                $('div.menu-cate-name-item').each(function () {
                    let parent = $(this).parent();
                    let margin = parent.css('margin-left');
                    parent.css({
                        'margin-left' : 0,
                        'margin-right' : margin
                    })
                });
            }
        })
    }

    render(){
        let primarytext = (
            <div className="menu-content" id="cate-tree">
                <div className="icon-menu">
                    <CateIcon style={{fill:configColor.menu_icon_color}}/>
                </div>
                <div className={`menu-title`}
                     style={{color:configColor.menu_text_color}}>
                    {Identify.__('Categories')}</div>
            </div>
        )
        return <div >
            <ListItem className={`cate-root`} button
                      onClick={()=>this.handleToggleMenu('root')}
                      style={{color:configColor.menu_text_color}}>
                <ListItemText primary={primarytext} primaryTypographyProps={{style:{color:configColor.menu_text_color}}}/>
                <ExpandLess className={`cate-icon hidden`}/>
                <ExpandMore className={`cate-icon`}/>
            </ListItem>
            <div className="sub-cate-root" style={{display:'none'}}>
                {this.renderTreeMenu()}
            </div>
        </div>
    }
}

export default CateTree