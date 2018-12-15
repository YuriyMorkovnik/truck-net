import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { connectAll } from "../../utils";


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  select: {
    maxWidth: '240px',
  },
};

class OriginFilter extends Component {
  state = {
    origins: null,
  };
  handleChange = ({ target: { value } }) => {
    this.props.input.onChange(value);
  };
  static getDerivedStateFromProps(props) {
    if(props.origins) {
      return {
        origins: props.origins,
      }
    }
    return null;
  }

  render() {
    const {
      classes,
      origins,
      input: { value }
    } = this.props;
    return (
      <TextField
        className={classes.root}
        id="outlined-select-currency"
        label="Origin"
        value={value}
        onChange={this.handleChange}
        variant="outlined"
      >
        {origins.map(item => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </TextField>
    )
  }
}

OriginFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const formSelector = formValueSelector('truckList');
  return {
    origins: formSelector(state, 'originList'),
  }
};

export default connectAll({
  styles,
  isField: true,
  mapStateToProps,
})(OriginFilter);