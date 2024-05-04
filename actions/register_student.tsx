import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setLoading, clearRegister } from "@/state/reducers/registerSlice";
import { Dispatch } from "@reduxjs/toolkit";

import { BASE_URL, REGISTER_STUDENT } from "@/constants/Urls";
import { RootState, AppDispatch } from '@/state/store';
import { Alert } from "react-native";
import { saveToken } from "@/state/reducers/authSlice";
import { useNavigation } from "expo-router";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";


export const register_student = (name: string, rollno: string, email: string,department: string,password:string,mobilenumber:string) =>  {
 
  return async (dispatch:any) => {
    dispatch(setLoading(true));

  //console.log('started');
  const formData = new URLSearchParams();
  formData.append("args", name);
  formData.append("args", email);
  formData.append("args",rollno);
  formData.append("args",department);
  formData.append("args",password);
  formData.append("args",mobilenumber);

  console.log(rollno,department,password,mobilenumber);
    try {
      console.log("hit");
      const response = await axios.post(REGISTER_STUDENT,formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log(response);
      if (response.status === 200) {
        const token = response.data.jwttoken;
        console.log(token);
        // Dispatch the saveToken action to save the JWT token in the Redux store
          dispatch(saveToken(token));
          console.log(response.data.jwttoken);
          Alert.alert("registration Successfull");
          dispatch(clearRegister());
      } else {
        console.log("error");
        Alert.alert("registration failed");
        dispatch(clearRegister());
        throw new Error(response?.data || "Error");
      }
    } catch (error) {
      // console.log(error.message);
      // dispatch(setError(error.message));
    }
  }

  
};