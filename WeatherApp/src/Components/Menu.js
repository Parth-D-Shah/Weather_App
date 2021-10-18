import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import "../css/Menu.css";
import {
  faBars,
  faTimes,
  faHome,
  faInfoCircle,
  faTemperatureLow,
  faPhoneAlt,
  faBug
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default class OnLoadData extends Component {
  constructor() {
    super();
    this.state = {
      menuClicked: false,
      changeToF: true
    };
  }

  openMenu = () => {
    this.setState((prevState) => ({
      menuClicked: !prevState.menuClicked
    }));
  };

  changeToFaren = () => {
    try {
      this.props.func(this.state.changeToF);
    } catch {}
  };

  render(props) {
    //Below we store bunch or icons to show on the menu when opened
    const menuIcons = [
      <FontAwesomeIcon
        icon={faTimes}
        style={{ fontSize: "35px", color: "white" }}
      />,
      <FontAwesomeIcon
        icon={faBars}
        style={{ fontSize: "35px", color: "white" }}
      />,
      <FontAwesomeIcon icon={faHome} style={{ marginRight: "10px" }} />,
      <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px" }} />,
      <FontAwesomeIcon
        icon={faTemperatureLow}
        style={{ marginRight: "10px" }}
      />,
      <FontAwesomeIcon icon={faPhoneAlt} style={{ marginRight: "10px" }} />,
      <FontAwesomeIcon icon={faBug} style={{ marginRight: "10px" }} />
    ];

    return (
      <div>
        <button
          className={this.state.menuClicked ? "closeButton" : "openButton"}
          onClick={this.openMenu}
        >
          {this.state.menuClicked ? menuIcons[0] : menuIcons[1]}
        </button>
        <div className={this.state.menuClicked ? "openMenu" : "closeMenu"}>
          <ul onClick={this.openMenu}>
            <Link to="/">
              <li>
                {menuIcons[2]}
                Home
              </li>
            </Link>
            <li>
              {menuIcons[3]}
              <a href={"https://en.wikipedia.org/wiki/" + this.props.country}>
                {/* Above we get the current city name from the search or not and we navigate user to wikipidia with that city to show more info */}
                More info
              </a>
            </li>
            <li
              onClick={() => {
                //By default we set the changeToF to false and therefore farenheit is shown on the menu
                this.setState((prevState) => ({
                  //State changes when we click
                  changeToF: !prevState.changeToF
                }));
                this.changeToFaren();
              }}
            >
              {menuIcons[4]}
              {this.state.changeToF //Depending on the state the value changes on the menu
                ? "Change to Fahrenheit"
                : "Change to Celsuis"}
            </li>
            <Link to="Contact">
              <li>
                {menuIcons[5]}
                Contact us
              </li>
            </Link>
            <Link to="Report">
              <li>
                {menuIcons[6]}
                Report bug
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}
