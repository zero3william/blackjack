// ------------------------------------
// Constants
// ------------------------------------
export const BET = "BET";
export const PAYOUT = "PAYOUT";

// ------------------------------------
// Actions
// ------------------------------------
export function bet(num) {
  return {
    type: BET,
    payload: num,
  };
}
export function payout(num) {
  return {
    type: PAYOUT,
    payload: num,
  };
}

export const actions = {
  bet,
  payout,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BET]: (state, action) => {
    state.userinfo.balance = state.userinfo.balance - action.payload;
    localStorage.setItem("userinfo", JSON.stringify(state.userinfo));
    return state;
  },
  [PAYOUT]: (state, action) => {
    state.userinfo.balance = state.userinfo.balance + action.payload;
    localStorage.setItem("userinfo", JSON.stringify(state.userinfo));
    return state;
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userinfo: {
    balance: 1000,
    name: "William",
  },
};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
