import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import * as R from 'ramda';

export const parseData = data => JSON.parse(JSON.stringify(data));

export const getHours = count => `${count} h`;

export const selectOrigins = rides => {
    const arrayOfOrigins = rides.map(item => item.originName);
    return R.uniq(arrayOfOrigins);
};

export const selectDestination = rides => {
  const arrayOfOrigins = rides.map(item => item.destinationName);
  return R.uniq(arrayOfOrigins);
};

export const filterRidesList = ({ ridesList, vehicleFilter, originFilter, destinationFilter }) => {
  return R.pipe(
    R.when(() => !!vehicleFilter,  R.filter(({ vehicleTypeId }) => vehicleTypeId === vehicleFilter)),
    //R.filter(({ vehicleTypeId }) => vehicleTypeId === vehicleFilter),
    R.when(() => !!originFilter, R.filter(({ originName }) => originName.toLowerCase().includes(originFilter.toLowerCase()))),
    R.when(() => !!destinationFilter, R.filter(({ destinationName }) => destinationName.toLowerCase().includes(destinationFilter.toLowerCase())))
  )(ridesList);
};

export function asField (Input) {
  return function WrappedInput (props) {
    return <Field component={Input}  {...props}/>
  };
}

export const connectAll = config => component => {
  const { styles, isField, mapStateToProps, mapDispatchToProps, formConfig } = config;
  const args =  [
    isField && asField,
    styles && withStyles(styles),
    (mapStateToProps || mapDispatchToProps) && connect(mapStateToProps, mapDispatchToProps),
    formConfig && reduxForm(formConfig),
  ].filter(arg => !!arg);
  return R.pipe(...args)(component);
};
