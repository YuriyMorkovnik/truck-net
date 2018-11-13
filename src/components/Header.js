import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    text: {
        color: 'white',
    }
};

class Header extends Component {
    state = { time: new Date() };
    componentDidMount() {
        setInterval(this.tick, 1000)
    }
    tick = () => {
        this.setState({ time: new Date() })
    };
    render() {
        const { classes } = this.props;
        const { time } = this.state;
        return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar className={classes.toolbar}>
                    <h3 className={classes.text}>
                        Testing Task Developer
                    </h3>
                    <h3 className={classes.text}>
                        {`${time.getHours()}:${time.getMinutes()}`}
                    </h3>
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);