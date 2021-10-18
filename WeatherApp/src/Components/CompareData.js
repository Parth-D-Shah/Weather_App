import React, { Component } from "react";
import "../css/CompareData.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import DisplayCompareData from "./DisplayCompareData";

export default class CompareData extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      arrowUp: false,
      addPlace: true,
      isSearchValid: true,
      searchBar: false,
      searchCity: "",
      weatherData: []
    };
  }

  handleSubmit = (event) => {
    if (event.key === "Enter") {
      //Only if we press enter on keyboard, we can search
      const APIKEY = "94294cacd914429412613fc329adb11a";
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          this.state.searchCity +
          "&units=metric&appid=" +
          APIKEY
      )
        .then((response) => {
          //conditions below check whether a valid city was entered or not
          if (response.ok) {
            this.setState({ isSearchValid: true });
            this.showSearchData();
            return response.json();
          } else {
            this.setState({
              isSearchValid: false
            });
            throw new Error("Something went wrong");
          }
        })
        .then((weather) =>
          this.setState({
            weatherData: [weather]
          })
        )
        .catch((error) => {
          console.log("Error");
        });

      this.setState({ searchCity: "" });
    }
  };

  showSearchBar = () => {
    return (
      <div className="searchBox">
        <br />
        <input
          placeholder="Search.."
          className="searchBar searchSuccess"
          type="search"
          onChange={(e) => this.setState({ searchCity: e.target.value })}
          value={this.state.searchCity}
          onKeyPress={this.handleSubmit}
        />
      </div>
    );
  };

  openCompareBox = () => {
    this.setState((arrowState) => ({ arrowUp: !arrowState.arrowUp }));
  };

  checkAddPlace = () => {
    this.setState(() => ({ addPlace: false, searchBar: true }));
  };

  checkClose = () => {
    this.setState(() => ({
      addPlace: true,
      searchBar: false,
      isSearchValid: false
    }));
  };

  showSearchData = () => {
    //this function allows us to hide search bar and add button when a valid city is searched
    if (this.state.isSearchValid) {
      this.setState(() => ({ addPlace: false, searchBar: false }));
    }
  };

  render() {
    return (
      <>
        <button className="remove">
          <div
            className={
              this.state.arrowUp ? "halfCircleClose" : "halfCircleOpen"
            }
            onClick={this.openCompareBox} //open or close the box at the bottom when clicked (the defined function openCompareBox above)
          >
            <FontAwesomeIcon
              icon={this.state.arrowUp ? faChevronDown : faChevronUp}
            />
          </div>
        </button>

        <div
          className={this.state.arrowUp ? "openCompareBox" : "closeCompareBox"}
        >
          <button
            onClick={this.checkAddPlace}
            className={this.state.addPlace ? "show addButton" : "close"}
          >
            Add place
          </button>

          <div>
            <button className="deleteButton" onClick={this.checkClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className={this.state.searchBar ? "show" : "close"}>
              {this.showSearchBar()}
            </div>
            {this.state.isSearchValid ? ( //if the api call was correct then the isSearchvalid state variable becomes true and we show the data
              <DisplayCompareData weatherData={this.state.weatherData} />
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}
