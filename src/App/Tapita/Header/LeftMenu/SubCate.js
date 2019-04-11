/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 9/28/18
 * Time: 10:47 AM
 */
import React from 'react'
import Abstract from '../../../Core/BaseAbstract'
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Identify from "../../../../Helper/Identify";
import Loading from '../../../../BaseComponent/Loading/ReactLoading'
const configColor = Identify.getColorConfig()
class SubCate extends Abstract{
    state = { open: false };

    handleToggleMenu = (id) => {
        const $ = window.$;
        let cate = $('.cate-'+id);
        $('.sub-cate-'+id).slideToggle('fast');
        cate.find('.cate-icon').toggleClass('hidden')
        if(!this.state.open)
            this.setState(state => ({ open: !state.open }));
        /*
        if(!this.state.open){
            let obj = this;
            setTimeout(()=>{
                obj.setState({open:true})
            },1000)
        }
        */
    };

    handleMenuLocation = url => {
        const $ = window.$;
        this.pushLink(url)
        $('.left-menu-tapita .overlay-sidebar').click()
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.open !== this.state.open
    }

    renderSubMenu = (item)=>{
        let sub_cate= [];
        if(item){
            if(item.child_cats !== null){
                let obj = this;
                let url_path = (item.url_path && item.url_path!=='/') ? "/" + item.url_path : "/" + item.request_path || "/products?cat=" + item.entity_id
                Identify.setUrlMatchApi(url_path,'category',{id:item.entity_id,hasChild:!!item.child_cats,name : item.name})
                let all_products = this.renderMenuItem(<div className="menu-cate-name-item" >{Identify.__('All Products')}</div>,url_path);
                sub_cate = item.child_cats.map(function (item,key) {
                    let check_subcate = item.hasOwnProperty('child_cats') && item.child_cats !== null;
                    let cate_name = <div className="menu-cate-name-item" >{Identify.__(item.name)}</div>;
                    let urlPath = (item.url_path && item.url_path!=='/') ? "/" + item.url_path : "/" + item.request_path || "/products?cat=" + item.entity_id
                    urlPath = !check_subcate ? urlPath : null;
                    Identify.setUrlMatchApi(
                        urlPath,'category',
                        {id: item.entity_id,
                        hasChild: !!item.has_children,
                        name: item.name})
                    return !check_subcate ? obj.renderMenuItem(cate_name,urlPath) : <SubCate key={key} item={item} cate_name={cate_name}/>;
                });
                sub_cate.unshift(all_products)
            }
        }
        return <div style={{marginLeft: 15}}>{sub_cate}</div>
    };

    renderMenuItem = (cate_name,location) => {
        return(
            <ListItem key={Identify.makeid()} button style={{color:configColor.menu_text_color}} onClick={()=>this.handleMenuLocation(location)}>
                <ListItemText primary={cate_name} primaryTypographyProps={{style:{color:configColor.menu_text_color}}}/>
            </ListItem>
        )
    }

    renderCate = ()=>{
        const {cate_name,item} = this.props
        let sub_cate = null;
        if(item instanceof Object && item.child_cats instanceof Array && item.child_cats.length > 0){
            sub_cate = (
                <List className={`sub-cate-${item.entity_id}`} component="div" disablePadding style={{display:'none'}}>
                    {!this.state.open ?
                        <Loading divStyle={{marginTop:0}}/> :this.renderSubMenu(this.props.item)
                    }
                </List>
            )
        }
        return(
            <div>
                <ListItem className={`cate-${item.entity_id}`} button style={{color:configColor.menu_text_color}} onClick={()=>this.handleToggleMenu(item.entity_id)}>
                    <ListItemText primary={cate_name} primaryTypographyProps={{style:{color:configColor.menu_text_color}}}/>
                    <ExpandLess className={`cate-icon hidden`}/>
                    <ExpandMore className={`cate-icon`}/>
                </ListItem>
                {sub_cate}
            </div>

        )
    }

    render(){
        return this.renderCate()
    }
}
export default SubCate