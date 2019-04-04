import React from 'react';
import Abstract from '../../../Core/BaseAbstract';
import Identify from '../../../../Helper/Identify';
import Check from '../../../../BaseComponent/Icon/SingleSelect';
import ListItem from '../../../../BaseComponent/MuiListItem/Text';
import ListItemNested from '../../../../BaseComponent/MuiListItem/Nested';
import Model from '../../../../Model'
const configColor = Identify.getColorConfig()
class Storeview extends Abstract {

    constructor(props) {
        super(props);
        this.checkStore = false;
        this.Model = new Model({obj:this})
        this.state = {loaded: true};
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.state.loaded !== nextState.loaded;
    }

    selectedStore(store) {
        if (typeof(Storage) !== "undefined") {
            let appSettings = Identify.getAppSettings();
            if (store.store_id !== appSettings.store_id) {
                appSettings.store_id = store.store_id;
                Identify.storeAppSettings(appSettings);
                Identify.showLoading();
                this.changeStore = true;
                this.Model.connectWithUrl('/change-storeview/'+store.store_id)
            }
        }
    }

    processData(data){
        Identify.setMerchantConfig(data);
    }

    renderItem() {
        if (typeof(Storage) !== "undefined") {
            const merchantConfigs = Identify.getMerchantConfig();
            const storeList = merchantConfigs.storeview.stores.stores;
            const appSettings = Identify.getAppSettings();
            const selectedStore = storeList.filter((item) => {
                return item.group_id === appSettings.group_id;
            })[0];
            const storeViews = selectedStore.storeviews.storeviews;
            if (storeViews.length > 1) {
                this.checkStore = true;
                return(
                    <div style={{marginLeft: 15}}>
                        <ListItemNested
                            primarytext={<span className="cms-menu-text">{Identify.__('Language')}</span>}
                            className={this.props.className}
                        >
                            {this.renderSubItem()}
                        </ListItemNested>
                    </div>
                )
            }
        }
        return false;
    }

    renderSubItem() {
        if(!this.checkStore) return;
        let storesRender = [];
        const merchantConfigs = Identify.getMerchantConfig();
        const storeList = merchantConfigs.storeview.stores.stores || null;
        const appSettings = Identify.getAppSettings();
        const storeSelected = storeList.filter((store) => {
            return (
                store.group_id === appSettings.group_id
            );
        })[0] || null;
        if (storeSelected !== null) {
            storesRender = storeSelected.storeviews.storeviews.map((store) => {
                if(parseInt(store.is_active,10) !== 1 ) return null;
                let isSelected = store.store_id === appSettings.store_id ? 
                    <Check color={configColor.button_background}/> : 
                    <span className="not-selected" style={{borderColor : configColor.menu_text_color}}/>;
                let storeItem =  <div className="store-item">
                                    <div className="selected">
                                        {isSelected}
                                    </div>
                                    <div className="store-name">
                                        {store.name}
                                    </div>
                                </div>;
                return (
                    <div key={Identify.makeid()}
                         style={{marginLeft: 30}}
                         onClick={() => this.selectedStore(store)}>
                        <ListItem primarytext={storeItem}
                                  className={this.props.className}
                        />
                    </div>
                );
            }, this);

            return storesRender;
        }
    }

    render(){
        if (!this.state.loaded)
            return <Loading />
        return this.renderItem()
    }
}
export default Storeview