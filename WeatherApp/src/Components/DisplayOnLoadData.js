import React, { Component } from "react";
import "../css/DisplayOnLoad.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardSubtitle,
  Container,
  Row,
  Col
} from "reactstrap";

export default class SearchHomeApi extends Component {
  // formats the date using 'Moment'
  ShowDate = () => {
    var moment = require("moment");
    var a = new Date();
    a.setTime(1000 * this.props.weatherdate);
    const dateMonth = moment(a).format(" Do MMMM");
    return ["Today, ", dateMonth];
  };
  // shows weather information every 3 hours in the cards
  cardHours = (dt_hour) => {
    var date = new Date(dt_hour * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  };

  setMainIcon = (icon) => {
    const icons = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    return <img src={icons} alt="" />;
  };
  // changes background depending on the weather description
  // e.g. if the weather is sunny or clear it will display the "bg-sunny" background
  changeMainBg = (desc) => {
    if (
      desc.toString().toLowerCase() === "sunny" ||
      desc.toString().toLowerCase() === "clear"
    ) {
      return "bg-sunny";
    } else if (
      desc.toString().toLowerCase() === "rain" ||
      desc.toString().toLowerCase() === "haze"
    ) {
      return "bg-rainy";
    } else if (desc.toString().toLowerCase() === "clouds") {
      return "bg-chilly";
    } else if (desc.toString().toLowerCase() === "snow") {
      return "bg-snowy";
    }
  };

  render(props) {
    const cardInfo = [
      this.props.weatherhourly0,
      this.props.weatherhourly1,
      this.props.weatherhourly2,
      this.props.weatherhourly3
    ];

    return (
      <div className={this.changeMainBg(this.props.weathertype[0].main)}>
        {/* Start Main descript */}
        <div className="container-fluid ">
          <br />
          <br />
          <br />
          <div id="city_Info">
            <h5 style={{ float: "left" }}>
              {this.props.country.name + ", " + this.props.country.country}{" "}
              <br /> {this.ShowDate()}
            </h5>
          </div>
          <div id="city_Temp">
            <div className="temp_Align" style={{ marginTop: "6em" }}>
              <h4 className="temp_Size">
                {this.props.changeToFarenheit
                  ? Math.round(this.props.weathertemp) + "°F"
                  : Math.round(this.props.weathertemp) + "°C"}
              </h4>
              {this.setMainIcon(this.props.weathertype[0].icon)}
              <h1>{this.props.weathertype[0].main} </h1>
            </div>
          </div>
        </div>
        {/* End Main descript */}

        {/* This is next week button on the home page */}
        <nav className="next_week">
          <Link to="/nextWeek" style={{ textDecoration: "none" }}>
            <ul>
              <li style={{ color: "white" }}>
                Next Week
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
            </ul>
          </Link>
        </nav>

        {/* This below is the little cards on home page with a loop of 4 times (so every 3 hours) */}
        <Container fluid={true} className="display_Flex">
          <div className="row " style={{ marginLeft: "-5px" }}>
            <Row>
              {cardInfo.map((item, index) => (
                <Col xs="3">
                  <Card
                    style={{
                      width: "85px",
                      height: "150px",
                      backgroundColor: "rgba(176, 173, 172, 0.4)"
                    }}
                  >
                    <CardBody>
                      <CardSubtitle tag="h6" className="text-center">
                        {this.cardHours(cardInfo[index].dt)}
                        <br />
                        <br />
                        <b>{Math.round(cardInfo[index].main.temp)}°C </b>
                      </CardSubtitle>
                      <CardImg
                        width="100%"
                        src={
                          "http://openweathermap.org/img/wn/" +
                          cardInfo[index].weather[0].icon +
                          "@2x.png"
                        }
                        alt="Card image cap"
                      />
                      <CardText className="text-center">
                        {cardInfo[index].weather[0].main + " "}
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
