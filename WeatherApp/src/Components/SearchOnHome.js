import React, { Component } from "react";
import "../css/SearchOnHome.css";

export default class SearchOnHome extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isValid: true,
      searchCity: "",
      weatherData: []
    };
  }

  handleSubmit = (event) => {
    if (event.key === "Enter") {
      const APIKEY = "94294cacd914429412613fc329adb11a";
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          this.state.searchCity +
          "&units=metric&appid=" +
          APIKEY
      )
        .then((response) => {
          if (response.ok) {
            this.setState({ isValid: true });
            return response.json();
          } else {
            this.setState({ isValid: false });
            throw new Error("Something went wrong");
          }
        })
        .then((weather) =>
          this.setState(
            {
              weatherData: [weather]
            },
            () => {
              if (this.state.weatherData.length !== 0) {
                this.returnSearchData();
              }
            }
          )
        )
        .catch((error) => {
          console.log("Error");
        });
      this.setState({ searchCity: "" });
    }
  };

  searchSucessHome = () => {
    return (
      <>
        <div className="searchBoxHome">
          <input
            placeholder="Search.."
            className="searchBarHome searchHomeSuccess"
            type="search"
            onChange={(e) => this.setState({ searchCity: e.target.value })}
            value={this.state.searchCity}
            onKeyPress={this.handleSubmit}
          />
        </div>
      </>
    );
  };

  searchErrorHome = () => {
    return (
      <>
        <div className="searchBoxHome">
          <input
            placeholder="Search.."
            className="searchBarHome searchHomeError"
            type="search"
            onChange={(e) => this.setState({ searchCity: e.target.value })}
            value={this.state.searchCity}
            onKeyPress={this.handleSubmit}
          />
        </div>
      </>
    );
  };

  returnSearchData = () => {
    //After we search and store the data to this state object, we simply return it back to OnLoadData which passes to DisplayOnLoad to view them
    this.props.getSearchData(this.state.weatherData);
  };

  render() {
    return (
      <div>
        {/* If the search is invalid them searchErrorHome is called which is the same search box but with a small shake animation */}
        {this.state.isValid ? this.searchSucessHome() : this.searchErrorHome()}
      </div>
    );
  }
}
