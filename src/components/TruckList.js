import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connectAll } from '../utils';


import TruckCard from './TruckCard';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
};

const TruckList = props => {
  const { ridesList, vehicleTypes, input: { onChange }, history, classes } = props;
  const handleChange = ({
    id,
    driver,
    vehicleType,
    originName,
    destinationName,
    travelTime,
  }) => () => {
    onChange({
      driver,
      vehicleType,
      originName,
      destinationName,
      travelTime,
    });
    history.push(id)
  };
  return (
    <Fragment>
      {ridesList.map((item) => (
        <Link to={`/rides/${item._id}`} key={item._id} className={classes.link}>
          <TruckCard
            handleChange={handleChange(item)}
            id={item._id}
            driver={item.driver}
            // vehicleType={vehicleTypes.find(({id}) => id === item.vehicleTypeId)}
            originName={item.originName}
            travelTime={item.travelTime}
            destinationName={item.destinationName}
          />
        </Link>
      ))}
    </Fragment>
  )
};

export default connectAll({ isField: true, withRouter, styles, })(TruckList);
