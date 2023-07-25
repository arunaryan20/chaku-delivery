import {StyleSheet, Text, View, Image,BackHandler,Alert} from 'react-native'
import React,{useEffect} from 'react'

import Home from './Home'
import MyProfile from './MyProfile'
import OrdCompleted from './OrdCompleted'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

const MainBottom = ({navigation,route}) => {

 


  // const token=route.params.token;
  return (
    <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true,}}>
      <Tab.Screen
        name='Home'
        component={Home}
       
        // initialParams={{token:token}}
        options={{
          tabBarStyle:{backgroundColor:"grey"},
          headerShown: false,
          tabBarActiveTintColor:"white",
          tabBarInactiveTintColor:"black",
        
          tabBarIcon: () => (
            <Image
              source={require('../../Assets/icons/home1.png')}
              style={{height: 30, width: 30}}
            />
          ),
        }}
      />



      <Tab.Screen
        name='Order Completed'
        component={OrdCompleted}
       
        // initialParams={{token:token}}
        options={{
          tabBarStyle:{backgroundColor:"grey"},
          headerShown: false,
          tabBarActiveTintColor:"white",
          tabBarInactiveTintColor:"black",
        
          tabBarIcon: () => (
            <Image
              source={require('../../Assets/icons/submit.png')}
              style={{height: 30, width: 30,}}
            />
          ),
        }}
      />



      <Tab.Screen
        name='MyProfile'
        component={MyProfile}
        options={{
          
          tabBarStyle:{backgroundColor:"grey"},
          headerShown: false,
          tabBarActiveTintColor:"white",
          tabBarInactiveTintColor:"black",
          tabBarIcon: () => (
            <Image
              source={require('../../Assets/icons/user1.png')}
              style={{height: 30, width: 30}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainBottom

const styles = StyleSheet.create({})
