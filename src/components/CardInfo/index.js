import React from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { getHours, connectAll, parseData } from '../../utils';

import CardInfoItem from './CardInfoItem';

const dataAsJson = require('../../data');
const data = parseData(dataAsJson);

const styles = {
  root: {
    height: '168px',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  }
};



function CardInfo(props) {
  const {
    originName,
    destinationName,
    travelTime,
    driver,
    vehicleType,
  } = props.data;
  return (
    <Card className={props.classes.root}>
      <CardContent className={props.classes.content}>
        <CardInfoItem title="Driver name" value={driver}/>
        <CardInfoItem title="Origin" value={originName}/>
        <CardInfoItem title="Travel time" value={getHours(travelTime)}/>
        <CardInfoItem title="Destination" value={destinationName}/>
        {/*<CardInfoItem title="Vehicle type" value={vehicleType.name}/>*/}
      </CardContent>
    </Card>
  );
}

CardInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.shape({
      originName: PropTypes.string.isRequired,
      destinationName: PropTypes.string.isRequired,
      travelTime: PropTypes.number.isRequired,
      driver: PropTypes.string.isRequired,
      vehicleType: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
};

const mapStateToProps = state => {
  const formSelector = formValueSelector('truckList');
  return {
    ridesList: formSelector(state, 'ridesList'),
  }
};

export default connectAll({ styles, mapStateToProps, withRouterProps: true, })(CardInfo);