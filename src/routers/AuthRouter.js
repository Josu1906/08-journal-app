import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen } from '../Components/auth/LoginScreen'
import { RegisterScreen } from '../Components/auth/RegisterScreen'

export const AuthRouter = () => {
    return (
            <div className="auth__main">
                <div className="auth__box-container">
                    <Switch>
                        <Route exact path="/auth/login" component={LoginScreen}></Route>
                        <Route exact path="/auth/register" component={RegisterScreen}></Route>
                        <Redirect to="/auth/register"></Redirect>
                    </Switch>
                </div>
            </div>
        )
}
