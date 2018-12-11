import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  InputGroupAddon,
  InputGroup,
  InputGroupButton
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

class Logout extends Component {
  componentDidMount() {
    console.log("Logging out!!!");
    this.props.logoutUser(this.props.history);
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">Bye!</h1>
                <h4 className="pt-3">Thank you for visitng :)</h4>
                <p className="text-muted float-left">Redirecting you...</p>
              </div>
              <InputGroup className="input-prepend">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search" />
                  </span>
                </div>
                <Input
                  size="16"
                  type="text"
                  placeholder="What are you looking for?"
                  disabled
                />
                <div className="input-group-append">
                  <Button color="info" disabled>
                    Search
                  </Button>
                </div>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Logout);
