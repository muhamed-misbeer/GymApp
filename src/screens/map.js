import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Map() {
  const [mapLocation, setLocation] = useState({
    latitude: 11.940904,
    longitude: 79.805717
  })
  const [marker, setMarker] = useState([
    { latitude: 11.936221, longitude: 79.758420 },
    { latitude: 11.911663, longitude: 79.756795 },
    { latitude: 11.941585, longitude: 79.808480 },
    { latitude: 11.940904, longitude: 79.805717 },
    { latitude: 11.939819, longitude: 79.810012 },
    { latitude: 11.940666, longitude: 79.808841 },
    { latitude: 11.916064, longitude: 79.812325 },
  ])
  const handleLocation = () => {
    Geolocation.getCurrentPosition(data => {
      let value = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      }
      console.log(value)
      setLocation(value)
    })
  }
  return (
    <View>
      <View style={{position:"relative"}}>
        <MapView
          mapType="standard"
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsIndoors={true}
          style={{ width: 500, height: 500 }}
          region={{
            latitude: mapLocation.latitude,
            longitude: mapLocation.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {marker.map((item, index) => (
            <Marker
              key={index}
              coordinate={item}
              title={"JavaTpoint"}
              description={"Java Training Institute"}

            />
          ))}
        </MapView>
        <TouchableOpacity onPress={handleLocation} style={{position:"absolute",bottom:10,right:10}}>
          <MaterialCommunityIcons name="crosshairs-gps" size={20}/>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

});  