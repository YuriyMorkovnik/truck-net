import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'

import { getHours } from "../utils";

import TruckCard from './TruckCard';

const TruckList = props => {
  const { ridesList, vehicleTypes, handleClick } = props;
  return (
    <div>
      {ridesList.map(({
        driver,
        travelTime,
        originName,
        destinationName,
        vehicleTypeId }) => (
        <TruckCard
          name="currentItem"
          handleClick={handleClick({
            driver,
            travelTime: getHours(travelTime),
            originName,
            destinationName,
            vehicleType: vehicleTypes.find(({id}) => id === vehicleTypeId),
          })}
          key={driver}
          originName={originName}
          travelTime={travelTime}
          destinationName={destinationName}
        />
      ))}
    </div>
  )
};

export default reduxForm({
  form: 'truckList',
  initialValues: {
    ridesList: null,
    currentItem: null,
    filterValues: {
      vehicleType: '' ,
      origin: '',
    },
  }
})(TruckList)
