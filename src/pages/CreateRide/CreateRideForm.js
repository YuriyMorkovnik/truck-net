import React, { Fragment, Component, useEffect, useCallback } from 'react';
import { formValueSelector } from 'redux-form';
import Button from '@material-ui/core/Button';


import * as rideActions from '../../actions/rides';
import { connectAll } from '../../utils';

import TwoColumns from '../../components/TwoColumns';
import TextField from '../../components/TextField';
import Spinner from '../../components/Spinner';


import VehicleField from './VehicleField';
import TravelTimeField from './TravelTimeField';

const styles = {
  item: {
    margin: '16px 0px',
  }
};

function CreateRideForm (props) {
  const {
    createRideStruct: { data, isFetching, error },
    vehicleTypesStruct,
    history,
    originName,
    destinationName,
    driver,
    classes,
    vehicleTypeId,
    travelTime,
    fetchVehicleTypes,
  } = props;
  useEffect(() => {
    fetchVehicleTypes();
  }, []);
  useEffect(() => {
    if (
      data
      && !isFetching
      && !error
    ) {
      history.push(`/rides/${data._id}`);
    }
  }, [isFetching, data, error]);
  const handleCreateRide = useCallback(() => {
    const { createRide } = props;
    createRide({
      originName,
      destinationName,
      driver,
      vehicleTypeId,
      travelTime,
    })
  }, [originName, destinationName, driver, vehicleTypeId, travelTime]);

  if (vehicleTypesStruct.isFetching) return <Spinner/>;
  return (
    <TwoColumns
      leftColumn={
        <Fragment>
          <TextField name="originName" label="Origin name" className={classes.item}/>
          <TextField name="destinationName" label="Destination name" className={classes.item}/>
          <TextField name="driver" label="Driver name" className={classes.item}/>
        </Fragment>
      }
      rightColumn={
        <Fragment>
          <VehicleField name="vehicleTypeId" vehicleTypes={vehicleTypesStruct.data} className={classes.item}/>
          <TravelTimeField name="travelTime" timeOptions={[{ name: 1, _id: 1 }]} className={classes.item}/>
          <Button disabled={isFetching} onClick={handleCreateRide} color="primary">
            Create
          </Button>
        </Fragment>
      }
    />

  )
}

// const CreateRideForm = memo(
//   _CreateRideForm,
//   (prevProps, nextProps) => {
//     return prevProps.createRideStruct.isFetching !== nextProps.createRideStruct.isFetching
//       // && prevProps.originName !== nextProps.originName
//       // && prevProps.destinationName !== nextProps.destinationName
//       // && prevProps.dropZone !== nextProps.driver
//   }
// );

const mapStateToProps = state => {
  const formSelector = formValueSelector('createRide');
  return {
    originName: formSelector(state, 'originName'),
    destinationName: formSelector(state, 'destinationName'),
    driver: formSelector(state, 'driver'),
    vehicleTypeId: formSelector(state, 'vehicleTypeId'),
    travelTime: formSelector(state, 'travelTime'),
    createRideStruct: state.rides.createRide,
    vehicleTypesStruct: state.rides.vehicleTypes,
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
  styles,
  mapStateToProps,
  mapDispatchToProps,
  withRouterProps: true,
})(CreateRideForm);
