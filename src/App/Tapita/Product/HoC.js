/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/12/19
 * Time: 1:41 PM
 */
import React from 'react'
import {LazyComponent} from "../../../BaseComponent/Async";

export const ProductOptions = props => <LazyComponent component={()=>import('./Options')} {...props}/>

export const CustomOptions = props => <LazyComponent component={()=>import('./Options/Custom/CustomTablet')} {...props}/>

export const BundleOptions = props => <LazyComponent component={()=>import('./Options/Bundle/BundleTablet')} {...props}/>

export const ConfigurableOptions = props => <LazyComponent component={()=>import('./Options/Configurable/ConfigurableTablet')} {...props}/>

export const DownloadOptions = props => <LazyComponent component={()=>import('./Options/Downloadable/DownloadableTablet')} {...props}/>

export const GroupedOptions = (props)=> <LazyComponent component={()=>import('./Options/Grouped/GroupedTablet')} {...props}/>

