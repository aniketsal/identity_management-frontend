import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { RootState, AppDispatch } from '@/state/store';
import { setError, setLoading,setUser } from "@/state/reducers/registerSlice";
import { useDispatch, useSelector } from 'react-redux';
import { forgot_password } from '@/actions/forgot_password';
import { saveToken } from '@/state/reducers/authSlice';
import {
   GoogleSignin,
   GoogleSigninButton,
   statusCodes,
 } from "@react-native-google-signin/google-signin";
 import { clearLogin } from "@/state/reducers/loginSlice";
 import { clearRegister } from '@/state/reducers/registerSlice';

const ForgotPasswordScreen = () => {

   const logout = async() => {
      const dispatch = useDispatch<AppDispatch>();
      dispatch(clearRegister());
      dispatch(clearLogin());
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    };



    const [newPassword, setNewPassword] = useState('');
    const id = useSelector((state: RootState) => state.register.id);
    const dispatch = useDispatch<AppDispatch>();
    const handleSubmit = () => {
       console.log('Username:', id);
       console.log('New password:', newPassword);
       logout();
       dispatch(forgot_password(id,newPassword));
       // After handling the submission, you might want to clear the inputs or navigate away
       setNewPassword('');
    };

   //  useEffect(()=>{},[id])
   
    return (
       <View style={styles.container}>
         <Text style={styles.title}>Forgot Password</Text>
         <TextInput
           style={styles.input}
           placeholder="RollNo"
           value={id}
           editable={false}
         />
         <TextInput
           style={styles.input}
           placeholder="New Password"
           secureTextEntry
           value={newPassword}
           onChangeText={setNewPassword}
         />
         <Button title="Submit" onPress={handleSubmit} />
       </View>
    );
   };
   
   const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       paddingHorizontal: 20,
       backgroundColor: '#F5F5F5',
    },
    title: {
       fontSize: 24,
       fontWeight: 'bold',
       marginBottom: 20,
       textAlign: 'center',
    },
    input: {
       height: 40,
       borderColor: '#D3D3D3',
       borderWidth: 1,
       borderRadius: 5,
       marginBottom: 20,
       paddingLeft: 10,
       backgroundColor: '#FFF',
    },
   });
   
   export default ForgotPasswordScreen;