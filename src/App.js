import React, { Component } from 'react';
import { Provider } from "react-redux";


import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './utils/theme'
import store from "./store";

import Header from './components/Header';
import Rides from './screens/Rides';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Header/>
            <Rides/>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
