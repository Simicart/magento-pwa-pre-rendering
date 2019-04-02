import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

function IconButtons(props) {
    return (
        <div>
            <IconButton
                {...props}>
                    {props.children}
            </IconButton>
        </div>
    );
}

IconButtons.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default IconButtons;