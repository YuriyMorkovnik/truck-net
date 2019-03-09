import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';

export const RIDE_STATUSES = {
  active: 'active',
  finished: 'finished',
};

export const parseData = data => JSON.parse(JSON.stringify(data));

export const getHours = count => `${count} h`;

export const selectOrigins = rides => {
  if (!rides) return null;
  const arrayOfOrigins = rides.map(item => item.originName);
  return R.uniq(arrayOfOrigins);
};

export const selectRideByStatus = ({ rides, rideStatus }) => {
  if (!rides) return null;
  return rides.filter(({ status }) => status === rideStatus)
};

export const selectDestination = rides => {
  if (!rides) return null;
  const arrayOfOrigins = rides.map(item => item.destinationName);
  return R.uniq(arrayOfOrigins);
};

export const filterRidesList = ({ ridesList, vehicleFilter, originFilter, destinationFilter, durationPredicate }) => {
  return R.pipe(
    R.when(() => !!vehicleFilter,  R.filter(({ vehicleTypeId }) => vehicleTypeId === vehicleFilter)),
    R.when(() => !!originFilter, R.filter(({ originName }) => originName.toLowerCase().includes(originFilter.toLowerCase()))),
    R.when(() => !!destinationFilter, R.filter(({ destinationName }) => destinationName.toLowerCase().includes(destinationFilter.toLowerCase()))),
    R.when(() => !R.isEmpty(durationPredicate), R.filter(({ travelTime }) => durationPredicate.getPredicate(travelTime)))
  )(ridesList);
};

export function asField (Input) {
  return function WrappedInput (props) {
    return <Field component={Input}  {...props}/>
  };
}

// export const asLink = linkProps => Component => {
//   return function (props) {
//     return <Link {...linkProps}><Component {...props} /></Link>
//   }
// };

export const connectAll = config => component => {
  const {
    styles,
    isField,
    mapStateToProps,
    mapDispatchToProps,
    formConfig,
    withRouterProps,
    ...rest
  } = config;
  const args =  [
    styles && withStyles(styles),
    (mapStateToProps || mapDispatchToProps) && connect(mapStateToProps, mapDispatchToProps),
    formConfig && reduxForm(formConfig),
    withRouterProps && withRouter,
    isField && asField,
    ...Object.values(rest),
  ].filter(arg => !!arg);
  return R.pipe(...args)(component);
};
