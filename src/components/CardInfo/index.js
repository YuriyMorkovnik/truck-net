import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = {

};

function RideInfo(props) {
    const { classes, originName, destinationName, travelTime } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <div className={classes.captionsWrapper}>
                    <span className={classes.originName}>{originName}</span>
                    <span className={classes.travelTime}>{`${travelTime}h`}</span>
                    <span className={classes.destinationName}>{destinationName}</span>
                </div>
                <div className={classes.sectionWrapper}>
                    <div className={classes.fullPoint}/>
                    <div className={classes.line}/>
                    <div className={classes.emptyPoint}/>
                </div>
            </CardContent>
        </Card>
    );
}

RideInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RideInfo);