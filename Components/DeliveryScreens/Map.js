import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
const Map = () => {
  return (
    <View>
         <View style={{height:"100%",width:"100%"}}>
           <Text>Hello</Text>
           <MapView
           style={{height:300,width:400}}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
           />
         </View>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})
    