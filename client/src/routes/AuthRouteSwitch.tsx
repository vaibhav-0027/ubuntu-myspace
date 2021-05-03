import React from 'react'
import { Route, Switch } from 'react-router'
import LoginPage from '../Screens/LoginPage'
import SignupPage from '../Screens/SignupPage'

const AuthRouteSwitch = () => {
    return (
        <Switch>
            <Route exact path="/login" >
                <LoginPage />
            </Route>

            <Route exact path="/signup" >
                <SignupPage />
            </Route>
        </Switch>
    )
}

export default AuthRouteSwitch
