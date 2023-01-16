import { USER_LOGIN,
  REQUEST_DATA_TRIVIA,
  REQUEST_DATA_TRIVIA_SUCCESS,
  REQUEST_DATA_TRIVIA_ERROR,
  USER_SCORE_UPDATE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  isLoading: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  }
  case USER_SCORE_UPDATE: {
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  }
  case REQUEST_DATA_TRIVIA: {
    return { ...state, isLoading: true };
  }
  case REQUEST_DATA_TRIVIA_SUCCESS: {
    return { ...state, isLoading: false };
  }
  case REQUEST_DATA_TRIVIA_ERROR: {
    return { ...state, isLoading: false, error: action.error };
  }
  default:
    return state;
  }
};

export default player;
