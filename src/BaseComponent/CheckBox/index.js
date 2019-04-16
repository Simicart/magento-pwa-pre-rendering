import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { ColorConfig } from "../../../static/config";
import { withStyles } from '@material-ui/core/styles';
const styles = {
    root: {
        color:'#333',
        '&$checked': {
            color: ColorConfig.button_background,
        },
    },
    checked: {},
}
const CheckBox = (props)=>{
    return <Checkbox
        classes={{
            root: props.classes.root,
            checked: props.classes.checked,
        }}
        {...props}
    />
}
export default withStyles(styles)(CheckBox)