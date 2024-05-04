
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    // s: (CommunityName)[];
    
    rollno: string; //id is RollNo in our case
    password : string; 
    error: string | null;
    loading : boolean ;
  }
  
  const initialState: SearchState = {
    
    rollno: "" ,
    password: "",
    error:  null ,
    loading : false ,
  };

  export const registerSlice = createSlice({
    name: "login",
    initialState,
    reducers: {

      // Add a reducer to set an error message
      setUser(state, action){
        state.rollno=action.payload.name;
        state.password = action.payload.id;
        
      },

      setError(state, action) {
        state.error = action.payload;
      },

      setLoading(state, action) {
        state.loading = action.payload;
      },

      clearLogin(state){
        state.rollno= "";
        state.password = "";
      },

      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setUser, setError, clearLogin, setLoading} = registerSlice.actions;


export default registerSlice.reducer;
