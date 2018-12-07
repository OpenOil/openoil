import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import "whatwg-fetch";

import { getFromStorage, setInStorage } from "../../../utils/storage";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      error: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      company: "",
      title: "",
      city: "",
      state: "",
      country: ""
    };

    this.updateVariable = this.updateVariable.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  // Updates State Object Variables on Input Field Changes
  updateVariable(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  registerUser() {
    // Grab state
    const {
      email,
      password,
      firstname,
      lastname,
      company,
      title,
      city,
      state,
      country
    } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("http://localhost:8080/api/account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        company: company,
        title: title,
        city: city,
        state: state,
        country: country
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            error: json.message,
            isLoading: false,
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            company: "",
            title: "",
            city: "",
            state: "",
            country: ""
          });
        } else {
          this.setState({
            error: json.message,
            isLoading: false
          });
        }
      });
  }

  render() {
    const {
      isLoading,
      token,
      error,
      email,
      password,
      firstname,
      lastname,
      company,
      title,
      city,
      state,
      country
    } = this.state;

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
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">@</span>
                      </div>
                      <Input
                        type="text"
                        placeholder="Email"
                        id="email"
                        value={this.state.email}
                        onChange={this.updateVariable}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
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
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock" />
                        </span>
                      </div>
                      <Input type="password" placeholder="Repeat Password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="First Name"
                        id="firstname"
                        value={this.state.firstname}
                        onChange={this.updateVariable}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="Last Name"
                        id="lastname"
                        value={this.state.lastname}
                        onChange={this.updateVariable}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="Company"
                        id="company"
                        value={this.state.company}
                        onChange={this.updateVariable}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="Title"
                        id="title"
                        value={this.state.title}
                        onChange={this.updateVariable}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="City"
                        id="city"
                        value={this.state.city}
                        onChange={this.updateVariable}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="State"
                        id="state"
                        value={this.state.state}
                        onChange={this.updateVariable}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="Country"
                        id="country"
                        value={this.state.country}
                        onChange={this.updateVariable}
                      />
                    </InputGroup>
                    <Button onClick={this.registerUser} color="success" block>
                      Create Account
                    </Button>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button className="btn-facebook" block>
                          <span>facebook</span>
                        </Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button className="btn-twitter" block>
                          <span>twitter</span>
                        </Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Register;
