import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

import TruckList from '../components/TruckList';
import {
  parseData,
  connectAll,
  filterRidesList,
  selectOrigins,
  selectDestination,
} from '../utils';
import * as ridesActions from '../actions/rides';

import FilterBar from '../components/FilterBar';
import TwoColumns from '../components/TwoColumns';

import Page from './Page';



class Rides extends Component {

  componentDidMount() {
    const { change, fetchRides, fetchVehicleTypes } = this.props;
    fetchRides();
    fetchVehicleTypes();
  }

  componentDidUpdate(prevProps) {
    const {
      change,
      originFilter,
      vehicleFilter,
      destinationFilter,
      durationPredicate,
      originalRidesList,
    } = this.props;
    if (prevProps.originalRidesList.isFetching && !originalRidesList.isFetching) {
      change('ridesList', originalRidesList.data);
      change('originList', selectOrigins(originalRidesList.data));
      change('destinationList', selectDestination(originalRidesList.data))
    }
    if (
      originFilter !== prevProps.originFilter
      || vehicleFilter !== prevProps.vehicleFilter
      || destinationFilter !== prevProps.destinationFilter
      || durationPredicate.id !== prevProps.durationPredicate.id
    ) {
      change('currentItem', null);
      change('ridesList', filterRidesList({
        ridesList: originalRidesList.data,
        originFilter,
        vehicleFilter,
        destinationFilter,
        durationPredicate
      }))
    }
  }

  render() {
    const { ridesList, vehicleFilter, vehicleTypes } = this.props;
    if (!ridesList) return null;
    return (
      <Page>
        <FilterBar
          vehicleTypes={vehicleTypes}
          vehicleFilter={vehicleFilter}
        />
        <TwoColumns
          leftColumn={
            <TruckList
              name="currentItem"
              ridesList={ridesList}
              // vehicleTypes={data.vehicleTypes}
            />
          }
        />
      </Page>
    )
  }
}

const mapStateToProps = state => {
  const formSelector = formValueSelector('truckList');
  return {
    originalRidesList: state.rides.ridesList,
    vehicleTypes: state.rides.vehicleTypes,
    currentItem: formSelector(state, 'currentItem'),
    ridesList: formSelector(state, 'ridesList'),
    originFilter: formSelector(state, 'originFilter'),
    vehicleFilter: formSelector(state, 'vehicleFilter'),
    destinationFilter: formSelector(state, 'destinationFilter'),
    durationPredicate: formSelector(state, 'durationFilter'),

  }
};

const mapDispatchToProps = {
  ...ridesActions,
};

const formConfig = {
  form: 'truckList',
  initialValues: {
    ridesList: null,
    originList: null,
    destinationList: null,
    currentItem: null,
    originFilter: '',
    vehicleFilter: '',
    destinationFilter: '',
    durationFilter: {},
  }
};

export default connectAll({
  mapDispatchToProps,
  mapStateToProps,
  formConfig,
})(Rides);