import React from 'react';
import Abstract from '../../Core/Wishlist/WishListAbstract';
import Layout from '../../../Layout'
import ShareIcon from '../../../BaseComponent/Icon/Share';
import Button from '../../../BaseComponent/Button';
import Rate from '../../../BaseComponent/Rate';
import Deleteicon from '../../../BaseComponent/Icon/Trash';
import Price from '../../../BaseComponent/Price';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Identify from '../../../Helper/Identify';
import Link from 'next/link';
import { SubscribeOne } from "unstated-x";
import { AppState } from "../../../Observer/AppState";
import './wishlist.css'

// const $ = window.$;
class Wishlist extends Abstract {
  checkExistData = () => {
    if (this.props.wishlist_data) {
      let data = this.props.wishlist_data;
      if (data && data.wishlistitems.length > 0) {
        return true;
      }
    }
    return false;
  }

  renderShareAllWishlist = (data) => {
    if (data) {
      let shareObj = {
        title: document.title,
        text: sessionStorage.getItem('customer') + ' Wishlist',
        url: data.sharing_url[0],
      };
      let shareButton =
        <div
          onClick={(e) => this.shareAction(e, shareObj)}
          style={{
            color: this.configColor.button_background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            cursor: 'pointer',
          }}
        >
          <ShareIcon color={this.configColor.button_background} />
          <span style={{ marginLeft: 20, marginRight: 20 }}>{Identify.__('Share Wishlist')}</span>
        </div>
      return shareButton
    }
    return <div></div>;
  }

  renderConfirmBlock = (itemId) => {
    confirmAlert({
      title: '',                        // Title dialog
      message: Identify.__('Are you sure you want to delete this product'),        // Message dialog
      buttons: [
        {
          label: Identify.__('Confirm'),
          onClick: () => this.handleDelete(itemId)
        },
        {
          label: Identify.__('Cancel'),
          // onClick: () => alert('Click No')
        }
      ]
    });
  }

  renderWishlist = () => {
    if (!this.state.loaded) {
      this.getApiData()
      return <div>
        <div className="btn-get-data" onClick={() => this.getApiData()}></div>
      </div>
    }
    let data = this.props.wishlist_data || {};
    if (!data.wishlistitems)
      data = Identify.getDataFromStoreage(Identify.SESSION_STOREAGE, 'wishlistitems');
    let listItems = [];
    let renderShareAllWishlist = null;
    // const closeWishlist = (
    //   <div className="close-wishlist-sidebar">
    //     <IconButton style={{ width: 30, height: 30, padding: 2 }} onClick={() => {
    //       if (this.parent && this.parent.wishlistSideBar)
    //         this.parent.wishlistSideBar.handleCloseSideBar()
    //     }}>
    //       <NavigationClose style={{ width: 20 }} />
    //     </IconButton>
    //   </div>
    // )
    if (data === null || !data.hasOwnProperty('wishlistitems') || data.wishlistitems.length === 0) {
      listItems = <div className="empty-wishlist text-center"
        style={{ marginTop: 40, fontWeight: 300 }}>{Identify.__('You have no items in your wish list')}</div>
      return (
        <div className="wishlist-list-tapita">
          {/* {this.state.isPhone ? null :
            closeWishlist} */}
          {listItems}
        </div>
      )
    }
    else {
      listItems = data.wishlistitems.map((item) => {
        let price = item.is_show_price
          ? <Price config={1} type={item.type_id} prices={item.app_prices} />
          : null;

        let btnTextStyle = {
          fontSize: 17,
          whiteSpace: 'nowrap',
          textAlign: 'center'
        };

        let btnStyle = {
          minHeight: 'auto !important',
          width: '160px !important',
        }

        let btnCart = item.stock_status ?
          <Button text={Identify.__('Add To Cart')} textStyle={btnTextStyle} style={btnStyle} onClick={(e) => this.addCartHandle(item)} /> :
          <Button text={Identify.__('Out of stock')} textStyle={btnTextStyle} style={{ ...btnStyle, ...{ background: '#d2d2d2', color: '#fff' } }} />;

        let shareObj = {
          title: item.name,
          text: item.name,
          url: item.product_sharing_url,
        };

        let shareButton = <ShareIcon style={{ width: 22, height: 22 }} />;
        return (
          <div style={{ borderBottom: '1px solid rgba(45, 45, 45, 0.5)', padding: '25px 0' }} key={Identify.makeid()}>
            <div className="wishlist-item " >
              <div
                className="item-img "
                style={{ maxWidth: 120, maxHeight: 120, border: '1px solid #eee', padding: '1px' }}
              // onClick={() => {
              //   if (this.parent && this.parent.wishlistSideBar)
              //     this.parent.wishlistSideBar.handleCloseSideBar()
              // }}>
              >
                <Link href={`/product/${item.product_id}`}>
                  <img src={item.product_image} alt={item.name}
                    style={{ width: 120, height: 120 }} />
                </Link>
              </div>
              <div className="item-decs ">
                <div className="item-name" style={{ width: '90%' }}>{item.name}</div>
                <div className="item-rate"><Rate rate={0} size={this.state.isPhone ? 15 : 20} /></div>
                <div className="item-price">
                  {price}
                </div>
                <div className="item-btn">
                  {btnCart}
                </div>
              </div>
              <div className="item-action ">
                <div className="share" onClick={(e) => {
                  this.shareAction(e, shareObj)
                }}>
                  {shareButton}
                </div>
                {!this.wishlist_code &&
                  <div className="clear" onClick={(e) => this.renderConfirmBlock(item.wishlist_item_id)} style={{ height: 36 }}>
                    <Deleteicon style={{ width: 22, height: 22 }} />
                  </div>
                }
              </div>

            </div>
          </div>

        )
      })
      renderShareAllWishlist = this.renderShareAllWishlist(data);
    }

    return (
      <div className="wishlist-list-tapita">
        {/* {!this.state.isPhone ? closeWishlist : null} */}
        <div className="wishlist-sidebar-content">
          {this.state.isPhone ? null : <div className="wishlist-title">{Identify.__('Wishlist').toUpperCase()}</div>}
          <div className="wishlist-items-tablet ">
            {listItems}
          </div>
        </div>
        <div className="share-all-wishlist">
          {renderShareAllWishlist}
        </div>
      </div>
    );
  }

  render() {
    if (this.parent && !this.state.loaded) {
      return <div>
        <div className="btn-get-data" onClick={() => this.getApiData()}></div>
      </div>
    }
    return <Layout>{this.renderWishlist()}</Layout>
  }
}

const WishlistPage = props => (
  <SubscribeOne to={AppState} bind={['wishlist_data']}>
    {app => <Wishlist wishlist_data={app.state.wishlist_data}
      updateCart={(data) => app.updateCart(data)}
      updateWishlist={(data) => app.updateWishlist(data)}
      {...props} />}
  </SubscribeOne>
)

export default WishlistPage;