import { login_student } from '@/actions/login_student';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/state/store';
import { useNavigation } from '@react-navigation/native';
import { setForgotPassword, clearForgotPassword } from "@/state/reducers/forgotpasswordSlice";


const LoginScreen = () => {
  const [rollno, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
    
  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', rollno);
    console.log('Password:', password);
    dispatch(login_student(rollno,password)(dispatch, navigation))
  };

  const handleForgotPassword = () => {
    navigation.navigate('signinwithgoogle', { forgot: true });
    // Handle forgot password logic here
    console.log('Forgot Password clicker');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Roll No"
        value={rollno}
        onChangeText={setRollNo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'blue',
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;