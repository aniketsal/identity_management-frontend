
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    // s: (CommunityName)[];
    
    forgotpassword: boolean; //id is RollNo in our case
  }
  
  const initialState: SearchState = {
    forgotpassword : false,
    
  };

  export const forgotpasswordSlice = createSlice({
    name: "forgotpassword",
    initialState,
    reducers: {

      // Add a reducer to set an error message
      setForgotPassword(state, action){
        state.forgotpassword=action.payload;
      },
     
      clearForgotPassword(state){
        state.forgotpassword= false;
      },

      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setForgotPassword, clearForgotPassword} = forgotpasswordSlice.actions;


export default forgotpasswordSlice.reducer;
