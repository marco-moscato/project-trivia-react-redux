export const USER_LOGIN = 'USER_LOGIN';

export const player = (email, name) => ({
  type: USER_LOGIN,
  payload: { email, name },

});
