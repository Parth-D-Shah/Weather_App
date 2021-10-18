import React, { Component } from "react";
import DisplayNextWeek from "./DisplayNextWeek";
import { Link } from "react-router-dom";

export default class NextWeek extends Component {
  render() {
    return (
      <>
        <div
          style={{
            paddingTop: "15px",
            backgroundColor: "#cc6868",
            width: "452px"
          }}
        >
          {this.props.weatherData.map((item, index) => (
            <div style={{ display: "inline-block", width: "90%" }}>
              <h3
                key={index}
                style={{
                  color: "white",
                  height: "28px",
                  marginBottom: "20px"
                }}
              >
                <Link to="/">
                  <img
                    style={{ marginRight: "10px" }}
                    src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/27-512.png"
                    width="25"
                    height="25"
                    alt=""
                  />
                </Link>
                {/* Name of the city shown on top in next week page */}
                {item.city.name}
              </h3>
              {/* Passing next week data (5days with time,temp and icon) */}
              <DisplayNextWeek
                key={index}
                day0Time={item.list[0].dt}
                day0Temp={item.list[0].main.temp}
                day0Icon={item.list[0].weather[0].icon}
                day1Time={item.list[8].dt}
                day1Temp={item.list[8].main.temp}
                day1Icon={item.list[8].weather[0].icon}
                day2Time={item.list[16].dt}
                day2Temp={item.list[16].main.temp}
                day2Icon={item.list[16].weather[0].icon}
                day3Time={item.list[24].dt}
                day3Temp={item.list[24].main.temp}
                day3Icon={item.list[24].weather[0].icon}
                day4Time={item.list[32].dt}
                day4Temp={item.list[32].main.temp}
                day4Icon={item.list[32].weather[0].icon}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}
