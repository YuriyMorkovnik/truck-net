import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connectAll } from "../utils/index";

function InputTextField({ input: { onChange }, label, ...props }) {
  return (
    <TextField
      onChange={onChange}
      id="name"
      label={label}
      type="text"
      variant="outlined"
      fullWidth
      {...props}
    />
  )
}

export default connectAll({ isField: true })(InputTextField);
