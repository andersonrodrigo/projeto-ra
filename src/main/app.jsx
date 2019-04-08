import React from 'react'
import './app.css' 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Logo from '../components/templates/logo'
import Nav from '../components/templates/nav'
import Home from '../components/home/home'
import BancoCrud from '../components/banco/banco-crud';
import BancoGrid from '../components/banco/banco-grid';

import Empenho from '../components/empenho/empenho-crud';

import Footer from '../components/templates/footer'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
export default  props =>
 <div className="app">
    <BrowserRouter>
      <Logo/>
         <Nav/>
      <Switch>
         <Route exact path="/" component={Home}/>
         <Route exact path="/bancos" component={BancoCrud} />
         <Route exact path="/bancosgrid" component={BancoGrid} />
         <Route exact path="/empenho" component={Empenho} />
         <Redirect from="*" to="/" />
      </Switch>
   </BrowserRouter>
    <Footer/>
 </div>
