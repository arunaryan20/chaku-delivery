import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../DeliveryScreens/Login';
import Forgot from '../DeliveryScreens/Forgot';
import MainBottom from '../DeliveryScreens/MainBottom';

const Stack = createNativeStackNavigator();

const RouteStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RouteStackNavigator;

const styles = StyleSheet.create({});
