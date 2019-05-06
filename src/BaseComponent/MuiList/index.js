import React from 'react';
import List from '@material-ui/core/List';

function MuiList(props) {
    return (
        <List component="nav"
              {...props}>
            {props.children}
        </List>
    );
}

export default MuiList;