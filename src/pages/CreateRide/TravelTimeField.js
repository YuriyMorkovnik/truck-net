import React from 'react';

import { connectAll } from "../../utils";

import DropDownSelector from '../../components/DropDownSelector';


function TravelTimeField({
  timeOptions,
  input: { onChange, value },
  ...props
}) {
  const handleChange = ({ target: { value } }) => {
    onChange(value);
  };
  return (
    <div {...props}>
      <DropDownSelector
        options={timeOptions}
        label="Travel time"
        onChange={handleChange}
        currentValue={value}
      />
    </div>

  )
}


export default connectAll({
  isField: true,
})(TravelTimeField);
