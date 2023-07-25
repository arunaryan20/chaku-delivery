import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'

import RouteStackNavigator from './RouteStackNavigator';
import AppStackNavigator from './AppStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {

    const [mytoken, setMyToken] = useState('');
    let getToken = async () => {
        try{
            let token = await AsyncStorage.getItem('token');
            console.log('this token-----', token);
            setMyToken(token);
        }catch(error){
           console.log("Error----",error)
        }
    };
  
    useEffect(() => {
      getToken();
    }, [mytoken]);
  
    console.log('Hello token-------', mytoken);


  return (
         <NavigationContainer>
           {mytoken!="" && mytoken==null && (
               <RouteStackNavigator />
           )}
           {mytoken!="" && mytoken!=null && (
            <AppStackNavigator />
           )}
         </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})