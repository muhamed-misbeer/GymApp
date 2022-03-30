import React from 'react';
import {View,Text} from 'react-native'
import Dashboard from './src/screens/dashboard';
import Login from './src/screens/login';
import Map from './src/screens/map';
const App = () => {

  return (
    <View>
      <Login/>
      <Dashboard/>
    </View>
  );
};

export default App;
