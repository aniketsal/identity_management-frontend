import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setLoading, clearLogin } from "@/state/reducers/loginSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { BASE_URL, REGISTER_STUDENT, LOGIN_STUDENT } from "@/constants/Urls";
import { RootState, AppDispatch } from '@/state/store';
import { Alert } from 'react-native';
import { saveToken } from "@/state/reducers/authSlice";
export const login_student = (rollno: string, password: string) => {
 return async (dispatch: any) => {
    dispatch(setLoading(true));
    const formData = new URLSearchParams();
    formData.append("RollNo", rollno);
    formData.append("Password", password);
    try {
      console.log("hit");
      const response = await axios.post(LOGIN_STUDENT,formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log(response);
      if (response.status === 200) {
        console.log(response.data.jwttoken);
        const token = response.data.token;

        // Dispatch the saveToken action to save the JWT token in the Redux store
        dispatch(saveToken(token));
        
        Alert.alert('Login Successfully!', 'ok');
        console.log("login success");
        dispatch(clearLogin());
      } else {
        Alert.alert('Invalid password or rollno!', 'Enter correct credentials');
        console.log("Invalid password or rollno!");
        dispatch(clearLogin());
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
    }
 }
};