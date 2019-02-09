import React, { Fragment, Component } from 'react';
import { formValueSelector } from 'redux-form';
import Button from '@material-ui/core/Button';


import * as rideActions from '../../actions/rides';
import { connectAll } from '../../utils';

import TwoColumns from '../../components/TwoColumns';
import TextField from '../../components/TextField';

import VehicleField from './VehicleField';
import TravelTimeField from './TravelTimeField';


class CreateRideForm extends Component {
  componentDidUpdate(prevProps) {
    const { createRideStruct, history } = this.props;
    if (
      prevProps.createRideStruct.isFetching
        && !createRideStruct.isFetching
        && !createRideStruct.error
    ) {
      history.push(`/rides/${createRideStruct.data._id}`)
    }
  }
  handleCreateRide = () => {
    const {
      createRide,
      originName,
      destinationName,
      driver,
      vehicleTypeId,
      travelTime,
    } = this.props;
    createRide({
      originName,
      destinationName,
      driver,
      vehicleTypeId,
      travelTime,
    })
  };
  render() {
    const {
      createRideStruct: { isFetching },
    } = this.props;
    return (

      <TwoColumns
        leftColumn={
          <Fragment>
            <TextField name="originName" label="Origin name" />
            <TextField name="destinationName" label="Destination name"/>
            <TextField name="driver" label="Driver name"/>
          </Fragment>
        }
        rightColumn={
          <Fragment>
            <VehicleField name="vehicleTypeId"/>
            <TravelTimeField name="travelTime" timeOptions={[{ name: 1, _id: 1 }]} />
            <Button disabled={isFetching} onClick={this.handleCreateRide} color="primary">
              Create
            </Button>
          </Fragment>
        }
      />

    )
  }
}

const mapStateToProps = state => {
  const formSelector = formValueSelector('createRide');
  return {
    originName: formSelector(state, 'originName'),
    destinationName: formSelector(state, 'destinationName'),
    driver: formSelector(state, 'driver'),
    vehicleTypeId: formSelector(state, 'vehicleTypeId'),
    travelTime: formSelector(state, 'travelTime'),
    createRideStruct: state.rides.createRide,
  }
};

const mapDispatchToProps = {
  ...rideActions,
};

const formConfig = {
  form: 'createRide',
};

export default connectAll({
  formConfig,
  mapStateToProps,
  mapDispatchToProps,
  withRouterProps: true,
})(CreateRideForm);
