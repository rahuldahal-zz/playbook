import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h3>My PlayBook</h3>
        <nav className="nav">
          <ul>
            <li className="nav__listItem">About</li>
            <li className="nav__listItem">Team</li>
            <li className="nav__listItem">Contact</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
