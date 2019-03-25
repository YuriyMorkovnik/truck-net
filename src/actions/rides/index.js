import axios from 'axios';

export const fetchRides = () => async (dispatch) => {
  dispatch({ type: 'FETCH_RIDES_REQUEST' });
  try {
    const { data } = await axios.get('http://localhost:5000/api/rides');
    dispatch({ type: 'FETCH_RIDES_SUCCEED', payload: data })
  } catch (error) {
    dispatch({ type: 'FETCH_RIDES_ERROR', error });
  }
};

export const fetchRideById = id => async (dispatch) => {
  dispatch({ type: 'FETCH_RIDE_REQUEST' });
  try {
    const { data } = await axios.get(`http://localhost:5000/api/rides/${id}`);
    dispatch({ type: 'FETCH_RIDE_SUCCEED', payload: data })
  } catch (error) {
    dispatch({ type: 'FETCH_RIDE_ERROR', error });
  }
};

export const createRide = payload => async dispatch => {
  dispatch({ type: 'CREATE_RIDE_REQUEST' });
  try {
    const { data } = await axios.post(
      'http://localhost:5000/api/rides',
      payload
    );
    dispatch({ type: 'CREATE_RIDE_SUCCEED', payload: data })
  } catch (error) {
    dispatch({ type: 'CREATE_RIDE_ERROR', error });
  }
};


export const changeStatus = payload => async dispatch => {
  dispatch({ type: 'CHANGE_STATUS_REQUEST' });
  try {
    const { data } = await axios.put(
      'http://localhost:5000/api/rides/changeStatus',
      payload
    );
    dispatch({ type: 'CHANGE_STATUS_SUCCEED', payload: data })
  } catch (error) {
    dispatch({ type: 'CHANGE_STATUS_ERROR', error });
  }
};

export const fetchVehicleTypes = () => async (dispatch) => {
  dispatch({ type: 'FETCH_VEHICLE_TYPES_REQUEST' });
  try {
    const { data } = await axios.get('http://localhost:5000/api/vehicle');
    dispatch({ type: 'FETCH_VEHICLE_TYPES_SUCCEED', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_VEHICLE_TYPES_ERROR', error })
  }
};
