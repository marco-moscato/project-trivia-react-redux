import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
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
  default:
    return state;
  }
};

export default player;
