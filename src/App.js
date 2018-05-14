import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import home from './home/Home';
import search from './book/Search';
import book from './book/index';
class App extends Component {

  render() {

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-body">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={home} />
              <Route path="/page/:page" component={book} />
              <Route path="/book_search/:search" component={search} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
