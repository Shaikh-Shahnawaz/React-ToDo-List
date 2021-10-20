import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CustomAuthentication from './CustomAuthentication';


// Its a higher order componnent -->
/// It takes a component as an argument

function Protectedroutes({ component: component, ...rest }) {

    // we are storing token in isAuthenticated. and checking whether token is present or not
    const isAuthenticated = CustomAuthentication()

    return (
        <Route {...rest} render={props => {
            if (isAuthenticated) {
                return <Component  {...props} />
            }
            else {
                return (
                    <Redirect to={{
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }} />
                )
            }
        }} />
    )
}

export default Protectedroutes
