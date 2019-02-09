import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
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
  container: {
    position: 'relative',
  },
  suggestList: {
    position: 'absolute',
    zIndex: 10,
  }
};

class SuggestingTextFilter extends Component {
  state = {
    menuIsOpen: false,
  };
  handleInputChange = ({ target: { value } }) => {
    this.setState({ menuIsOpen: Boolean(value) });
    this.props.input.onChange(value);
  };

  handleChange = item => {
    this.setState({ menuIsOpen: false });
    this.props.input.onChange(item);
  };

  onOuterClick = () => {
    this.setState({menuIsOpen: false});
  };


  static getDerivedStateFromProps(props) {
    if(props.suggestList) {
      return {
        suggestList: props.suggestList,
      }
    }
    return null;
  }

  getSuggestions = (str) => {
    return this.props.suggestList.filter(origin => origin.toLowerCase().includes(str.toLowerCase()));
  };

  render() {
    const {
      classes,
      labelName,
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
            getMenuProps,
            isOpen,
            inputValue,
          }) => (
          <div className={classes.container}>
            <TextField
              {...getInputProps()}
              className={classes.root}
              label={labelName}
              value={inputValue}
              onChange={this.handleInputChange}
              type="text"
              variant="outlined"
              fullWidth
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

SuggestingTextFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestList: PropTypes.array,
  labelName: PropTypes.string,
};


export default connectAll({
  styles,
  isField: true,
})(SuggestingTextFilter);