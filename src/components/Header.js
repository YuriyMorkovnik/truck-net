import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import AuthModal from './Modals/Auth/index';

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
  button: {
    textDecoration: 'none',
    margin: '0px 16px'
  }
};

class Header extends Component {
  state = { open: false };
  switchAuthModal = () => this.setState(({ open }) => ({ open: !open }));
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AuthModal open={this.state.open} onClose={this.switchAuthModal} />
        <AppBar position="static" color="primary">
          <Toolbar className={classes.toolbar}>
            <div>
              <Link to="/rides/" className={classes.button}>
                <Button variant="outlined" color="secondary" >
                  Rides
                </Button>
              </Link>
              <Link to="/rides/create" className={classes.button}>
                <Button variant="outlined" color="secondary" >
                  Create
                </Button>
              </Link>
            </div>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={this.switchAuthModal}
            >
              Sign up
            </Button>
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
