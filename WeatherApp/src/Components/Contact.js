import React from "react";
import "../css/Contact.css";
import Menu from "./Menu.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhoneSquareAlt
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-awesome-modal";

export default class DisplayCompareData extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubmit: false,
      name: "",
      email: "",
      message: "",
      phone: ""
    };
  }
  // if the form is not empty then it shows the pop up message
  submitContact = () => {
    if (
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.state.message !== ""
    ) {
      this.setState({ isSubmit: true });
    }
  };
  // when clicked on the 'close' text, it makes the form empty
  closeModal = () => {
    this.setState({
      isSubmit: false,
      name: "",
      email: "",
      message: "",
      phone: ""
    });
  };

  render() {
    return (
      <div>
        <div
          style={{
            height: "812px",
            width: "452px"
          }}
        >
          <Menu />
          <div>
            <div className="form">
              <div
                className="contact-info"
                style={{ backgroundColor: "#555b6e" }}
              >
                <br />
                <h3 className="title">Let's get in touch</h3>
                <p className="text">Hello there we are gonna ace this CW </p>
                <div className="info">
                  <div className="information">
                    <p>
                      d
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        style={{ fontSize: "20px", color: "white" }}
                      />{" "}
                      Mile End Rd, Bethnal Green, London E1 4NS
                    </p>
                  </div>
                  <div className="information">
                    <p>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ fontSize: "20px", color: "white" }}
                      />{" "}
                      hello@gmail.com
                    </p>
                  </div>
                  <div className="information">
                    <p>
                      <FontAwesomeIcon
                        icon={faPhoneSquareAlt}
                        style={{ fontSize: "20px", color: "white" }}
                      />{" "}
                      123-456-789
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <form>
                  <h3 className="title">Contact us</h3>
                  <div className="input-container">
                    <input
                      onChange={(e) => this.setState({ name: e.target.value })}
                      type="text"
                      placeholder="Name"
                      value={this.state.name}
                      className="input"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <input
                      onChange={(e) => this.setState({ email: e.target.value })}
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      className="input"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <input
                      onChange={(e) => this.setState({ phone: e.target.value })}
                      type="tel"
                      placeholder="Phone Number"
                      value={this.state.phone}
                      className="input"
                    />
                  </div>
                  <div className="input-container textarea">
                    <textarea
                      onChange={(e) =>
                        this.setState({ message: e.target.value })
                      }
                      className="input"
                      placeholder="Message"
                      value={this.state.message}
                      required
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    value="Send"
                    onClick={this.submitContact}
                    className="send"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/*  A modal allows a message box to display on top of the screen. */}
        <Modal
          visible={this.state.isSubmit}
          width="400"
          height="300"
          effect="fadeInDown"
        >
          <div style={{ textAlign: "center", color: "black" }}>
            <h4>Thanks for contacting us!</h4>
            <a
              style={{
                textDecoration: "none",
                color: "#cc6868"
              }}
              href="#"
              onClick={this.closeModal}
            >
              Close
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}
