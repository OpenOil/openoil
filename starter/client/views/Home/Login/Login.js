import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import "whatwg-fetch";

import { getFromStorage, setInStorage } from "../../../utils/storage";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      error: "",
      email: "",
      password: ""
    };

    this.updateVariable = this.updateVariable.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("openoil");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("http://localhost:8080/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  // Updates State Object Variables on Input Field Changes
  updateVariable(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  login() {
    // Grab state
    const { email, password } = this.state;
    this.setState({
      isLoading: true
    });
    // Post request to backend
    fetch("http://localhost:8080/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState({
            error: json.message,
            isLoading: false,
            email: "",
            password: "",
            token: json.token
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("openoil");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("http://localhost:8080/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const { isLoading, token, error, email, password } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-user" />
                          </span>
                        </div>
                        <Input
                          type="text"
                          placeholder="Email"
                          id="email"
                          value={this.state.email}
                          onChange={this.updateVariable}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-lock" />
                          </span>
                        </div>
                        <Input
                          type="password"
                          placeholder="Password"
                          id="password"
                          value={this.state.password}
                          onChange={this.updateVariable}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            onClick={this.login}
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Card
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: 44 + "%" }}
                  >
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <Button
                          href="/#/register"
                          color="primary"
                          className="mt-3"
                          active
                        >
                          Register Now!
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } // END: No token

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Login;
