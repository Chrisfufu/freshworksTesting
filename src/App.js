import React, { Component } from 'react';
import Button from 'antd/es/button';
import './App.css';
import connect from 'redux-connect-decorator'
import Home from './components/home'
import AppNotFound from './components/notFound'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>

          <Route component={AppNotFound}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
