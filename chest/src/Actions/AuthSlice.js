import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: null,
  account: null,
  balances: {
    copper: 0,
    silver: 0,
    gold: 0,
  },
};

export const AuthSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    connected: (state, action) => {
      state.account = action.payload;
    },

    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    checkifAuthenticated: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.account = action.payload.account;
        state.balances.copper = action.payload.balances.copper;
        state.balances.silver = action.payload.balances.silver;
        state.balances.gold = action.payload.balances.gold;
      } else state.isAuthenticated = action.payload;
    },
    updateBalances: (state, action) => {
      state.balances.copper = action.payload.balances.copper;
      state.balances.silver = action.payload.balances.silver;
      state.balances.gold = action.payload.balances.gold;
    },
  },
});

export const {
  setAuthenticated,
  checkifAuthenticated,
  connected,
  updateBalances,
} = AuthSlice.actions;

export default AuthSlice.reducer;
