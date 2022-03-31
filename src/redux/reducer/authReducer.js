import { ADD_USER, LOGIN, LOGOUT } from "../action/types";

const initial_state={
    UserDetails:[],
    user:{},
    isAuthendication:false
}

export default function(state=initial_state,action){
    const {type,payload}=action;
    switch(type){
        case ADD_USER:
            return {...state,UserDetails:payload}
        case LOGIN:
            return {...state,isAuthendication:true,user:payload}
        case LOGOUT:
            return {...state,isAuthendication:false, user:{}}
        default:
            return state;
    }
}