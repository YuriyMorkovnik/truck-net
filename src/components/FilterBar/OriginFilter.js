import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { formValueSelector } from 'redux-form'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { connectAll } from "../../utils";


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  select: {
    maxWidth: '240px',
  },
  container: {
    position: 'relative',
  },
  suggestList: {
    position: 'absolute',
    // left: 0,
    // right: 0,
    zIndex: 10,
  }
};

class OriginFilter extends Component {
  state = {
    origins: null,
    menuIsOpen: false,
  };
  handleInputChange = ({ target: { value } }) => {
    this.setState({ menuIsOpen: Boolean(value) });
    this.props.input.onChange(value);
  };

  handleChange = item => {
    console.log('chpok');
    this.setState({ menuIsOpen: false });
    this.props.input.onChange(item);
  };

  onOuterClick = () => {
    this.setState({menuIsOpen: false});
  };


  static getDerivedStateFromProps(props) {
    if(props.origins) {
      return {
        origins: props.origins,
      }
    }
    return null;
  }

  getSuggestions = (str) => {
    return this.props.origins.filter(origin => origin.toLowerCase().includes(str.toLowerCase()));
  };

  render() {
    const {
      classes,
      input: { value }
    } = this.props;
    return (
      <Downshift
        inputValue={value}
        isOpen={this.state.menuIsOpen}
        onOuterClick={this.onOuterClick}
        onChange={this.handleChange}
      >
        {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
          }) => (
          <div className={classes.container}>
            <TextField
              {...getInputProps()}
              className={classes.root}
              id="outlined-select-currency"
              label="Origin"
              value={inputValue}
              onChange={this.handleInputChange}
              variant="outlined"
            />
            {
              isOpen ? (
                <Paper
                  className={classes.suggestList}
                  {...getMenuProps()}
                  square
                >
                  {this.getSuggestions(inputValue).map((item, index) => (
                    <MenuItem key={item} {...getItemProps({ item, index })}>{item}</MenuItem>
                  ))}
                </Paper>
              ) : null
            }
          </div>
        )}

      </Downshift>

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