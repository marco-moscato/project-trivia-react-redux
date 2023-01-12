import { apiTrivia } from '../../services/api';

export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_DATA_TRIVIA = 'REQUEST_DATA_TRIVIA';
export const REQUEST_DATA_TRIVIA_SUCCESS = 'REQUEST_DATA_TRIVIA_SUCCESS';
export const REQUEST_DATA_TRIVIA_ERROR = 'REQUEST_DATA_TRIVIA_ERROR';

export const player = (email, name) => ({
  type: USER_LOGIN,
  payload: { email, name },

});

const requestDataTrivia = () => ({
  type: REQUEST_DATA_TRIVIA,
});

const responseDataTriviaSuccess = (data) => ({
  type: REQUEST_DATA_TRIVIA_SUCCESS,
  data,
});

const responseDataTriviaError = (error) => ({
  type: REQUEST_DATA_TRIVIA_ERROR,
  error,
});

export const fetchTriviaReducer = () => async (dispatch) => {
  dispatch(requestDataTrivia());

  try {
    const data = await apiTrivia();
    dispatch(responseDataTriviaSuccess(data));
  } catch (error) {
    dispatch(responseDataTriviaError(error));
  }
};
