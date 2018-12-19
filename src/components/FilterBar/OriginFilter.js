import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form'

import { connectAll } from "../../utils";

import SuggestingTextFilter from './SuggestingTextFilter';


class OriginFilter extends Component {
  render() {
    return (
      <SuggestingTextFilter
        name="originFilter"
        labelName="Origin"
        suggestList={this.props.origins}
      />
    )
  }
}

OriginFilter.propTypes = {
  origins: PropTypes.array,
};

const mapStateToProps = state => {
  const formSelector = formValueSelector('truckList');
  return {
    origins: formSelector(state, 'originList'),
  }
};

export default connectAll({
  mapStateToProps,
})(OriginFilter);