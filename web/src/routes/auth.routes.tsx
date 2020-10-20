import React, { Component, useContext } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';


const AuthRoutes: React.FC = () => (
       <BrowserRouter>
                <Route path="/" component={Login} />
       </BrowserRouter>
);

export default AuthRoutes;