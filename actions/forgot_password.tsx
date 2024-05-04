import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { setError, setLoading, clearRegister } from "@/state/reducers/registerSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, FORGOT_PASSWORD } from "@/constants/Urls";
import { RootState, AppDispatch } from '@/state/store';
import { saveToken } from "@/state/reducers/authSlice";
import { clearRegister } from "@/state/reducers/registerSlice";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { clearLogin } from "@/state/reducers/loginSlice";


export const forgot_password = (rollno: string, newpassword:string) =>  {
  
  return async (dispatch:any) => {
  //console.log('started');
  const formData = new URLSearchParams();
  formData.append("RollNo",rollno);
  formData.append("newPassword",newpassword);
  console.log(rollno,newpassword);
    try {
      console.log("hit");
      const response = await axios.post(FORGOT_PASSWORD,formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'jwttoken':saveToken,
          },
        });
        console.log(response);
      if (response.status == 200) {
          console.log("password updated successfully");
          Alert.alert("password updated successfully");
          dispatch(clearLogin());
          dispatch(clearRegister());
      } else {
        console.log("error");
        Alert.alert("failed");
        throw new Error(response?.data || "Error");
      }
    } catch (error) {
      // console.log(error.message);
      // dispatch(setError(error.message));
    }
  }
};