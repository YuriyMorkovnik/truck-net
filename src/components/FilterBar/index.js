import React from 'react';
import PropTypes from 'prop-types';

import { connectAll, selectOrigins } from "../../utils";

import VehicleFilter from './VehicleFilter';
import OriginFilter from './OriginFilter'
import DestinationFilter from './DestinationFilter';

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    justifyContent: 'space-between',
  },
};

function FilterBar({ classes, data, filterValues, selectVehicleType, onChangeOriginFilter }) {
  return (
    <div className={classes.root}>
      <VehicleFilter
        name="vehicleFilter"
        currentValue={filterValues.vehicleType}
        vehicleTypes={data.vehicleTypes}
        selectVehicleType={selectVehicleType}
      />
      <OriginFilter
        name="originFilter"
      />
      <DestinationFilter name="destinationFilter" />
    </div>
  )
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connectAll({
  styles,
})(FilterBar);