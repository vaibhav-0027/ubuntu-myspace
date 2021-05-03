import React from 'react'
import AuthRouteSwitch from './AuthRouteSwitch'
import MainRouteSwitch from './MainRouteSwitch'

const MainRoute = () => {
    return (
        <React.Fragment>
            <AuthRouteSwitch />
            <MainRouteSwitch />
        </React.Fragment>
    )
}

export default MainRoute
