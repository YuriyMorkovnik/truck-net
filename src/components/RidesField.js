import React, { Fragment } from 'react';
import FabButton from '../components/FabButton';
import SaveIcon from '@material-ui/icons/Save';
import InProgressIcon from '@material-ui/icons/Schedule';
import FinishedIcon from '@material-ui/icons/DoneAll';
import Typography from '@material-ui/core/Typography';

import TruckList from '../components/TruckList';
import TwoColumns from '../components/TwoColumns';

import { connectAll } from "../utils";

const styles = {
  title: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '8px',
    alignItems: 'flex-end',
  },
  icon: {
    paddingRight: '8px',
  }
};

function RidesField(props) {
  const {
    classes,
    input: { value },
    onClick,
    ridesList,
    finishedRidesList,
    onDropActiveRides,
    onDropOnFinishedRide,
  } = props;
  return (
    <Fragment>
      <TwoColumns
        leftColumn={
          <Fragment>
            <div className={classes.title}>
              <InProgressIcon fontSize="large" className={classes.icon} />
              <Typography variant="h6">IN PROGRESS</Typography>
            </div>

            <TruckList
              onDropRides={onDropActiveRides}
              ridesList={ridesList}
            />
          </Fragment>
        }
        rightColumn={
          <Fragment>
            <div className={classes.title}>
              <FinishedIcon fontSize="large" className={classes.icon} />
              <Typography variant="h6">FINISHED</Typography>
            </div>
            <TruckList
              onDropRides={onDropOnFinishedRide}
              ridesList={finishedRidesList}
            />
          </Fragment>

        }
      />
      <FabButton title="save" isActive={Boolean(value.length)} onClick={onClick}>
        <SaveIcon color="secondary" />
      </FabButton>
    </Fragment>
  )
}

export default connectAll({ isField: true, styles })(RidesField);
