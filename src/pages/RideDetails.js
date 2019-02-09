import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

import { connectAll, parseData } from '../utils';
import * as rideActions from '../actions/rides';

import CardInfo from '../components/CardInfo';
import TwoColumns from '../components/TwoColumns';
import Spinner from '../components/Spinner';

import Page from './Page';

// const dataAsJson = require('../data');
// const data = parseData(dataAsJson);




class RideDetails extends Component{
  componentDidMount() {
    const {
      fetchRideById,
      match: { params: { id } },
    } = this.props;
    console.log('this.props', this.props)
    fetchRideById(id);
  }

  render() {
    const { rideStruct } = this.props;
    if (rideStruct.isFetching || !rideStruct.data) return <Spinner/>;
    if (rideStruct.error) return null;
    return (
      <Page>
        <TwoColumns
          leftColumn={<CardInfo data={rideStruct.data} />}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    rideStruct: state.rides.ride,
  }
};

const mapDispatchToProps = {
  ...rideActions,
};

export default connectAll({
  mapStateToProps,
  withRouterProps: true,
  mapDispatchToProps,
})(RideDetails);