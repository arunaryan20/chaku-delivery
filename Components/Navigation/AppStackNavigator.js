import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainBottom from '../DeliveryScreens/MainBottom';
import OrderDetails from '../DeliveryScreens/OrderDetails';
import Map from '../DeliveryScreens/Map';
import Terms from '../DeliveryScreens/Terms';
import OrdCompleted from '../DeliveryScreens/OrdCompleted';
import MyProfile from '../DeliveryScreens/MyProfile';
import Login from '../DeliveryScreens/Login';

const Stack = createNativeStackNavigator();


const AppStackNavigator = () => {
  return (
      <Stack.Navigator>
             
            <Stack.Screen
              name="MainBottom"
              component={MainBottom}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderDetails"
              component={OrderDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Terms"
              component={Terms}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrdCompleted"
              component={OrdCompleted}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyProfile"
              component={MyProfile}
              options={{headerShown: false}}
            />
      </Stack.Navigator>
  )
}

export default AppStackNavigator

const styles = StyleSheet.create({})