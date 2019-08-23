import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom';

import HomePage from '../components/home/HomePage'
import RouteElement from './RouteElement';
import configureStore from './store/configureStore';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <HashRouter>
          <div>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <RouteElement
                exact
                title="Population"
                path="/home"
                component={HomePage}
              />
            </Switch>  
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
