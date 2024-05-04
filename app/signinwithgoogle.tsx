import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { RootState, AppDispatch } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegister, setError, setLoading,setUser } from "@/state/reducers/registerSlice";
import { setForgotPassword,clearForgotPassword } from "@/state/reducers/forgotpasswordSlice";
import { useNavigation, useRoute } from '@react-navigation/native';
import { clearLogin } from "@/state/reducers/loginSlice";


export default function TabOneScreen(props:any) {
  const [userInfo, setUserInfo] = useState();
  const navigation = useNavigation();
  const route = useRoute()
  const [redirect, setRedirect] = useState(false); // State to control redirection
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.register.error);
  const loading = useSelector((state: RootState) => state.register.loading);
  const id = useSelector((state: RootState) => state.register.id);
  const email = useSelector((state: RootState) => state.register.email);
  
  const forgotPassword = useSelector((state: RootState) => state.forgotpassword.forgotpassword);


  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:"758151940704-p1t47tqfe7k131pv4pnm3dicj5fkcg6k.apps.googleusercontent.com",
      androidClientId:"758151940704-gps5h8368rklf3olm22g19716uga7bn9.apps.googleusercontent.com",
      // iosClientId:"72307864794-1vuq2apibl4tg6on2f2nmoq5vul3ltvq.apps.googleusercontent.com",
    });
  };

  useEffect(() => {
    if (email.split('@')[1] == "smail.iitm.ac.in") {
      console.log(email.split('@')[1])
        if(route?.params?.forgot){
          logout();
        navigation.navigate('forgotpassword');
        dispatch(clearForgotPassword());
      }
      else{
        navigation.navigate('register');
      }
    }
  }, [id]);


  useEffect(() => {
    configureGoogleSignIn();
  });

  const signIn = async () => {
    console.log("Pressed sign in");
    dispatch(setLoading(true)); 
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      const student_name = userInfo.user.givenName;
      const student_rollno = userInfo.user.familyName;
      const student_email = userInfo.user.email;
      dispatch(setUser({name:student_name, id:student_rollno, email:student_email}));
      dispatch(setError(null));

      const emailDomain = userInfo.user.email.split('@')[1];
      if(emailDomain == "smail.iitm.ac.in" || emailDomain.endsWith("iitm.ac.in")){
        setRedirect(true);
        console.log("email verified");
        console.log(redirect);
      }
      else{
        // setError(new Error("Email domain does not match. Please sign in with an email from yourdomain.com."));
        console.log("email not verified. Use iitm.ac.in");
        navigation.navigate('two')
        logout();
        setRedirect(false);
        console.log(redirect);
      }
    } catch (e) {
      dispatch(setError(e))
      // setError(e);
      dispatch(setLoading(false))
    }
  };
  

  const logout = () => {
    // dispatch(clearRegister());
    // dispatch(clearLogin());
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View style={styles.container}>
      {/* r<Text>{JSON.stringify(error)}</Text> */}
      {/* {userInfo && <Text>{JSON.stringify(userInfo.user,null,2)}</Text>} */}
      {/* {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : ( */}
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          
        />
      {/* r */}
      {redirect && <Link href = "/register" />} 
      {loading && <ActivityIndicator/> }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
