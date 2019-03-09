import React, { memo } from 'react';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';

import { connectAll } from "../../utils";

class FilterChip {
  constructor({ getPredicate, label }) {
    this.id = FilterChip.getId();
    this.label = label;
    this.predicate = {
      getPredicate,
      id: this.id,
    }
  }
  static getId() {
    FilterChip._id = (FilterChip._id || 0) + 1;
    return FilterChip._id;
  }
}

const chips = [
  new FilterChip({
    getPredicate: duration => duration <= 2,
    label: '<2 hours',
  }),
  new FilterChip({
    getPredicate: duration => duration > 2 && duration < 8,
    label: '2-8 hours',
  }),
  new FilterChip({
    getPredicate: duration => duration >= 8,
    label: '>8 hours',
  }),
  new FilterChip({
    getPredicate: duration => !!duration,
    label: 'All',
  }),
];

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 2,
    maxWidth: 300,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
};

function DurationFilter(props) {
  const { classes, input: { onChange } } = props;
  const handleClick = (predicate) => () => {
    onChange(predicate)
  };
  return (
    <div className={classes.root}>
      <InputLabel>Duration of the ride</InputLabel>
      <div className={classes.wrapper}>
        {chips.map(({ predicate, label, id }) => (
          <Chip key={id} label={label} onClick={handleClick(predicate)}/>
        ))}
      </div>
    </div>
  )
}

export default connectAll({
  isField: true,
  styles,
})(memo(DurationFilter));