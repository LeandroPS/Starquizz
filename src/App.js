import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import InitialScreen from './Pages/InitialScreen';

class App extends Component {

  constructor(){
    super();
    this.state = {
        pageBeingShown: 0
    }
  }

  openPage(num){
    this.props.openPage({pageBeingShown: num});
  }

  render() {
    const {pageBeingShown} = this.state;

    return (
      <div className="App">
        {pageBeingShown===0&&<InitialScreen/>}
      </div>
    );
  }
}

export default App;
