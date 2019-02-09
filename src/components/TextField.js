import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connectAll } from "../utils/index";

function InputTextField({ input: { onChange }, label }) {
  return (
    <TextField
      onChange={onChange}
      autoFocus
      id="name"
      label={label}
      type="text"
      variant="outlined"
      fullWidth
    />
  )
}

export default connectAll({ isField: true })(InputTextField);
