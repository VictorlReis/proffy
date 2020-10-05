import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';


export default function Routes() {
    return (
       <Switch>
           <Route exact path="/" component={Login} />
           <Route exact path="/landing" component={Landing} />
           <Route exact path="/study" component={TeacherList} />
           <Route exact path="/give-classes" component={TeacherForm} />
       </Switch>
    );
}
