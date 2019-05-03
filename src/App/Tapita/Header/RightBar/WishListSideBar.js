import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
// import SideBar from '../../../../BaseComponent/SideBar';
import NavigationClose from '../../../../BaseComponent/Icon/Close';
import 'react-confirm-alert/src/react-confirm-alert.css';
import WishlistModel from '../../../Core/Wishlist/Model';
import SidebarApp from '../../../../BaseComponent/SideBar/SidebarApp';
import {WishlistHoC} from '../../Wishlist/HoC';
import CustomerHelper from '../../../../Helper/Customer'
import dynamic from "next/dynamic";
import {Dynamic} from "../../../../BaseComponent/Async";


const SideBar = props => <Dynamic component={()=>import('../../../../BaseComponent/SideBar')} {...props}/>

class WishLishSideBar extends Abstract {
    constructor(props){
        super(props);
        let isPhone = this.state.isPhone;
        this.state = {
            data : null,
            loaded : false,
            isPhone
        }
        // this.supportNavigatorShare = window.navigator.share !== undefined || false;
        this.addCart = false;
        this.removeItem = false;
        this.wishlistModel = new WishlistModel({obj : this});
    }
    
    componentDidMount(){
        this.setState({loaded: true});
        console.log(this)
    }

    render(){
        if(CustomerHelper.isLogin()){
            if(this.state.isPhone){
                return (
                    <SidebarApp
                        ref={(wishlist)=> this.wishlistSideBar = wishlist}
                        SideBarClass='wishlist-sidebar'
                        contentStyle={{background : '#fff',opacity : 1}}
                        renderView={<WishlistHoC sidebarParent={this} sidebarPhone={true}/>}
                        width={window.innerWidth}
                        CloseIcon={<NavigationClose style={{width: 18, height: 18, cursor: 'pointer'}}/>}
                        title={Identify.__('Wishlist').toUpperCase()}
                        showConfig='right'
                        classToggleSideBar='.wishlist-icon-app-bar'
                    />
                )
            } 
            return (
                <SideBar
                    ref={(wishlist)=> this.wishlistSideBar = wishlist}
                    SideBarClass="wishlist-sidebar"
                    contentStyle={{background : '#fff',opacity : 1}}
                    renderView={<WishlistHoC sidebarParent={this} sidebar={true}/>}
                    showConfig='right'
                    width={0.6*window.innerWidth}
                    classToggleSideBar='.wishlist-icon-app-bar'
                />
            )

        } else return null;
    }
}

export default WishLishSideBar;