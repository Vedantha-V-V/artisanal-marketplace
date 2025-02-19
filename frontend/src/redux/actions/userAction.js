import { Api } from '../../utils/Api';
import * as actionTypes from '../constants/userContants';
import { resetCart } from './cartActions';

export const setUserDeatils = () => async dispatch => {
  const { statusCode, data } = await Api.getRequest(`/api/user/me`);
  if (statusCode === 400 || statusCode === 500) {
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    });
    return;
  }
  const { user } = JSON.parse(data);
  dispatch({
    type: actionTypes.SET_USER,
    payload: {
      isLogin: true,
      details: { ...user },
    },
  });
};

export const setInitialState = () => async dispatch => {
  dispatch({
    type: actionTypes.SET_INITIAL_STATE,
  });
  dispatch(resetCart()); // Add this line to reset the cart
};
