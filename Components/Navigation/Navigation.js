import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

import RouteStackNavigator from './RouteStackNavigator';
import AppStackNavigator from './AppStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {
  const [mytoken, setMyToken] = useState('');
  let getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      setMyToken(token);
    } catch (error) {
      console.log('Error----', error);
    }
    forceUpdate();
  };

  useEffect(() => {
    getToken();
  }, []);
  return (
    <NavigationContainer independent={true}>
      {mytoken?.length > 0 && mytoken != null ? (
        <AppStackNavigator />
      ) : (
        <RouteStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
