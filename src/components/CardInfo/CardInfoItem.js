import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '8px',
    },
    title: {
        fontSize: '12px',
        color: 'grey',
        marginBottom: '8px',
    },
    name: {
        textAlign: 'left',
        fontSize: '16px',
    },
};

function CardInfoItem(props) {
    const { title, value, classes } = props;
    return (
        <div className={classes.wrapper}>
            <span className={classes.title}>{title}</span>
            <span className={classes.name}>{value}</span>
        </div>
    );
}

CardInfoItem.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardInfoItem);