import types from "./types";

function counterReducer(state = 0, action) {
  switch (action.type) {
    case types.INCREMENT:
      return state + (action.payload || 1);
    case types.DECREMENT:
      return state - (action.payload || 1);
    default:
      return state;
  }
}
export default counterReducer;
