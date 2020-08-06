import React, {Component} from 'react';
import './PrivateRoute.css';
import {Redirect, Route} from "react-router-dom";

function PrivateRoute ({component: Component, authorized, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authorized === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/admin', state: {from: props.location}}} />}
        />
    )
}


export default PrivateRoute;
