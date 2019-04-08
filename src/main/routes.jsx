import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import Home from '../components/home/home'
import BancoCrud from '../components/banco/banco-crud';

export default props =>
<Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/bancos" component={BancoCrud} />
    <Redirect from="*" to="/" />
</Switch>