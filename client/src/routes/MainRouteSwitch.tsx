import React from 'react'
import { Switch } from 'react-router'
import LandingPage from '../Screens/LandingPage'
import ProtectedRoute from './ProtectedRoute'

const MainRouteSwitch = () => {
    return (
        <Switch>

            <ProtectedRoute 
                exact
                path="/"
                component={LandingPage}
            />

            <ProtectedRoute 
                exact
                path="/home"
                component={LandingPage}
            />

            {/* <Redirect 
                from="/"
                to="/home"
            /> */}
        </Switch>
    )
}

export default MainRouteSwitch
