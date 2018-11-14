import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardInfoItem from './CardInfoItem';

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
        classes,
        originName,
        destinationName,
        travelTime,
        driver,
        vehicleType,
    } = props;
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <CardInfoItem title="Driver name" value={driver}/>
                <CardInfoItem title="Origin" value={originName}/>
                <CardInfoItem title="Travel time" value={travelTime}/>
                <CardInfoItem title="Destination" value={destinationName}/>
                <CardInfoItem title="Vehicle type" value={vehicleType.name}/>
            </CardContent>
        </Card>
    );
}

CardInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    originName: PropTypes.string.isRequired,
    destinationName: PropTypes.string.isRequired,
    travelTime: PropTypes.string.isRequired,
    driver: PropTypes.string.isRequired,
    vehicleType: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }),
};

export default withStyles(styles)(CardInfo);