import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TruckCard from '../components/TruckCard';
import { withStyles } from '@material-ui/core/styles';
import { parseData, getHours } from '../utils';
import CardInfo from '../components/CardInfo';

const dataJson = require('../data');
const data = parseData(dataJson);

const styles = {
    root: {
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
    state = null;
    handleClick = (newState) => () => {
        this.setState({ ...newState });
    };
    render() {
        const { classes } = this.props;
        if (!data || !data.rides) return null;
        return (
            <div className={classes.root}>
                <div className={classes.columnLeft}>
                    {data.rides.map(({ driver, travelTime, originName, destinationName, vehicleTypeId }) => (
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
                    {this.state && <CardInfo {...this.state}/>}
                </div>
            </div>
        )
    }
}

Rides.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rides);