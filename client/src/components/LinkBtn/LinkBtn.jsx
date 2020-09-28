import React from "react";

const LinkBtn = function (props) {
  return (
    <a
      href={props.to}
      className={`btn ${props.className ? props.className : ""}`}
    >
      {props.text}
    </a>
  );
};

export default LinkBtn;
