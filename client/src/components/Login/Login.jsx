import React, { Component } from "react";
import LinkBtn from "../LinkBtn/LinkBtn";

class Login extends Component {
  render() {
    return (
      <section className="login">
        <h1 className="login__heading">Hey, welcome to PlayBook.</h1>
        <p className="login__subHeading">
          Choose your desired method to log in and save a seat now.
        </p>

        <div className="login__links">
          <LinkBtn
            to="api/auth/facebook"
            text="Facebook"
            className="login__link"
          />
          <LinkBtn to="api/auth/google" text="Google" className="login__link" />
          <LinkBtn to="api/auth/email" text="Email" className="login__link" />
        </div>
      </section>
    );
  }
}

export default Login;
