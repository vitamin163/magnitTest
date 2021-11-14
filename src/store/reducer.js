import { handleActions } from 'redux-actions';
import { addUserDataSuccess, addUserDataRequest, addUserDataFailure } from './action';

const initialState = {
  isLoading: false,
  error: null,
  usersData: {},
};

const handlers = {
  [addUserDataRequest]: (state) => ({ ...state, isLoading: true, error: null }),
  // eslint-disable-next-line max-len
  [addUserDataSuccess]: (state, { payload: { data, handle } }) => ({ ...state, usersData: { ...state.usersData, [handle]: data }, isLoading: false }),
  [addUserDataFailure]: (state) => ({ ...state, isLoading: false, error: 'Не удалось загрузить данные' }),

};

export const isLoading = (state) => state.isLoading;
export const getError = (state) => state.error;
export const getUsersData = (state) => state.usersData;

const userDataReducer = handleActions(handlers, initialState);

export default userDataReducer;
