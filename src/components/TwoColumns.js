import React from 'react';
import { connectAll } from '../utils';

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '50%',
    marginRight: '20px',
  },
  rightColumn: {
    width: '50%',
  },
};

const TwoColumns = ({ leftColumn, rightColumn, classes }) => (
  <div className={classes.content}>
    <div className={classes.leftColumn}>
      {leftColumn && leftColumn}
    </div>
    <div className={classes.rightColumn}>
      {rightColumn && rightColumn}
    </div>
  </div>
);

export default connectAll({ styles })(TwoColumns);

