import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form'

import { connectAll } from "../../utils";

import SuggestingTextFilter from './SuggestingTextFilter';


class DestinationFilter extends Component {
  render() {
    return (
      <SuggestingTextFilter
        name="destinationFilter"
        labelName="Destination"
        suggestList={this.props.destinations}
      />
    )
  }
}

DestinationFilter.propTypes = {
  destinations: PropTypes.array,
};

const mapStateToProps = state => {
  const formSelector = formValueSelector('truckList');
  return {
    destinations: formSelector(state, 'destinationList'),
  }
};

export default connectAll({
  mapStateToProps,
})(DestinationFilter);