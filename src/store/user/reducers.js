import types from "./types";

function userReducer(state = false, action) {
  switch (action.type) {
    case types.SIGN_IN:
      return !state;
    default:
      return state;
  }
}
export default userReducer;
