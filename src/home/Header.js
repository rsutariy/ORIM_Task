import React, { Component } from "react";
import { BrowserRouter, Link, Router, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { render } from 'react-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let body = (
            <header className="App-header">
                <h1 className="App-title">Welcome to ORIM's Library</h1>
            </header>

        );
        return body;
    }
}
export default Header;