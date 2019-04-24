import React from 'react';
import Base from '../../App/Core/BaseAbstract'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import './style.scss';
import CloseIcon from '../../BaseComponent/Icon/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '../IconButton'
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Identify from "../../Helper/Identify";

const configColor = Identify.getColorConfig()
const styles = {
    appBar: {
        position: 'relative',
        color:configColor.key_color
    },
    flex: {
        flex: 1,
    },
};

class SimiDialog extends Base {
    constructor(props) {
        super(props);
        this.Transition = this.Transition.bind(this)
    }

    Transition = (props) => {
        return <Slide direction={this.props.transition} {...props} />;
    };

    renderToolbar = () => {
        const {classes} = this.props;
        return (
            <AppBar classes={{root:classes.appBar}}>
                <Toolbar>
                    <IconButton onClick={this.props.onRequestClose} aria-label="Close">
                        <CloseIcon style={{fill:configColor.button_text_color,width:20,height:20}}/>
                    </IconButton>
                    <Typography variant="h6" classes={{root:classes.flex}}>
                        <div className="full-dialog-title" style={{color:configColor.button_text_color}}>{this.props.title}</div>
                    </Typography>
                    {this.props.topRightAction}
                </Toolbar>
            </AppBar>
        );
    };

    render = () => {
        let classObj = {paper: 'simi-dialog-paper'};
        classObj = {...classObj, ...this.props.class};
        return (
            <Dialog
                fullScreen={this.props.fullScreen}
                open={this.props.open}
                onClose={this.props.onRequestClose}
                TransitionComponent={this.Transition}
                classes={classObj}
                className={this.props.className}
                aria-labelledby={this.props.id + "-title"}
            >
                {this.props.title !== '' && this.props.fullScreen !== true && (
                    <DialogTitle id={this.props.id + "-title"}
                                 className={`simi-dialog-header`}>
                        <div className="dialog-title">{this.props.title}</div>
                    </DialogTitle>
                )}

                {this.props.fullScreen && (
                    this.renderToolbar()
                )}

                <DialogContent style={this.props.styleContent}>
                    {this.props.dialogContent}
                </DialogContent>
                {this.props.title !== '' && (
                    <DialogActions id={this.props.id+'-footer'}>{this.props.dialogActions}</DialogActions>
                )}
            </Dialog>
        );
    }
};
SimiDialog.defaultProps = {
    onRequestClose: function () {},
    open: false,
    fullScreen: false,
    id: 'simi-dialog',
    className: 'simi-dialog',
    title: '',
    dialogActions: <span></span>,
    transition: 'up',
    class:{},
    topRightAction:<span></span>,
    styleContent : {}
};
SimiDialog.propTypes = {
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    fullScreen: PropTypes.bool,
    id: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    dialogContent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ]),
    dialogActions: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ]),
    transition: PropTypes.string,
    className: PropTypes.string,
    class: PropTypes.object,
    styleContent : PropTypes.object,
    topRightAction: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ])
};

export default withStyles(styles)(SimiDialog);
