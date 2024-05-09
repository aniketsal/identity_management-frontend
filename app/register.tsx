// import  { useState,useEffect } from 'react';
// import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
// import { RootState, AppDispatch } from '@/state/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearRegister, setError, setLoading,setUser } from "@/state/reducers/registerSlice";
// import { useNavigation } from '@react-navigation/native';
// import { register_student } from '../actions/register_student';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";




// const register = () => {

//   const navigation = useNavigation(); // Get the navigation object
//  const name = useSelector((state: RootState) => state.register.name);
//  const id = useSelector((state: RootState) => state.register.id);
//  const email = useSelector((state:RootState) => state.register.email);
//  const token = useSelector((state:RootState) => state.auth.token);
 
//  const [department, setDepartment] = useState('');
//  const [password, setPassword] = useState('');
//  const dispatch = useDispatch<AppDispatch>();
//  const [mobilenumber,setMobileNumber] = useState('');
//  const [message, setMessage] = useState("");

//  useEffect(() => {
//   navigation.setOptions({
//     headerShown: false, // Hide the entire header
//   });
// }, [navigation]);

//  const logout = async() => {
//   setDepartment("");
//   setMobileNumber("");
//   setPassword("");
//   setMessage("");
//   dispatch(clearRegister())
//   await GoogleSignin.revokeAccess();
//   await GoogleSignin.signOut();
// };


//   // useEffect(()=>{
//   //   console.log({token})
//   //   if(token)
//   //     navigation.navigate('login');
//   // },[token])

//   const handleSubmit = () => {
//     console.log(password);
//     if(!password || password.length <8) {
//       logout();
//       return;
//     }
//     if (!department || !mobilenumber) {
//       setMessage("Please fill in all the required fields.");
//       logout();
//       return;
//     }
//     logout();
//     dispatch(register_student(name,id,email,department,password,mobilenumber,navigation));
//  };

//  return (
//     <View style={styles.container}>
//       <Text style={styles.title}>University Registration</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Roll Number"
//         value={id}
//         editable={false}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Department"
//         value={department}
//         onChangeText={setDepartment}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         //onChangeText={setPassword}
//         secureTextEntry={true}
//         onChangeText={(newValue) =>{
//           setPassword(newValue)
//           if(newValue.length < 8){
//             setMessage("Password must be of length atleast 8");
//           }
//           else{
//             setMessage("");
//           }
//         }}
//       />
//       <TextInput
//           style={styles.input}
//           placeholder="Mobile Number"
//           value={mobilenumber}
//           onChangeText={(newValue) => {
//               // Regular expression to match a 10-digit number
//               const mobileNumberPattern = /^\d{10}$/;
//               setMobileNumber(newValue);
//               // Check if the new value matches the pattern
//               if (!mobileNumberPattern.test(newValue)) {
//                 // Optionally, clear any error message related to the mobile number
//                 setMessage("Please enter a valid 10-digit mobile number.");
//               } else {
//                 setMessage("");
//               }
//           }}
// />

//       {message && <Text style={{color:"red"}} >{message}</Text>}
//       <Button title="Register" onPress={handleSubmit} />
//     </View>
//  );
// };

// const styles = StyleSheet.create({
//  container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//  },
//  title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//  },
//  input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//  },
// });

// export default register;
import { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { RootState, AppDispatch } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegister, setError, setLoading, setUser } from "@/state/reducers/registerSlice";
import { useNavigation } from '@react-navigation/native';
import { register_student } from '../actions/register_student';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const Register = () => {
  const name = useSelector((state: RootState) => state.register.name);
  const id = useSelector((state: RootState) => state.register.id);
  const email = useSelector((state: RootState) => state.register.email);
  const token = useSelector((state: RootState) => state.auth.token);

  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [mobilenumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState("");

  const logout = async () => {
    setDepartment("");
    setMobileNumber("");
    setPassword("");
    setMessage("");
    dispatch(clearRegister())
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  };

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log(password);
    if (!password || password.length < 8) {
      setMessage("Password must be of length at least 8");
      return;
    }

    logout();
    dispatch(register_student(name, id, email, department, password, mobilenumber, navigation));
  };

  // Check if all required fields are present
  const areAllFieldsPresent = department && password && mobilenumber;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>University Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={id}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={setDepartment}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(newValue) => {
          setPassword(newValue)
          if (newValue.length < 8) {
            setMessage("Password must be of length at least 8");
          } else {
            setMessage("");
          }
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobilenumber}
        onChangeText={(newValue) => {
          const mobileNumberPattern = /^\d{10}$/;
          setMobileNumber(newValue);
          if (!mobileNumberPattern.test(newValue)) {
            setMessage("Please enter a valid 10-digit mobile number.");
          } else {
            setMessage("");
          }
        }}
      />

{message && <Text style={{ color: "red" }}>{message}</Text>}
      <Button
        title="Register"
        onPress={areAllFieldsPresent ? handleSubmit : null}
        disabled={!areAllFieldsPresent}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Register;
