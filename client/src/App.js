import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import LandingPage from './landingPage.js';
import Home from './home.js';
import EndGame from './endGame.js';

class App extends Component {
  render() {
    return (
      <div id="background">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous/"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"/>

      <Switch>
      <Route path ='/' component={LandingPage}/>
      <Route path ='/about' component={Home}/>
      <Route path ='/endgame' component={EndGame}/>
      </Switch>
      </div>
    );
  }
}

export default App;
