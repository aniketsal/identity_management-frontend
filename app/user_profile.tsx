import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Animated, Easing, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/state/store';
import { setUserDetails,clearUserDetails } from "@/state/reducers/UserDetailSlice";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native'


const UserPage = () => {
  const dispatch = useDispatch();
  const animValue = useRef(new Animated.Value(0)).current;
  const cryptokey = useSelector((state: RootState) => state.UserDetail.cryptokey);
  const name = useSelector((state: RootState) => state.UserDetail.name);
  const email = useSelector((state: RootState) => state.UserDetail.email);
  const mobileNumber = useSelector((state: RootState) => state.UserDetail.mobilenumber);
  const department = useSelector((state: RootState) => state.UserDetail.department);
  const navigation = useNavigation(); // Get the navigation object


  

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  }, [animValue]);

 useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the entire header
    });
  }, [navigation]);

  const handleLogout = () => {
    Animated.timing(animValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      dispatch(clearUserDetails());
      navigation.navigate('index');
    });
  };

  const animatedStyle = {
    opacity: animValue,
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <Icon name="user" size={24} color="#333" />
        <Text style={styles.title}>User Information</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>
            <Icon name="user-circle" size={16} color="#333" /> Name: {name}
          </Text>
          <Text style={styles.userInfoText}>
            <Icon name="envelope" size={16} color="#333" /> Email: {email}
          </Text>
          <Text style={styles.userInfoText}>
            <Icon name="mobile" size={16} color="#333" /> Mobile: {mobileNumber}
          </Text>
          <Text style={styles.userInfoText}>
            <Icon name="building" size={16} color="#333" /> Department: {department.toUpperCase()}
          </Text>
          <Text style={styles.userInfoText}>
            <Icon name="key" size={16} color="#333" /> CryptoKey: {cryptokey}
          </Text>
        </View>
      </ScrollView>
      <Button
        title="Logout"
        onPress={handleLogout}
        color="#e53935"
        style={styles.logoutButton}
      />
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  scrollViewContainer: {
    width: '100%',
    paddingBottom: 16,
  },
  userInfoContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 3,
  },
});

export default UserPage;