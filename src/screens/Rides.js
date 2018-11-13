import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TruckCard from '../components/TruckCard';
import { withStyles } from '@material-ui/core/styles';
import { parseData, getHours } from '../utils';
import CardInfo from '../components/CardInfo';
import FilterBar from '../components/FilterBar';

const dataJson = require('../data');
const data = parseData(dataJson);

const styles = {
    content: {
        padding: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    columnLeft: {
        width: '50%',
        marginRight: '20px',
        marginLeft: '20px',
    },
    columnRight: {
        width: '50%',
        marginRight: '20px',
    },
};

class Rides extends Component {
    state = {
        ridesList: null,
        currentItem: null,
    };
    originalRidesList = data.rides;
    componentDidMount() {
        this.setState({ ridesList: this.originalRidesList });
    }
    handleClick = (currentItem) => () => {
        this.setState({ currentItem });
    };
    selectVehicleType = ({ target: { value } }) => {
        const filteredRidesList = value
            ? this.originalRidesList.filter(({ vehicleTypeId }) => vehicleTypeId === value)
            : this.originalRidesList;
        this.setState({ ridesList: filteredRidesList })
    };
    render() {
        const { classes } = this.props;
        if (!this.state.ridesList) return null;
        return (
            <div>
                <FilterBar data={data} selectVehicleType={this.selectVehicleType}/>
                <div className={classes.content}>
                    <div className={classes.columnLeft}>
                        {this.state.ridesList.map(({
                            driver,
                            travelTime,
                            originName,
                            destinationName,
                            vehicleTypeId }) => (
                            <TruckCard
                                handleClick={this.handleClick({
                                    driver,
                                    travelTime: getHours(travelTime),
                                    originName,
                                    destinationName,
                                    vehicleType: data.vehicleTypes.find(({id}) => id === vehicleTypeId),
                                })}
                                key={driver}
                                originName={originName}
                                travelTime={travelTime}
                                destinationName={destinationName}
                            />
                        ))}
                    </div>
                    <div className={classes.columnRight}>
                        {this.state.currentItem && <CardInfo {...this.state.currentItem}/>}
                    </div>
                </div>
            </div>
        )
    }
}

Rides.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rides);