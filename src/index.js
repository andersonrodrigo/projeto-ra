import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Principal from './forms/Principal'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './layout/Footer';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
<BrowserRouter>
<Header></Header>
    <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/banco" component={Principal} />
    </Switch>
<Footer></Footer>
        </BrowserRouter>, document.getElementById('root'));
serviceWorker.unregister();
