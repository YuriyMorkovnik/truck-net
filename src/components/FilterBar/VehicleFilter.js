import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '16px',
    },
    select: {
        width: '240px',
    },
};

function VehicleFilter({ classes, vehicleTypes, selectVehicleType, currentValue }) {
    return (
        <FormControl variant="outlined" className={classes.root}>
            <InputLabel>Vehicle type</InputLabel>
            <Select
                className={classes.select}
                value={currentValue}
                onChange={selectVehicleType}
                input={
                    <OutlinedInput
                        labelWidth={88}
                    />
                }

            >
                <MenuItem value={''}>None</MenuItem>
                {vehicleTypes.map(({id, name}) => (
                    <MenuItem key={String(id)} value={id}>{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

VehicleFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleFilter);