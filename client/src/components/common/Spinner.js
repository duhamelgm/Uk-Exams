import React from "react";
import spinner from "../../assets/gif/loader.gif";

export default () => {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
      <img
        src={spinner}
        style={{
          width: "200px",
          margin: "auto",
          display: "block"
        }}
        alt="Loading..."
      />
    </div>
  );
};
