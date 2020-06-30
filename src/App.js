import React, { Component } from 'react';
import './App.css';
import Info from './components/info'
import AddInfo from './components/addInfo'
import RefreshKey from './components/refresh'
import AppNotFound from './components/notFound'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Info/>
          </Route>
          <Route exact path='/addInfo'>
            <AddInfo/>
          </Route>
          <Route exact path='/refreshInfo'>
            <RefreshKey/>
          </Route>
          <Route component={AppNotFound}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
