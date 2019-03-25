import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

import {
  connectAll,
  filterRidesList,
  selectOrigins,
  selectDestination,
  selectRideByStatus,
  RIDE_STATUSES,
} from '../utils';
import * as ridesActions from '../actions/rides';

import FilterBar from '../components/FilterBar';
import Spinner from '../components/Spinner';
import RidesField from '../components/RidesField';

import Page from './Page';




class Rides extends Component {

  componentDidMount() {
    const { fetchRides, fetchVehicleTypes } = this.props;
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
      changeRideStruct,
    } = this.props;
    if (prevProps.originalRidesList.isFetching && !originalRidesList.isFetching) {
      change('ridesList', selectRideByStatus({
        rides: originalRidesList.data,
        rideStatus: RIDE_STATUSES.active ,
      }));
      change('finishedRidesList', selectRideByStatus({
        rides: originalRidesList.data,
        rideStatus: RIDE_STATUSES.finished,
      }));

      change('originList', selectOrigins(originalRidesList.data));
      change('destinationList', selectDestination(originalRidesList.data))
    }

    if (
      prevProps.changeRideStruct
      && prevProps.changeRideStruct.isFetching
      && !changeRideStruct.isFetching
      && !changeRideStruct.error
    ) {
      change('changedRides', []);
    }

    if (
      originFilter !== prevProps.originFilter
      || vehicleFilter !== prevProps.vehicleFilter
      || destinationFilter !== prevProps.destinationFilter
      || durationPredicate.id !== prevProps.durationPredicate.id
    ) {
      // TO DO доделать логику сбрасывания фильтера и облегчить логику экшнов
      const originalActiveRides = selectRideByStatus({
        rides: originalRidesList.data,
        rideStatus: RIDE_STATUSES.active ,
      });
      const originalFinishedRides = selectRideByStatus({
        rides: originalRidesList.data,
        rideStatus: RIDE_STATUSES.finished,
      });
      change('ridesList', filterRidesList({
        ridesList: originalActiveRides,
        originFilter,
        vehicleFilter,
        destinationFilter,
        durationPredicate
      }));
      change('finishedRidesList', filterRidesList({
        ridesList: originalFinishedRides,
        originFilter,
        vehicleFilter,
        destinationFilter,
        durationPredicate
      }))
    }
  }

  changeRideStatus = (itemForChange, newStatus) => ({ ...itemForChange, status: newStatus });

  updateLists(itemForChange, newStatus) {
    const { change } = this.props;
    if (!itemForChange) return;

    const changedRide = this.changeRideStatus(itemForChange, newStatus);
    this.addToChangedRides(changedRide);

    switch (newStatus) {
      case RIDE_STATUSES.finished: {

        change('finishedRidesList', prevState => [...prevState, changedRide]);
        change('ridesList', prevState => prevState.filter(item => item._id !== changedRide._id));
        return;
      }
      case RIDE_STATUSES.active: {

        change('ridesList', (prevState) => [...prevState, changedRide]);
        change('finishedRidesList', prevState => prevState.filter(item => item._id !== changedRide._id));
        return;
      }
      default: return;
    }
  }

  addToChangedRides(ride) {
    this.props.change('changedRides', prevList =>
      [...prevList.filter(item => item._id !== ride._id), ride]);
  }

  onDropOnFinishedRide = (e) => {
    const activeRide = JSON.parse(e.dataTransfer.getData('text'));
    if(activeRide.status === RIDE_STATUSES.finished) return;

    this.updateLists(activeRide, RIDE_STATUSES.finished);
  };

  onDropActiveRides = (e) => {
    const finishedRide = JSON.parse(e.dataTransfer.getData('text'));
    if(finishedRide.status === RIDE_STATUSES.active) return;

    this.updateLists(finishedRide, RIDE_STATUSES.active);
  };

  onChangeStatus = () => {
    const { changeStatus, changedRides } = this.props;
    changeStatus(changedRides.map(({ _id, status }) => ({ _id, status })));
  };

  render() {
    const {
      ridesList,
      finishedRidesList,
      vehicleFilter,
      vehicleTypes,
      originalRidesList,
      changeRideStruct,
    } = this.props;
    if (originalRidesList.isFetching) return <Spinner/>;
    if (!ridesList || !finishedRidesList) return null;
    return (
      <Page>
        <FilterBar
          vehicleTypes={vehicleTypes}
          vehicleFilter={vehicleFilter}
        />
        <RidesField
          name="changedRides"
          onClick={this.onChangeStatus}
          onDropActiveRides={this.onDropActiveRides}
          onDropOnFinishedRide={this.onDropOnFinishedRide}
          ridesList={ridesList}
          isFetching={changeRideStruct && changeRideStruct.isFetching}
          finishedRidesList={finishedRidesList}
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
    activeRide: formSelector(state, 'activeRide'),
    finishedRide: formSelector(state, 'finishedRide'),
    ridesList: formSelector(state, 'ridesList'),
    finishedRidesList: formSelector(state, 'finishedRidesList'),
    originFilter: formSelector(state, 'originFilter'),
    vehicleFilter: formSelector(state, 'vehicleFilter'),
    destinationFilter: formSelector(state, 'destinationFilter'),
    durationPredicate: formSelector(state, 'durationFilter'),
    changedRides: formSelector(state, 'changedRides'),
    changeRideStruct: state.rides.changeRide,
  }
};

const mapDispatchToProps = {
  ...ridesActions,
};

const formConfig = {
  form: 'truckList',
  initialValues: {
    ridesList: [],
    originList: null,
    finishedRidesList: [],
    destinationList: null,
    activeRide: [],
    finishedRide: [],
    originFilter: '',
    vehicleFilter: '',
    destinationFilter: '',
    durationFilter: {},
    changedRides: [],
  }
};

export default connectAll({
  mapDispatchToProps,
  mapStateToProps,
  formConfig,
})(Rides);