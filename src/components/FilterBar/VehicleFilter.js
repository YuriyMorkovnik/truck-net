import React from 'react';

import { connectAll } from "../../utils";

import DropDownSelector from '../DropDownSelector';


function VehicleFilter({
  vehicleTypes,
  input: { onChange, value },
}) {
  const handleChange = ({ target: { value } }) => {
    onChange(value);
  };
  return (
    <DropDownSelector
      options={vehicleTypes}
      label="Vehicle type"
      onChange={handleChange}
      currentValue={value}
    />

  )
}

export default connectAll({
  isField: true,
})(VehicleFilter);