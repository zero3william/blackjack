// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = "COUNTER_INCREMENT";

// ------------------------------------
// Actions
// ------------------------------------
export function increment(id, value = 1) {
  return {
    type: COUNTER_INCREMENT,
    payload: { id, value },
  };
}

export const actions = {
  increment,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    state[action.payload.id] = state[action.payload.id] + action.payload.value;
    localStorage.setItem(action.payload.id, state[action.payload.id]);
    return state;
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  rect: localStorage.getItem("rect")
    ? parseInt(localStorage.getItem("rect"))
    : 0,
  ellipse: localStorage.getItem("ellipse")
    ? parseInt(localStorage.getItem("ellipse"))
    : 0,
  star: localStorage.getItem("star")
    ? parseInt(localStorage.getItem("star"))
    : 0,
};
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
