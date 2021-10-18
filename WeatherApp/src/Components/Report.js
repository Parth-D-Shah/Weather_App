import React from "react";
import "../css/Report.css";
import Menu from "./Menu.js";
function Report() {
  return (
    <div>
      <div
        style={{ height: "812px", width: "452px", backgroundColor: "#cc6868" }}
      >
        <Menu />
        <br />
        <br />
        <br />
        <h2 style={{ color: "black" }}>
          To report a problem or feedback please send an email{" "}
        </h2>{" "}
        <h3 style={{ color: "white" }}>
          Report to:{" "}
          <a href="mailto:testing@gmail.com" className="link">
            {" "}
            WeatherApp@gmail.com
          </a>
        </h3>
      </div>
    </div>
  );
}

export default Report;
