import { createAction } from 'redux-actions';
import axios from 'axios';

export const addUserDataRequest = createAction('ADD_USER_DATA_REQUEST');
export const addUserDataSuccess = createAction('ADD_USER_DATA_SUCCESS');
export const addUserDataFailure = createAction('ADD_USER_DATA_FAILURE');

export const fetchUserData = ({ count, handle }) => async (dispatch) => {
  dispatch(addUserDataRequest());
  try {
    const { data } = await axios.get('https://codeforces.com/api/user.status', {
      params: {
        handle,
        count,
        from: 1,
      },
    });

    dispatch(addUserDataSuccess({ data: data.result, handle }));
  } catch {
    dispatch(addUserDataFailure());
  }
};
