import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { selectOrigins } from '../../utils';

import VehicleFilter from './VehicleFilter';
import OriginFilter from './OriginFilter'

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
    },
};

function FilterBar({ classes, data, filterValues, selectVehicleType, onChangeOriginFilter }) {
    return (
        <div className={classes.root}>
            <VehicleFilter
                currentValue={filterValues.vehicleType}
                vehicleTypes={data.vehicleTypes}
                selectVehicleType={selectVehicleType}
            />
            <OriginFilter
                origins={selectOrigins(data.rides)}
                currentValue={filterValues.origin}
                onChangeOriginFilter={onChangeOriginFilter}
            />
        </div>
    )
}

FilterBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterBar);