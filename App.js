import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import { Provider } from 'react-redux';
import { AuthProvider } from './src/authProvider';
import Route from './src/navigations/route';
import store from './src/redux/store/store';
import SplashScreen from './src/screens/splashScreen';
const App = () => {
  const [isSlapsh, setIsSplash] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Provider store={store}>
      <AuthProvider>
        {isSlapsh ?
          <SplashScreen/>
          :
          <Route />
        }
      </AuthProvider>
    </Provider>

  );
};

export default App;
