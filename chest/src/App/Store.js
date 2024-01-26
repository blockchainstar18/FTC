import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Actions/AuthSlice";
import GameReducer from "../Actions/GameSlice";

export const store = configureStore({
  reducer: {
    account: AuthReducer,
    game: GameReducer,
  },
});
