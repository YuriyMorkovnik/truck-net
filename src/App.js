import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './utils/theme'

import Header from './components/Header';
import Rides from './screens/Rides';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
            <Header/>
            <Rides/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
