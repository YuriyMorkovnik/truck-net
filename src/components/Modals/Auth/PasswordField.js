import React from 'react';
import TextField from '@material-ui/core/TextField';

import { connectAll } from "../../../utils";

function PasswordField({ input: { onChange } }) {
  return(
    <TextField
      onChange={onChange}
      autoFocus
      margin="dense"
      // id="name"
      label="Password"
      type="password"
      fullWidth
    />
  )
}

export default connectAll({ isField: true })(PasswordField)