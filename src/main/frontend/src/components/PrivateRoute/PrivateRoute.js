import React, {Component} from 'react';
import './PrivateRoute.css';
import {Redirect, Route} from "react-router-dom";

function PrivateRoute ({component: Component, authorizedAdmin, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authorizedAdmin === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/admin', state: {from: props.location}}} />}
        />
    )
}


export default PrivateRoute;
