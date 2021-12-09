import Swal from 'sweetalert2'
import { types } from "../types/types";
import { firebase } from "../firebase/config";

import { googleAuthProvider } from "../firebase/config";
import { uiEndLoading, uiStartLoading } from "./ui";
import { notesLogOut } from './notes';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(uiStartLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(login(user.uid, user.displayName))
                dispatch(uiEndLoading());
            }).catch(e => {
                dispatch(uiEndLoading());
                Swal.fire('Fail', e.message, 'error');         
            })
    }
}

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({user}) => {
            await user.updateProfile({displayName: name});
            dispatch(login(user.uid, user.displayName))
        }).catch(e => Swal.fire('Fail', e.message, 'error'))
    }
}

export const startGoogleLogin =  () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then(({user, }) => {
            dispatch(login(user.uid, user.displayName))
        })     
    }
}

export const login = (uid, displayName) => (
    {
        type: types.login,
        payload: { 
            uid, 
            displayName 
        }
    }
)

export const startLogOut = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout())
        dispatch(notesLogOut());
    }
}

export const logout = () => ({
    type: types.logout
})