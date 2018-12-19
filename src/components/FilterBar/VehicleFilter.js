import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { connectAll } from "../../utils";

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    select: {
        width: '240px',
    },
};

function VehicleFilter({
  classes,
  vehicleTypes,
  input: { onChange, value },
}) {
  const handleChange = ({ target: { value } }) => {
    onChange(value);
  };
  return (
    <FormControl variant="outlined" className={classes.root}>
      <InputLabel>Vehicle type</InputLabel>
      <Select
        className={classes.select}
        value={value}
        onChange={handleChange}
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

export default connectAll({
  styles,
  isField: true,
})(VehicleFilter);