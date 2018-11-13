import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import VehicleFilter from './VehicleFilter';

const styles = {};

function FilterBar({ data, selectVehicleType }) {
    return (
        <div>
            <VehicleFilter vehicleTypes={data.vehicleTypes} selectVehicleType={selectVehicleType}/>
        </div>
    )
}

FilterBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterBar);