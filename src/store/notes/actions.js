import axios from "axios";
import types from "./types";

export const setNotes = (payload) => {
  return {
    type: types.SET_NOTES,
    payload,
  };
};

export const stateAddNote = (payload) => {
  return {
    type: types.ADD_NOTE,
    payload,
  };
};

export const stateDeleteNote = (payload) => {
  return {
    type: types.DELETE_NOTE,
    payload,
  };
};

export const getNotes = () => async (dispatch, getState) => {
  const notes = await axios
    .get("http://localhost:8000/notes")
    .then((res) => res.data)
    .catch((err) => alert(err.message));
  dispatch(setNotes(notes));
};

export const addNote = (note) => (dispatch, getState) => {
  return axios
    .post("http://localhost:8000/notes", note)
    .then((result) => {
      dispatch(stateAddNote(note))
      return result;
    })
    .catch((err) => err);
};

export const deleteNote = (note) => async (dispatch, getState) => {
  return axios
    .delete(`http://localhost:8000/notes/${note.id}`)
    .then((result) => {
      dispatch(stateDeleteNote(note))
      return result;
    })
    .catch((err) => err);
};
