import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setLoading, clearLogin } from "@/state/reducers/loginSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { BASE_URL, REGISTER_STUDENT, LOGIN_STUDENT, GET_STUDENTDETAILS } from "@/constants/Urls";
import { RootState, AppDispatch } from '@/state/store';
import { Alert } from 'react-native';
import { saveToken } from "@/state/reducers/authSlice";
import { setUserDetails } from "@/state/reducers/UserDetailSlice";
export const login_student = (rollno: string, password: string, navigation: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const formData = new URLSearchParams();
    formData.append("RollNo", rollno);
    formData.append("Password", password);

    try {
      console.log("hit");
      const response = await axios.post(LOGIN_STUDENT, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response);

      if (response.status === 200) {
        console.log(response.data.jwttoken);
        const token = response.data.jwttoken;

        // Dispatch the saveToken action to save the JWT token in the Redux store
        dispatch(saveToken(token));
        console.log(rollno,token);
        // Make another API call to fetch student details
        const studentResponse = await axios.get(
          `${GET_STUDENTDETAILS}?RollNo=${rollno}`,
          {
            headers: {
              'jwttoken': `${token}`,
            },
          }
        );
        console.log(studentResponse);
        
        if (studentResponse.status == 200) {
          const studentDetails = studentResponse.data;
          console.log(studentDetails);
          dispatch(clearLogin());
          dispatch(setUserDetails(studentDetails));    
          console.log("login success");
          // navigation.navigate('user_profile');
          navigation.navigate('user_profile', { showBackButton: false });

        } else {
          Alert.alert('Failed to fetch student details', 'Please try again later');
          console.log("Failed to fetch student details");
          dispatch(clearLogin());
        }
      } else {
        Alert.alert('Invalid password or rollno!', 'Enter correct credentials');
        console.log("Invalid password or rollno!");
        dispatch(clearLogin());
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
    }
  };
};