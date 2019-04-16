/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 4/12/19
 * Time: 1:41 PM
 */
import React from 'react'
import {Dynamic} from "../../../BaseComponent/Async";

export const ProductOptions = props => <Dynamic component={()=>import('./Options')} {...props}/>

export const CustomOptions = props => <Dynamic component={()=>import('./Options/Custom/CustomTablet')} {...props}/>

export const BundleOptions = props => <Dynamic component={()=>import('./Options/Bundle/BundleTablet')} {...props}/>

export const ConfigurableOptions = props => <Dynamic component={()=>import('./Options/Configurable/ConfigurableTablet')} {...props}/>

export const DownloadOptions = props => <Dynamic component={()=>import('./Options/Downloadable/DownloadableTablet')} {...props}/>

export const GroupedOptions = (props)=> <Dynamic component={()=>import('./Options/Grouped/GroupedTablet')} {...props}/>

