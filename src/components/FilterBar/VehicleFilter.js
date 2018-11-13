import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const styles = {};

function VehicleFilter({ vehicleTypes, selectVehicleType }) {
    return (
        <Fragment>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select
                value="Ten"
                onChange={selectVehicleType}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}
            >
                <MenuItem value={null}>None</MenuItem>
                {vehicleTypes.map(({id, name}) => (
                    <MenuItem value={id}>{name}</MenuItem>
                ))}
                {/*<MenuItem value={10}>Ten</MenuItem>*/}
                {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                {/*<MenuItem value={30}>Thirty</MenuItem>*/}
            </Select>
        </Fragment>
    )
}

VehicleFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleFilter);