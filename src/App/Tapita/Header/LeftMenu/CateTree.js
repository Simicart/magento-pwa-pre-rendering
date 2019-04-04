/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/4/19
 * Time: 9:32 AM
 */
import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import Loading from '../../../../BaseComponent/Loading';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem'
import Slide from '@material-ui/core/Slide';
import SubCate from './SubCate'
import Model from '../../../Core/Category/CategoryModel'
const configColor = Identify.getColorConfig()
const $ = window.$;
class LeftMenuTabCategory extends Abstract {
    constructor(props){
        super(props);
        this.Model = new Model({obj : this});
        this.state = {
            loaded : false,
            data : null,
            treecate : null
        };
        this.cateId = -1;
    }

    getTreeCategory() {
        if(!this.state.treecate){
            this.Model.getTreeCategory();
        }
    }

    componentWillMount(){
        let data = Identify.ApiDataStorage('categorytrees');
        if(data instanceof Object && data.categorytrees instanceof Object){
            this.setState({treecate : data,loaded:true})
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.loaded !== this.state.loaded
    }

    componentDidMount(){
        let obj = this;
        $('.app-bar-menu').click(function () {
            obj.getTreeCategory()
        })
    }

    setData(data){
        this.setState({
            treecate:data,
            loaded : true
        });
    }

    openLocation = (location)=>{
        let browserHistory = this.props.parent.context.router.history;
        browserHistory.push(location);

        this.props.parent.handleCloseMenu();
    };



    renderTreeMenu = (data = this.state.treecate) => {
        if (!this.state.loaded) {
            return (<Loading className="loading" style={{color:configColor.menu_text_color}}/>);
        }
        if (data) {
            let obj = this;
            let categories = data.categorytrees.map(function (item,key) {
                let check_subcate = item.hasOwnProperty('child_cats') && item.child_cats !== null;
                let cate_name = <div className="menu-cate-name-item root-menu" >{Identify.__(item.name)}</div>;
                let location = {
                    pathname: item.url_path !== undefined ? "/" + item.url_path : "/" + item.request_path || "/products?cat=" + item.entity_id,
                    state: {
                        cate_id: item.entity_id,
                        hasChild: item.has_children,
                        name: item.name
                    }
                };
                location = !check_subcate ? location : null;
                return obj.renderMenuItem(key,item,cate_name,location)
            }, this);
            return (
                <div style={{
                    padding: 0,
                    height : window.innerHeight - 120 + 'px',
                    direction : Identify.isRtl() ? 'rtl' : 'ltr'
                }}>
                    <List component="nav">
                        {categories}
                    </List>
                </div>
            )
        }
        return '';
    };

    renderMenuItem = (key,item, cate_name, location) => {
        if(location instanceof Object && location !== null){
            return(
                <ListItem key={key}
                          onClick={()=>this.openLocation(location)}
                          button style={{color:configColor.menu_text_color}}>
                    <ListItemText primary={cate_name} primaryTypographyProps={{style:{color:configColor.menu_text_color}}}/>
                </ListItem>
            )
        }
        return (
            <SubCate cate_name={cate_name}
                     key={key}
                     item={item}
                     parent={this}/>
        )
    }

    componentDidUpdate(){
        if(Identify.isRtl()){
            const $ = window.$;
            $('div.menu-cate-name-item').each(function () {
                let parent = $(this).parent();
                let margin = parent.css('margin-left');
                parent.css({
                    'margin-left' : 0,
                    'margin-right' : margin
                })
            });
        }
    }

    render(){
        return (
            <Slide direction='right' in={this.props.show} mountOnEnter unmountOnExit>
                <div>{this.renderTreeMenu()}</div>
            </Slide>
        )
    }
}
export default LeftMenuTabCategory