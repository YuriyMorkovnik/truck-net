import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { connectAll } from "../utils";


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  select: {
    width: '240px',
  },
};

function DropDownSelector({
  classes,
  label,
  options,
  onChange,
  currentValue
}) {
  return (
    <FormControl variant="outlined" className={classes.root}>
      <InputLabel>{label}</InputLabel>
      <Select
        className={classes.select}
        value={currentValue}
        onChange={onChange}
        input={
          <OutlinedInput
            labelWidth={88}
          />
        }
      >
        <MenuItem value={''}>None</MenuItem>
        {options && options.map(({ name, _id }) => (
          <MenuItem key={String(_id)} value={_id}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default connectAll({ styles })(DropDownSelector);
