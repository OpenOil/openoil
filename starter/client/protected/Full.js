import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

// CoreUI Components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import Aside from "../components/Aside";
import Footer from "../components/Footer";

// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Protected pages
import Dashboard from "./_Data";
import Page404 from "../views/Page404";

class Full extends Component {
  // Fired on first render
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  // Fired on all following renders
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/data" name="Data" component={Dashboard} />
                <Route name="404" component={Page404} />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

Full.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Full);
