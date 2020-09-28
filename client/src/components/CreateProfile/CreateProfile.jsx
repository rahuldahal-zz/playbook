import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreateProfile extends Component {
  state = {};
  render() {
    return (
      <section>
        <h1>Will create profile now...</h1>
        <Link to="/" className="btn">
          Home
        </Link>
      </section>
    );
  }
}

export default CreateProfile;
