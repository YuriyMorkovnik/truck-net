export default (state, action)  => {
  switch (action.type) {
    case 'auth': return {
      ...state,
      user: action.payload,
    };
    default: return state;
  }
}