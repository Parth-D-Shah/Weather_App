import React, { Component } from "react";
import "../css/NextWeek.css";
import Report from "./Report";
import Contact from "./Contact";
import DisplayOnLoadData from "./DisplayOnLoadData";
import SearchOnHome from "./SearchOnHome";
import Menu from "./Menu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CompareData from "./CompareData.js";
import NextWeek from "./NextWeek.js";

export default class OnLoadData extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      defaultCity: "",
      weatherData: [],
      countryMenu: "",
      changeToF: false
    };
  }

  componentDidMount() {
    //Fetching weather data of current location
    const APIKEY = "THIS_KEY_HAS_BEEN_HIDDEN";
    fetch(
      "https://geolocation-db.com/json/85249190-4601-11eb-9067-21b51bc8dee3" //Use this website to get users current city name
    )
      .then((responseGeo) => responseGeo.json())
      .then((defaultLocation) =>
        this.setState(
          {
            defaultCity: defaultLocation.city
          },
          () => {
            fetch(
              "https://api.openweathermap.org/data/2.5/forecast?q=" + //We then use that city name to fetch openweather api
                this.state.defaultCity +
                "&cnt=39&units=metric&appid=" +
                APIKEY
            )
              .then((responseWeather) => responseWeather.json())
              .then((weatherData) =>
                this.setState({
                  weatherData: [weatherData],
                  countryMenu: weatherData.city.name
                })
              );
          }
        )
      );
  }

  changeToFaren = (changeToF) => {
    this.setState({ changeToF: changeToF });
  };

  updateToSearchData = (weatherData) => {
    //This is the function used as a prop to SearchOnHome component to get the weather data of the search and updating state of weatherData
    this.setState({
      weatherData: weatherData
    });
  };

  convertUnits = (unit) => {
    //This function is used to convert from celsius to farenheit
    if (this.state.changeToF) {
      let fahrenheit = (unit * 9) / 5 + 32;
      return fahrenheit;
    } else {
      return unit;
    }
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <div>
                {this.state.weatherData.map((items, index) => (
                  <Menu
                    key={index}
                    func={this.changeToFaren}
                    country={items.city.name}
                  />
                ))}
                <SearchOnHome getSearchData={this.updateToSearchData} />
                {this.state.weatherData.map((
                  item,
                  index //We pass the data using props to DisplayOnLoad component to view them on home page
                ) => (
                  <DisplayOnLoadData
                    key={index}
                    weathertemp={this.convertUnits(item.list[0].main.temp)}
                    weatherdate={item.list[0].dt}
                    weathertype={item.list[0].weather}
                    weatherhourly0={item.list[0]}
                    weatherhourly1={item.list[1]}
                    weatherhourly2={item.list[2]}
                    weatherhourly3={item.list[3]}
                    country={item.city}
                    changeToFarenheit={this.state.changeToF}
                  />
                ))}
                <CompareData />
              </div>
            </Route>
            <Route exact path="/nextWeek">
              <div>
                <NextWeek weatherData={this.state.weatherData} />
              </div>
            </Route>
            <Route exact path="/Report" component={Report}></Route>
            <Route exact path="/Contact" component={Contact}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
