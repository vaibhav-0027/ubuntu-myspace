import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import { getUserAccessToken, setUserAccessToken } from '../helpers/authentication';
import dash_api from '../helpers/dash_api';
interface ProtectedRouteProps {
    path: string;
    component: any;
    exact?: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    
    const { path, component, exact } = props;
    const history = useHistory();

    const token = getUserAccessToken();

    useEffect(() => {

        dash_api.get('/auth/verify').then((res) => {
            if(res.data.status === 401) {
                setUserAccessToken("");
                return history.push("/login")
            }
        });

    }, [history]);

    if(!token) {
        return <Redirect to="/login" />
    }
    
    return (
        <div>
            <Route 
                exact={exact}
                path={path}
                component={component}
            />
        </div>
    )
}

export default ProtectedRoute
