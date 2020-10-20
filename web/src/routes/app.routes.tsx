import React, { Component, useContext } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';


const AppRoutes: React.FC = () => (        
        <BrowserRouter>
                <Route path="/" component={Landing} />                
        </BrowserRouter>
);

export default AppRoutes;