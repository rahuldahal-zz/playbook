import React, { Component } from "react";
import LinkBtn from "../LinkBtn/LinkBtn";

class CreateProfile extends Component {
  state = {};
  render() {
    return (
      <section>
        <h1>Will create profile now...</h1>
        <LinkBtn to="/" text="Back to Home" />
      </section>
    );
  }
}

export default CreateProfile;
