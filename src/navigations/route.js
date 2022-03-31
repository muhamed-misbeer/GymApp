import React, { useEffect } from 'react'
import Dashboard from '../screens/dashboard'
import { useSelector } from "react-redux";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Route = () => {
    useEffect(()=>{
        async function fetch(){
            GoogleSignin.configure({
                webClientId: '1005172245853-am4lks54543pb2skjm8pvvb8meitjgcg.apps.googleusercontent.com',
              });
              try {
                await GoogleSignin.hasPlayServices();
                const { accessToken, idToken } = await GoogleSignin.signIn();
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
        if(isAuthendication!==undefined && isAuthendication===false){
            fetch()
        }
    },[])
    const isAuthendication = useSelector((state) => state.auth.isAuthendication)

    return (<>
        {isAuthendication &&
            <Dashboard />
        }
    </>
    )
}

export default Route