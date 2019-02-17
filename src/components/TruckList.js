import React, { useCallback, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connectAll } from '../utils';


import TruckCard from './TruckCard';

const styles = {
  root: {
    width: '100%',
    height: '100%',

  },
  dropZone: {
    opacity: 0.2,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
};

function TruckList(props) {
  const { ridesList, input: { onChange, value }, history, classes, onDropRides } = props;
  const [isDropZone, setIsDropZone] = useState(false);
  useEffect(() => setIsDropZone(Boolean(value)));
  const onDragOver = useCallback((e) => e.preventDefault(), [],);

  const onDragStart = useCallback(item => () => onChange(item), []);
  const handleChange = useCallback(
    ({ id }) => () => {
    history.push(id)
  }, []);
  return (
    <div
      className={`${classes.root} ${isDropZone ? classes.dropZone : ''}`}
      onDragOver={onDragOver}
      dropzone="move"
      onDrop={onDropRides}
    >
      {ridesList.length !== 0 && ridesList.map((item) => (
        <Link to={`/rides/${item._id}`} key={item._id} className={classes.link}>
          <TruckCard
            onDrag={onDragStart(item)}
            handleChange={handleChange(item)}
            id={item._id}
            driver={item.driver}
            originName={item.originName}
            travelTime={item.travelTime}
            destinationName={item.destinationName}
          />
        </Link>
      ))}
    </div>
  )
}

export default connectAll({ isField: true, withRouter, styles, })(TruckList);
