import types from "./types";

export const increment = (payload) => {
    return {
        type: types.INCREMENT,
        payload
    }
}

export const decrement = (payload) => {
    return {
        type: types.DECREMENT,
        payload
    }
}