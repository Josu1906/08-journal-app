import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { JournalScreen } from '../Components/Jurnal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import {firebase} from '../firebase/config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PrivatesRoutes } from './PrivatesRoutes'
import { PublicRoutes } from './PublicRoutes'
import { loadNotes } from '../helpers/loadNotes'
import { setNotes, starLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setchecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            console.log(user);

            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);


            //   const notes = await loadNotes(user.uid);    
            //   dispatch( setNotes(notes) );
            dispatch(starLoadingNotes(user.uid))
            }else{
                setIsLoggedIn(false);
            }

            setchecking(false);
        })
    }, [dispatch, setchecking, setIsLoggedIn])

    if(checking){
        return(
            <>
            <i className="fas fa-spinner fa-4x fa-spin mt-5 spinner19"></i>
            <h3 className="h3">Por favor, espere...</h3>            
            </>
            )
    }

    return (
        <Router>
            <div>
                <Switch>
                <PublicRoutes path="/auth" component={AuthRouter} isAuth={isLoggedIn}/>
                <PrivatesRoutes exact path="/" component={JournalScreen} isAuth={isLoggedIn}/>
                </Switch>
            </div>
        </Router>
    )
}
