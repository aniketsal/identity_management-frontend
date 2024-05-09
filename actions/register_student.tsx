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


export const register_student = (name: string, rollno: string, email: string,department: string,password:string,mobilenumber:string,navigation:any) =>  {
 
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
    } catch (error) {
      // console.log(error.message);
      // dispatch(setError(error.message));
    }
  }

  
};