import style from './scss/index.scss';
import App from './containers/App';
import AuthForm from './containers/AuthForm';
import RegForm from './containers/RegForm';
import ReactDOM from 'react-dom';
import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route } from 'react-router-dom'

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <div>
      <Route path="/regForm" component={RegForm}/>
      <Route path="/authForm" component={AuthForm}/>
      <Route exact path="/" component={App}/>
    </div>
  </Router>,
  document.getElementById('root')
);
