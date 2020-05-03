import React, { Component } from 'react';
import './App.css';
import Info from './components/info'
import Food from './components/food'
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
          <Route exact path='/info'>
            <Info/>
          </Route>
          <Route exact path='/food'>
            <Food/>
          </Route>

          <Route component={AppNotFound}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
