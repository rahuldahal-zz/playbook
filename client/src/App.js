import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "extended-normalize.css";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import CreateProfile from "./components/CreateProfile/CreateProfile";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main className="App">
          <Route path="/" exact component={Header} />
          <Route path="/" exact component={Login} />
          <Route path="/create-profile" exact component={CreateProfile} />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
