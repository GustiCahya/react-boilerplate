import types from "./types";

const initialState = [];

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_NOTES:
      return action.payload;
    case types.ADD_NOTE:
      return state.map((item) =>
        item.id === action.payload.id ? { ...state, ...action.payload } : item
      );
    case types.DELETE_NOTE:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}
export default notesReducer;
