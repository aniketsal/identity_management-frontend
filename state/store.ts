
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./reducers/registerSlice";
import loginReducer from "./reducers/loginSlice";
import forgotpasswordReducer from "./reducers/forgotpasswordSlice";
import authSlice from "./reducers/authSlice";


export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    forgotpassword: forgotpasswordReducer,
    auth: authSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
