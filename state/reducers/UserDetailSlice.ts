
import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    cryptokey: string;
    name: string;
    department: string;
    email: string;
    mobilenumber: string;
    rollno:string;    
}
  
  const initialState: SearchState = {
    cryptokey : "",
    name : "",
    rollno : "",
    department: "",
    email:"",
    mobilenumber: "",    
  };

  export const UserDetailSlice = createSlice({
    name: "UserDetail",
    initialState,
    reducers: {

      // Add a reducer to set an error message
      setUserDetails(state, action){
        state.name=action.payload.name;
        state.email=action.payload.email;
        state.mobilenumber=action.payload.mobilenumber;
        state.cryptokey=action.payload.cryptokey;
        state.department = action.payload.department;
        state.rollno = action.payload.rollno;
      },
     
      clearUserDetails(state){
        state.name = "";
        state.email = "";
        state.department = "";
        state.mobilenumber = "";
        state.cryptokey = "";
        state.rollno = "";
      },
    },
  });
  
  // Export the actions
export const { setUserDetails, clearUserDetails} = UserDetailSlice.actions;
export default UserDetailSlice.reducer;
