const initState = {
  ridesList: {
    isFetching: false,
    error: false,
    data: null,
  },
  createRide: {
    isFetching: false,
    error: false,
    data: null,
  },
  ride: {
    isFetching: false,
    error: false,
    data: null,
  },
  vehicleTypes: {
    isFetching: false,
    error: false,
    data: null,
  },
};

export default (state = initState, action) => {
  switch (action.type) {

    case 'FETCH_RIDES_REQUEST': {
      return {
        ...state,
        ridesList: {
          ...state.ridesList,
          isFetching: true,
        }
      }
    }
    case 'FETCH_RIDES_SUCCEED': {
      return {
        ...state,
        ridesList: {
          ...state.ridesList,
          data: action.payload,
          isFetching: false,
        },
      }
    }
    case 'FETCH_RIDES_ERROR': {
      return {
        ...state,
        ridesList: {
          ...state.ridesList,
          isFetching: false,
          error: action.error,
        }
      }
    }

    case 'FETCH_RIDE_REQUEST': {
      return {
        ...state,
        ride: {
          ...state.ride,
          isFetching: true,
        }
      }
    }
    case 'FETCH_RIDE_SUCCEED': {
      return {
        ...state,
        ride: {
          ...state.ride,
          data: action.payload,
          isFetching: false,
        },
      }
    }
    case 'FETCH_RIDE_ERROR': {
      return {
        ...state,
        ride: {
          ...state.ride,
          isFetching: false,
          error: action.error,
        }
      }
    }

    case 'CREATE_RIDE_REQUEST': {
      return {
        ...state,
        createRide: {
          ...state.createRide,
          isFetching: true,
        }
      }
    }
    case 'CREATE_RIDE_SUCCEED': {
      return {
        ...state,
        createRide: {
          ...state.createRide,
          data: action.payload,
          isFetching: false,
        },
      }
    }
    case 'CREATE_RIDE_ERROR': {
      return {
        ...state,
        createRide: {
          ...state.createRide,
          isFetching: false,
          error: action.error,
        }
      }
    }

    case 'FETCH_VEHICLE_TYPES_REQUEST': {
      return {
        ...state,
        vehicleTypes: {
          isFetching: true,
          error: false,
          data: null,
        },
      }
    }
    case 'FETCH_VEHICLE_TYPES_SUCCEED': {
      return {
        ...state,
        vehicleTypes: {
          isFetching: false,
          error: false,
          data: action.payload,
        },
      }
    }
    case 'FETCH_VEHICLE_TYPES_ERROR': {
      return {
        ...state,
        vehicleTypes: {
          isFetching: false,
          error: action.error,
          data: null,
        },
      }
    }
    default: return state;
  }
}
