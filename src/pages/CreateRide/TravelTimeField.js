import React from 'react';

import { connectAll } from "../../utils";

import DropDownSelector from '../../components/DropDownSelector';


function TravelTimeField({
  timeOptions,
  input: { onChange, value },
}) {
  const handleChange = ({ target: { value } }) => {
    onChange(value);
  };
  return (
    <DropDownSelector
      options={timeOptions}
      label="Travel time"
      onChange={handleChange}
      currentValue={value}
    />

  )
}


export default connectAll({
  isField: true,
})(TravelTimeField);
