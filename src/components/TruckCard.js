import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router-dom';


import { getHours, connectAll } from '../utils';

const green ='#23cf5f';
const styles = {
  root: {
    marginBottom: '24px',
    height: '72px',
  },
  content: {
    marginTop: '8px',
    color: 'black',
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '5px',
  },
  fullPoint: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: green,
  },
  emptyPoint: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    borderWidth: '2px',
    borderColor: green,
    borderStyle: 'solid',
    boxSizing: 'border-box',
  },
  captionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  line: {
    backgroundColor: green,
    height: '2px',
    width: '100%',
  },
  originName: {
    flex: 1,
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  destinationName: {
    flex: 1,
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  travelTime: {
    flex: 1,
    fontSize: '12px',
    color: 'grey',
    textAlign: 'center',
  }
};

function TruckCard(props) {
  const {
    classes,
    driver,
    vehicleType,
    originName,
    destinationName,
    travelTime,
    onDrag,
    onDragEnd,
    onDragExit,
    handleChange
  } = props;
  // console.log('props item', props)

  return (
    <div onClick={handleChange} draggable onDragStart={onDrag} >
      <Card className={classes.root} >
        <CardActionArea>
          <CardContent className={classes.content}>
            <div className={classes.captionsWrapper}>
              <span className={classes.originName}>{originName}</span>
              <span className={classes.travelTime}>{getHours(travelTime)}</span>
              <span className={classes.destinationName}>{destinationName}</span>
            </div>
            <div className={classes.sectionWrapper}>
              <div className={classes.fullPoint}/>
              <div className={classes.line}/>
              <div className={classes.emptyPoint}/>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

TruckCard.propTypes = {
    classes: PropTypes.object.isRequired,
    originName: PropTypes.string.isRequired,
    destinationName: PropTypes.string.isRequired,
    travelTime: PropTypes.number.isRequired,
};


export default connectAll({
  styles,
})(TruckCard);