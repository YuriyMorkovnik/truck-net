import React, { Fragment } from 'react';

import TruckCard from './TruckCard';

const TruckList = props => {
  const { ridesList, vehicleTypes } = props;
  return (
    <Fragment>
      {ridesList.map(({
        driver,
        travelTime,
        originName,
        destinationName,
        vehicleTypeId }) => (
        <TruckCard
          name="currentItem"
          driver={driver}
          vehicleType={vehicleTypes.find(({id}) => id === vehicleTypeId)}
          key={driver}
          originName={originName}
          travelTime={travelTime}
          destinationName={destinationName}
        />
      ))}
    </Fragment>
  )
};

export default TruckList;
