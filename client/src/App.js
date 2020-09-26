import React, { Component } from "react";
import "extended-normalize.css";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Login />
      </div>
    );
  }
}

export default App;
