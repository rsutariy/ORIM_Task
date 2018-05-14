import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import search from './Search';
import Books from './Books';

class Book extends Component {

  render() {
    
    return (
      <div className="book-page">
        <BrowserRouter>
          <Switch>
            <Route path={`/page/:page`} component={Books} />
            <Route path="/book_search/:search" component={search} />
            <Redirect from="/" to={`/page/0`} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};

export default Book;