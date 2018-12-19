import React, {Component, Fragment} from 'react';
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


const mapStateToProps = state => {
  const formSelector = formValueSelector('truckList');
  return {
    origins: formSelector(state, 'originList'),
  }
};

export default connectAll({
  mapStateToProps,
})(OriginFilter);