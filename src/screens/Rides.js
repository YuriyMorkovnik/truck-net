import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form'

import TruckList from '../components/TruckList';
import { parseData, connectAll, filterRidesList, selectOrigins } from '../utils';
import CardInfo from '../components/CardInfo';
import FilterBar from '../components/FilterBar';

const dataAsJson = require('../data');
const data = parseData(dataAsJson);

const styles = {
    root: {
        padding: '30px',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    columnLeft: {
        width: '50%',
        marginRight: '20px',
    },
    columnRight: {
        width: '50%',
    },
};

class Rides extends Component {
  state = {
    ridesList: null,
    currentItem: null,
    filterValues: {
        vehicleType: '' ,
        origin: '',
    },
  };
  originalRidesList = data.rides;
  componentDidMount() {
    const { change } = this.props;
    change('ridesList', this.originalRidesList);
    change('originList', selectOrigins(this.originalRidesList))
  }

  componentDidUpdate(prevProps) {
    const { change, originFilter, vehicleFilter } = this.props;
    if (originFilter !== prevProps.originFilter || vehicleFilter !== prevProps.vehicleFilter) {
      change('currentItem', null);
      change('ridesList', filterRidesList({
        ridesList: this.originalRidesList,
        originFilter,
        vehicleFilter,
      }))
    }
  }

  render() {
    const { classes, currentItem, ridesList } = this.props;
    if (!ridesList) return null;
    return (
      <div className={classes.root}>
        <FilterBar
          data={data}
          filterValues={this.state.filterValues}/>
        <div className={classes.content}>
          <div className={classes.columnLeft}>
            <TruckList
              ridesList={ridesList}
              vehicleTypes={data.vehicleTypes}
            />
          </div>
          <div className={classes.columnRight}>
            {currentItem && <CardInfo {...currentItem}/>}
          </div>
        </div>
      </div>
    )
  }
}

Rides.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const formSelector = formValueSelector('truckList');
  return {
    currentItem: formSelector(state, 'currentItem'),
    ridesList: formSelector(state, 'ridesList'),
    originFilter: formSelector(state, 'originFilter'),
    vehicleFilter: formSelector(state, 'vehicleFilter'),
  }
};

const formConfig = {
  form: 'truckList',
  initialValues: {
    ridesList: null,
    originList: null,
    currentItem: null,
    originFilter: '',
    vehicleFilter: '',
  }
};

export default connectAll({
  styles,
  mapStateToProps,
  formConfig,
})(Rides);