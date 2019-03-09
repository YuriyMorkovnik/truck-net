import React from 'react';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import { connectAll } from '../utils';

const styles = {
  root: {
    position: 'fixed',
    right: '10%',
    bottom: '10%',
    transition: 'all 0.4s ease-in-out'
  },
  notActive: {
    bottom: '-40%',
  }
};

function FabButton(props) {
  const { title, onClick, children, classes, isActive } = props;
  return (
    <Tooltip title={title}>
      <Fab
        color="primary"
        className={`${classes.root}
         ${isActive ? '' : classes.notActive}`}
        onClick={onClick}
      >
        {children}
      </Fab>
    </Tooltip>
  )
}

export default connectAll({ styles })(FabButton);
