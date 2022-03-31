import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal:20, paddingVertical: 50, backgroundColor: "#F0EDFC" }}>
      <Image source={require('../assets/images/imgpsh_fullsize.png')} style={{ width: 200, height: 200, resizeMode: "center" }} />
      <Text style={{ fontSize: 26, color: '#304269', fontWeight: "bold" }}>TWILIGHT</Text>
      <Text style={{ fontSize: 18, color: "#45B3B5", fontWeight: "500" }}>HEALTH CARE</Text>
    </View>
  )
}

const styles = StyleSheet.create({})