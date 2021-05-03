import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import MainRoute from './MainRoute';
import store from '../reducers';
import { ToastContainer } from 'react-toastify';

const MainApp = () => {
    return (
        <Provider store={store}>
            <Router>
                <MainRoute />

                <ToastContainer 
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    draggable={false}
                    position="top-right"
                    rtl={false}
                    autoClose={2000}
                />
            </Router>
        </Provider>
    )
}

export default MainApp
