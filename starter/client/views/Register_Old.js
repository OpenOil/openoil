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
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../redux/actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      firstname: "",
      lastname: "",
      company: "",
      title: "",
      city: "",
      state: "",
      country: "",
      errors: {}
    };
  }

  // Updates State Object Variables on Input Field Changes
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      company: this.state.company,
      title: this.state.title,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country
    };
    this.props.registerUser(user, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <form onSubmit={this.handleSubmit}>
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
                        className={classnames({
                          "is-invalid": errors.email
                        })}
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
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
                        className={classnames({
                          "is-invalid": errors.password
                        })}
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock" />
                        </span>
                      </div>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        className={classnames({
                          "is-invalid": errors.password_confirm
                        })}
                        name="password_confirm"
                        value={this.state.password_confirm}
                        onChange={this.handleChange}
                      />
                      {errors.password_confirm && (
                        <div className="invalid-feedback">
                          {errors.password_confirm}
                        </div>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="First Name"
                        className={classnames({
                          "is-invalid": errors.firstname
                        })}
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleChange}
                      />
                      {errors.firstname && (
                        <div className="invalid-feedback">
                          {errors.firstname}
                        </div>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="Last Name"
                        className={classnames({
                          "is-invalid": errors.lastname
                        })}
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                      />
                      {errors.lastname && (
                        <div className="invalid-feedback">
                          {errors.lastname}
                        </div>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="Company"
                        className={classnames({
                          "is-invalid": errors.company
                        })}
                        name="company"
                        value={this.state.company}
                        onChange={this.handleChange}
                      />
                      {errors.company && (
                        <div className="invalid-feedback">{errors.company}</div>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="Title"
                        className={classnames({
                          "is-invalid": errors.title
                        })}
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                      {errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="City"
                        className={classnames({
                          "is-invalid": errors.city
                        })}
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                      />
                      {errors.city && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="State"
                        className={classnames({
                          "is-invalid": errors.state
                        })}
                        name="state"
                        value={this.state.state}
                        onChange={this.handleChange}
                      />
                      {errors.state && (
                        <div className="invalid-feedback">{errors.state}</div>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="text"
                        placeholder="Country"
                        className={classnames({
                          "is-invalid": errors.country
                        })}
                        name="country"
                        value={this.state.country}
                        onChange={this.handleChange}
                      />
                      {errors.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </InputGroup>
                    <Button type="submit" color="success" block>
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
          </form>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
