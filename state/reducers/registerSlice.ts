
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    // s: (CommunityName)[];
    name: string ;
    id: string; //id is RollNo in our case
    email : string; 
    error: string | null;
    loading : boolean ;
    
  }
  
  const initialState: SearchState = {
    name: "" ,
    id: "" ,
    email: "",
    error:  null ,
    loading : false ,
  };

  export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {

      // Add a reducer to set an error message
      setUser(state, action){
        state.name=action.payload.name;
        state.id = action.payload.id;
        state.email = action.payload.email;
      },

      setError(state, action) {
        state.error = action.payload;
      },

      setLoading(state, action) {
        state.loading = action.payload;
      },

      clearRegister(state){
        state.name= "";
        state.id = "";
        state.email = "";
        state.error= null;
        state.loading = false;
      },

      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setUser, setError, clearRegister, setLoading} = registerSlice.actions;


export default registerSlice.reducer;
