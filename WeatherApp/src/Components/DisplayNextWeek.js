import React, { Component } from "react";

export default class Display7Days extends Component {
  icons = (icon) => {
    const icons = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    return (
      <img src={icons} alt="" style={{ width: "85px", marginRight: "10px" }} />
    );
  };

  showDate = (dayTime) => {
    var moment = require("moment");
    var a = new Date();
    a.setTime(1000 * dayTime);
    const date = moment(a).format("dddd").slice(0, 3);
    const dateMonth = moment(a).format(" Do MMMM");
    return [date, dateMonth];
  };

  render(props) {
    const Icon = [
      this.props.day0Icon,
      this.props.day1Icon,
      this.props.day2Icon,
      this.props.day3Icon,
      this.props.day4Icon
    ];
    const Time = [
      this.props.day0Time,
      this.props.day1Time,
      this.props.day2Time,
      this.props.day3Time,
      this.props.day4Time
    ];
    const Temp = [
      this.props.day0Temp,
      this.props.day1Temp,
      this.props.day2Temp,
      this.props.day3Temp,
      this.props.day4Temp
    ];
    return (
      <div>
        {Icon.map((
          Icon,
          index //Loop over the amount of days (5) and print the temperature
        ) => (
          <div
            style={{
              borderRadius: "0px",
              backgroundColor: "#555b6e",
              height: "150px",
              width: "452px"
            }}
          >
            <div
              style={{
                position: "relative",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
              }}
            >
              {this.icons(Icon)}
              <h4 style={{ display: "inline-block", width: "300px" }}>
                {this.showDate(Time[index])}
              </h4>
              <h2 style={{ display: "inline-block", fontWeight: "bold" }}>
                {Math.round(Temp[index])}°
              </h2>
              {index !== 4 ? <hr style={{ borderColor: "white" }} /> : ""}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
