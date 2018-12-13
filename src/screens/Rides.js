import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TruckCard from '../components/TruckCard';
import TruckList from '../components/TruckList';
import { withStyles } from '@material-ui/core/styles';
import { parseData, getHours, filterRidesList } from '../utils';
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
        this.setState({ ridesList: this.originalRidesList });
    }
    handleClick = (currentItem) => () => {
        this.setState({ currentItem });
    };
    onChangeFilter = nameFilterValue => ({ target: { value } }) => {
        this.setState(prevState => {
            const newFilterValues = {
                ...prevState.filterValues,
                [nameFilterValue]: value,
            };
            return ({
                ridesList: filterRidesList({
                    ridesList: this.originalRidesList,
                    filterValues: newFilterValues,
                }),
                currentItem: null,
                filterValues: newFilterValues
            })
        })
    };
    render() {
        const { classes } = this.props;
        if (!this.state.ridesList) return null;
        return (
            <div className={classes.root}>
                <FilterBar
                    data={data}
                    selectVehicleType={this.onChangeFilter('vehicleType')}
                    onChangeOriginFilter={this.onChangeFilter('origin')}
                    filterValues={this.state.filterValues}/>
                <div className={classes.content}>
                    <div className={classes.columnLeft}>
                        {/*{this.state.ridesList.map(({*/}
                            {/*driver,*/}
                            {/*travelTime,*/}
                            {/*originName,*/}
                            {/*destinationName,*/}
                            {/*vehicleTypeId }) => (*/}
                            {/*<TruckCard*/}
                                {/*handleClick={this.handleClick({*/}
                                    {/*driver,*/}
                                    {/*travelTime: getHours(travelTime),*/}
                                    {/*originName,*/}
                                    {/*destinationName,*/}
                                    {/*vehicleType: data.vehicleTypes.find(({id}) => id === vehicleTypeId),*/}
                                {/*})}*/}
                                {/*key={driver}*/}
                                {/*originName={originName}*/}
                                {/*travelTime={travelTime}*/}
                                {/*destinationName={destinationName}*/}
                            {/*/>*/}
                        {/*))}*/}
                        <TruckList
                          ridesList={this.state.ridesList}
                          vehicleTypes={data.vehicleTypes}
                          handleClick={this.handleClick}
                        />
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