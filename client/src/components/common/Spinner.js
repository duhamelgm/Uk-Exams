import React from "react";
import spinner from "../../assets/gif/loader.gif";

export default () => {
  return (
    <img
      src={spinner}
      style={{
        width: "200px",
        margin: "auto",
        display: "block"
      }}
      alt="Loading..."
    />
  );
};
