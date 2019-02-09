import axios from 'axios';

export const register = (data) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', data);
    if(res) {
      dispatch({ type: 'auth_success', payload: res })
    }

  } catch (err) {
    dispatch({ type: 'auth_err' });
    console.log(err)
  }
};
