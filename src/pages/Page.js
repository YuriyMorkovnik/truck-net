import React from 'react';
import { connectAll } from "../utils";

const styles = {
  root: {
    padding: '0px 30px',
  },
};

function Page({ children, classes }) {
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

export default connectAll({ styles })(Page);
