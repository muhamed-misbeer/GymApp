import React, {useState, useEffect} from "react";
import auth from '@react-native-firebase/auth'
import { useDispatch } from "react-redux";
import { LOGIN, LOGOUT } from "./redux/action/types";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
      auth().onAuthStateChanged((user) => {
        if(user){
          let data={
            displayName:user.displayName,
            email:user.email,
            uid:user.uid,
            avatarUrl:user.photoURL!==null?user.photoURL:""
        }
        console.log(data)
          dispatch({type:LOGIN,payload:data})
          setCurrentUser(user)
          setPending(false)
        }else{
          dispatch({type:LOGOUT,payload:{}})
        }
      });
    }, []);
    return (
      <AuthContext.Provider
        value={{
          currentUser
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };