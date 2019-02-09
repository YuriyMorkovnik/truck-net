import React from 'react';
import TextField from '@material-ui/core/TextField';

import { connectAll } from "../../../utils";

function Email({ input: { onChange } }) {
  return(
    <TextField
      onChange={onChange}
      autoFocus
      margin="dense"
      id="name"
      label="Email Address"
      type="email"
      fullWidth
    />
  )
}

export default connectAll({ isField: true })(Email)