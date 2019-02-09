import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './utils/theme'
import store from "./store";

import RideDetails from './pages/RideDetails';
import Header from './components/Header';
import Rides from './pages/Rides';
import CreateRide from './pages/CreateRide/Index';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <Header/>
            <Switch>
              <Route path="/rides/" exact component={() => <Rides/>}/>
              <Route path="/rides/create" exact component={() => <CreateRide/>} />
              <Route path="/rides/:id" exact component={() => <RideDetails/>} />
              <Redirect to="/rides/" />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;

// TO DO spinner