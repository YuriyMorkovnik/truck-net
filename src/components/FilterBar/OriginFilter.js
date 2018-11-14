import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    select: {
        maxWidth: '240px',
    },
};

function OriginFilter({ classes, origins, onChangeOriginFilter, currentValue }) {
    return (
        <TextField
            id="outlined-select-currency"
            label="Origin"
            value={currentValue}
            onChange={onChangeOriginFilter}
            variant="outlined"
        >
            {origins.map(item => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
        </TextField>
    )
}

OriginFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OriginFilter);