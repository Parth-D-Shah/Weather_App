import React from "react";

export default class DisplayCompareData extends React.Component {
  setImage = (icon) => {
    const icons = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    return <img src={icons} alt="" />;
  };
  // formats the date using 'Moment'
  ShowDate = (dt) => {
    var moment = require("moment");
    var a = new Date();
    a.setTime(1000 * dt);
    const dateMonth = moment(a).format(" Do MMMM");
    return ["Today, ", dateMonth];
  };

  render() {
    return (
      <>
        {/* shows weather forecast in the compare section */}
        {this.props.weatherData.map((item, index) => (
          <div key={index}>
            <h5 style={{ padding: "10px", marginLeft: "2em" }}>
              {" "}
              {item.name} {", "}
              {item.sys.country}
              <br />
              {this.ShowDate(item.dt)}
            </h5>
            <br />
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "45pt", textAlign: "center" }}>
                {" "}
                {Math.round(item.main.temp)}°C
              </h1>
              {this.setImage(item.weather[0].icon)}
              <h1 style={{ textAlign: "center" }}>{item.weather[0].main} </h1>
            </div>
          </div>
        ))}
      </>
    );
  }
}
