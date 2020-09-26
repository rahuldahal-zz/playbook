import React from "react";

const LinkBtn = (props) => {
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
