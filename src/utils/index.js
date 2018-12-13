import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import * as R from 'ramda';

export const parseData = data => JSON.parse(JSON.stringify(data));

export const getHours = count => `${count} h`;

export const selectOrigins = rides => {
    const arrayOfOrigins = rides.map(item => item.originName);
    return [...new Set(arrayOfOrigins)];
};

export const filterRidesList = ({ ridesList, filterValues }) => {
    const { vehicleType, origin } = filterValues;
    const filteredByVehicleType = vehicleType !== ''
        ? ridesList.filter(({ vehicleTypeId }) => vehicleTypeId === vehicleType)
        : ridesList;
    return origin !== ''
        ? filteredByVehicleType.filter(({ originName }) => originName.toLowerCase().includes(origin.toLowerCase()))
        : filteredByVehicleType;
};

export function asField (Input) {
  return function WrappedInput (props) {
    return <Field component={Input}  {...props}/>
  };
}

export const connectAll = config => component => {
  const { styles, isField } = config;
  const args =  [
    isField && asField,
    styles && withStyles(styles),
  ];
  return R.pipe(...args)(component);
};
