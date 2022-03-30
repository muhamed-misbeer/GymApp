import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';

export default function Login() {
  const handleClick = () => {
    auth()
      .signInWithEmailAndPassword('muhamed@gmail.com', 'SmartWork')
      .then((response) => {
        console.log(response)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          console.log('Invalid userId and Password')
        }

        console.error(error);
      });
  }
const handleGoogleSign=async()=>{
  GoogleSignin.configure({
    webClientId: '1005172245853-am4lks54543pb2skjm8pvvb8meitjgcg.apps.googleusercontent.com',
});
try {
    await GoogleSignin.hasPlayServices();
    const {accessToken, idToken} = await GoogleSignin.signIn();
    // setloggedIn(true);
    const credential = auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );
    await auth().signInWithCredential(credential);
  } catch (error) {
    console.log(error)
  }
}

return (
  <View>
    <Text>Login</Text>
    <Button title="Click" onPress={handleClick} />
    <Button title="GoogleSign" onPress={handleGoogleSign}/>
  </View>
)
}

const styles = StyleSheet.create({})