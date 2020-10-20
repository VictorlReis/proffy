import React, { Component, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

import Context from '../Context/AuthContext';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';


const Routes: React.FC = () => {
  const {signed} = useContext(AuthContext);

  return signed ? <AppRoutes/> : <AuthRoutes/>;
}

export default Routes;